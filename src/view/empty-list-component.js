// src/view/empty-list-component.js
import { AbstractComponent } from '../framework/abstract-component.js';

function createEmptyListTemplate(status, title) {
  return `
    <div class="task-section task-section--empty">
      <h3 class="${status}title">${title}</h3>
      <p class="empty-text">Задач нет</p>
    </div>
  `;
}

export default class EmptyListComponent extends AbstractComponent {
  constructor(status, title) {
    super();
    this.status = status;
    this.title = title;
  }

  get template() {
    return createEmptyListTemplate(this.status, this.title);
  }
}
