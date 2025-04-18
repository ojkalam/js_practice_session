import icons from 'url:../../img/icons.svg';
class SearchView {
  #parentElement = document.querySelector('.search');
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#parentElement.querySelector('.search__field').value = '';
    return query;
  }

  addHandlerRender(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
