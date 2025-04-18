import { AbstractComponent } from '../framework/abstract-component.js';

export default class ButtonClearComponent extends AbstractComponent {
  constructor(onClick) {
    super();
    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      onClick(); // вызов метода очистки из презентера
    });
  }

  get template() {
    return `<button class="clear-button">Очистить</button>`;
  }
}
