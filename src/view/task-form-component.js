import { AbstractComponent } from '../framework/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return `
    <div class="add-section">
      <h2>Новая задача</h2>
      <input type="text" id="new-task" placeholder="Название задачи..." />
      <button id="add-task">+ Добавить</button>
    </div>
  `;
}

export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onclick }) {
    super();
    this.#handleClick = onclick;
    this.#setEventListeners();
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #setEventListeners() {

    requestAnimationFrame(() => {
      const button = this.element.querySelector('#add-task');
      const input = this.element.querySelector('#new-task');

      if (button && input) {
        button.addEventListener('click', (evt) => {
          evt.preventDefault();
          const value = input.value.trim();
          if (value) {
            this.#handleClick(value);
            input.value = '';
          }
        });
      }
    });
  }
}
