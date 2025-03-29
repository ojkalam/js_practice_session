import View from './View';
import icons from 'url:../../img/icons.svg';
class SearchResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No search results found. Please try again!';
  //we can create a new view page using resultView where we can put everything on there
  generateMarkup() {
    this._clear();
    const output = this._data.reduce((acc, value) => {
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

    this._parentElement.insertAdjacentHTML('beforeend', output);
  }
}

export default new SearchResultsView();
