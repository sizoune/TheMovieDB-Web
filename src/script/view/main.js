import '../component/movie-item';
import MovieSource from '../data/movie-source';

const detailMovie = () => {
  const movieItemElement = document.querySelectorAll('movie-item');

  const renderDetail = (result) => {
    const modal = document.getElementById('detail');
    modal.innerHTML = `
    <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
      <div class="modal-content">
        <div id="detail-header" class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${result.title}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div id="detail-body" class="modal-body">
          <div class="card text-bg-dark">
            <img class="card-image img-fluid" src="https://image.tmdb.org/t/p/original/${result.backdrop_path}" alt="${result.title}" >
            <div class="card-img-overlay">
              <h2 class="card-text">
                ${result.overview}
              </h2>
              <a href="${result.homepage}">
                <button type="button" class="btn btn-link">Homepage</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  };

  const fallbackResult = (message) => {
    const showWarning = document.getElementById('show-alert');
    showWarning.classList.remove('invisible');
    showWarning.innerText = message;
  };

  const getDetailMovie = async (movieID) => {
    try {
      const result = await MovieSource.getDetailMovie(movieID);
      renderDetail(result);
    } catch (message) {
      fallbackResult(message);
    }
  };

  movieItemElement.forEach((item) => {
    item.addEventListener('click', () => {
      getDetailMovie(item.getAttribute('id'));
    });
  });
};

const main = () => {
  let currentPage = 1;
  const movieListElement = document.getElementById('row-list');
  const pageSelector = document.getElementById('pagination');

  const renderPlaceholder = () => {
    for (let index = 0; index < 20; index += 1) {
      const movieItemElement = document.createElement('movie-item');
      movieItemElement.moviePlaceholder = '';
      movieListElement.appendChild(movieItemElement);
    }
  };

  const renderResult = (results) => {
    results.forEach((movie) => {
      const movieItemElement = document.createElement('movie-item');
      movieItemElement.setAttribute('id', `${movie.id}`);
      movieItemElement.setAttribute('data-bs-toggle', 'modal');
      movieItemElement.setAttribute('data-bs-target', '#detail');
      movieItemElement.classList.add('col');
      movieItemElement.movie = movie;
      movieListElement.appendChild(movieItemElement);
    });
    detailMovie();
  };

  const fallbackResult = (message) => {
    const showWarning = document.getElementById('show-alert');
    showWarning.classList.remove('invisible');
    showWarning.innerText = message;
  };

  const getMovies = async (page) => {
    try {
      // clear child first
      while (movieListElement.firstChild) {
        movieListElement.removeChild(movieListElement.firstChild);
      }
      renderPlaceholder();
      const result = await MovieSource.discoverMovie(page);
      // clear placeholder
      while (movieListElement.firstChild) {
        movieListElement.removeChild(movieListElement.firstChild);
      }
      renderResult(result);
    } catch (message) {
      fallbackResult(message);
    }
  };

  // pagination handler
  pageSelector.childNodes.forEach((pageItem) => {
    pageItem.addEventListener('click', () => {
      const currentActivepage = pageSelector.querySelector('.page-item.active');
      const firstPage = document.getElementById('first');
      const secondPage = document.getElementById('second');
      const thirdPage = document.getElementById('third');

      if (pageItem.getAttribute('id') !== 'prev' && pageItem.getAttribute('id') !== 'next') {
        currentActivepage.classList.remove('active');
        currentPage = Number(pageItem.innerText);
        getMovies(currentPage);
        pageItem.classList.add('active');
      } else if (pageItem.getAttribute('id') === 'next') {
        if (currentActivepage === thirdPage) {
          firstPage.innerHTML = `
            <a class="page-link" href="#">${currentPage + 1}</a>
          `;
          secondPage.innerHTML = `
            <a class="page-link" href="#">${currentPage + 2}</a>
          `;
          thirdPage.innerHTML = `
            <a class="page-link" href="#">${currentPage + 3}</a>
          `;
          currentActivepage.classList.remove('active');
          currentPage += 1;
          getMovies(currentPage);
          firstPage.classList.add('active');
        } else {
          currentActivepage.classList.remove('active');
          currentPage += 1;
          getMovies(currentPage);
          if (firstPage === currentActivepage) {
            secondPage.classList.add('active');
          } else {
            thirdPage.classList.add('active');
          }
        }
      } else if (pageItem.getAttribute('id') === 'prev') {
        if (currentActivepage === firstPage) {
          if (firstPage.innerText !== '1') {
            firstPage.innerHTML = `
            <a class="page-link" href="#">${currentPage - 3}</a>
          `;
            secondPage.innerHTML = `
            <a class="page-link" href="#">${currentPage - 2}</a>
          `;
            thirdPage.innerHTML = `
            <a class="page-link" href="#">${currentPage - 1}</a>
          `;
            currentActivepage.classList.remove('active');
            currentPage -= 1;
            getMovies(currentPage);
            thirdPage.classList.add('active');
          }
        } else {
          currentActivepage.classList.remove('active');
          currentPage -= 1;
          getMovies(currentPage);
          if (thirdPage === currentActivepage) {
            secondPage.classList.add('active');
          } else {
            firstPage.classList.add('active');
          }
        }
      }
    });
  });

  getMovies(currentPage);
};

export default main;