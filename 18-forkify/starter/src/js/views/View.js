//we are exporting the whole class not the object of the class becuase this is a parent class which will be extends by child class
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorMessage();
    this._data = data;
    const markup = this.generateMarkup();
    this._clear();
    //this line is for rendering the generated output to parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this.generateMarkup();
    //we will campare the new markup with old marketup then change text and attribute with new element
    const newDom = document.createRange().createContextualFragment(newMarkup); //this is for creating virtual dom to manipulate
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    console.log(newElements, curElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));
      //update Changed Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //update Changed Attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  errorMessage(errorMessage = this._errorMessage) {
    const markup = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${errorMessage}</p>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  message(message = this._message) {
    const markup = `<div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const spinner = `<div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }
}
