// src/view/button-clear-component.js
import { AbstractComponent } from '../framework/abstract-component.js';

export default class ButtonClearComponent extends AbstractComponent {
  get template() {
    return `<button class="clear-button">X Очистить</button>`;
  }
}
