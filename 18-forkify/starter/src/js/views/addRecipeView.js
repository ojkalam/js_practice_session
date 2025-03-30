import View from './View';
import icons from 'url:../../img/icons.svg';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _errorMessage = 'Failed to add recipe view. Please try again!';
  _message = 'Recipe successfully uploaded!';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }
  _toggleOverlayWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(
      'click',
      this._toggleOverlayWindow.bind(this)
    );
  }
  _addHandlerCloseWindow() {
    this._btnClose.addEventListener(
      'click',
      this._toggleOverlayWindow.bind(this)
    );
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      let data = [...new FormData(this)];
      //convert entries array to object as our recipe data is object
      data = Object.fromEntries(data);
      handler(data);
    });
  }

  generateMarkup() {}
}

export default new AddRecipeView();
