import css from 'bootstrap/dist/css/bootstrap.min.css';

class MovieItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  set moviePlaceholder(movie) {
    this.renderPlaceHolder();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      ${css}
    </style>
    <div class="card text-bg-dark">
    <img class="card-image-top" src="https://image.tmdb.org/t/p/w500/${this._movie.poster_path}" alt="${this._movie.title} Poster" >
</div>
    `;
  }

  renderPlaceHolder() {
    this.shadowDOM.innerHTML = `
    <style>
      ${css}
    </style>
    <div class="card placeholder-glow">
    <img class="card-image-top placeholder img-fluid" src="https://www.coalitionrc.com/wp-content/uploads/2017/01/placeholder.jpg" alt="Poster" >
</div>
    `;
  }
}

customElements.define('movie-item', MovieItem);
