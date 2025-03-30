import View from './View';
import icons from 'url:../../img/icons.svg';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark found.';
  //we can create a new view page using resultView where we can put everything on there
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  generateMarkup() {
    const id = window.location.hash.slice(1);
    const output = this._data.reduce((acc, value) => {
      return (acc += `<li class="preview">
                <a class="preview__link ${
                  value.id === id ? 'preview__link--active' : ''
                }" href="#${value.id}">
                  <figure class="preview__fig">
                    <img src="${value.image_url}" alt="Test" />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${value.title}</h4>
                    <p class="preview__publisher">${value.publisher}</p>
                  </div>
                </a>
              </li>`);
    }, '');
    return output;
  }
}

export default new BookmarksView();
