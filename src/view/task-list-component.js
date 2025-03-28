import { createElement } from '../framework/render.js';


function createTaskListTemplate(title) {
  return `
      <div class="task-section">
          <h3>${title}</h3>
          <ul class="task-list"></ul>
      </div>
  `;
}


export default class TaskListComponent {
  constructor(title) {
    this.title = title;
  }

  getTemplate() {
    return createTaskListTemplate(this.title);
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
