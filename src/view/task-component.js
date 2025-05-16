import { AbstractComponent } from '../framework/abstract-component.js';

function createTaskComponentTemplate(task) {
  const { title, status } = task;
  return `<li class="${status}li" draggable="true">${title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    super();
    this.task = task;
    this.#makeTaskDraggable();
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }

  #makeTaskDraggable() {
    this.element.addEventListener('dragstart', (event) => {
      this.element.classList.add('dragging');
      event.dataTransfer.setData('text/plain', this.task.id);
    });

    this.element.addEventListener('dragend', () => {
      this.element.classList.remove('dragging');
    });
  }
}
