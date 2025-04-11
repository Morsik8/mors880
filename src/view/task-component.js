import { AbstractComponent } from '../framework/abstract-component.js';

function createTaskComponentTemplate(task) {
  const { title, status } = task;
  return `<li class="${status}li">${title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    super();
    this.task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }
}
