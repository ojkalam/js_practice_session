import View from './View';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  generateMarkup() {
    this._clear();
    return this.generatePaginationMarkup();
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      //need to identify which button clicked using event delegation
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }
  generatePaginationMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    console.log('numPages', numPages);
    let output = '';
    //page 1 and there are other pages
    if (curPage == 1 && numPages > 1) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    //page 2 amd there are NO other pages
    //Last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }
    //Other page
    if (curPage < numPages) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }

    return ''; //if one page no need to render any button
  }
}

export default new PaginationView();
