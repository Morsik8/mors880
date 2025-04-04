import { Status } from '../const.js';
import { createElement } from '../framework/render.js';


function createTaskListTemplate(status, title) {
  return `
      <div class="task-section">
          <h3 class="${status}title">${title}</h3>
          <ul class="task-list"></ul>
      </div>
  `;
}


export default class TaskListComponent {
  constructor(status, title) {
    this.title = title;
    this.status = status;
  }

  getTemplate() {
    return createTaskListTemplate(this.status, this.title);
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
