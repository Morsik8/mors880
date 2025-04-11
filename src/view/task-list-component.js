import { AbstractComponent } from '../framework/abstract-component.js';

function createTaskListTemplate(status, title) {
  return `
    <div class="task-section">
      <h3 class="${status}title">${title}</h3>
      <ul class="task-list"></ul>
    </div>
  `;
}

export default class TaskListComponent extends AbstractComponent {
  constructor(status, title) {
    super();
    this.status = status;
    this.title = title;
  }

  get template() {
    return createTaskListTemplate(this.status, this.title);
  }
}
