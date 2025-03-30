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
      //this view si similliar to search result view so we need to combined them to a Preview Class then we can use same desing to everywhere
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
                    <div class="preview__user-generated ${
                      value.key ? '' : 'hidden'
                    }">
                      <svg>
                        <use href="${icons}#icon-user"></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>`);
    }, '');
    return output;
  }
}

export default new BookmarksView();
