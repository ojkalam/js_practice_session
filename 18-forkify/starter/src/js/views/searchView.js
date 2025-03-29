import icons from 'url:../../img/icons.svg';
class SearchView {
  #parentElement = document.querySelector('.search');
  #data;
  #message;
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#parentElement.querySelector('.search__field').value = '';
    return query;
  }
  render(data) {
    this.#data = data;
    this.searchResultView();
  }

  addHandlerRender(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  searchResultView() {
    const resultEl = document.querySelector('.results');
    resultEl.innerHTML = '';
    const output = this.#data.reduce((acc, value) => {
      return (acc += `<li class="preview">
            <a class="preview__link preview__link--active" href="#${value.id}">
              <figure class="preview__fig">
                <img src="${value.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${value.title}</h4>
                <p class="preview__publisher">${value.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`);
    }, '');

    resultEl.insertAdjacentHTML('beforeend', output);
  }
}

export default new SearchView();
