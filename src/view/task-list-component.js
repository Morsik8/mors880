import { AbstractComponent } from '../framework/abstract-component.js';

function createTaskListTemplate(status, title) {
  return `
    <div class="task-section" data-status="${status}">
      <h3 class="${status}title">${title}</h3>
      <ul class="task-list"></ul>
    </div>
  `;
}

export default class TaskListComponent extends AbstractComponent {
  constructor(status, title, onTaskDrop) {
    super();
    this.status = status;
    this.title = title;
    this.onTaskDrop = onTaskDrop;

    this.#setDropHandler();
  }

  get template() {
    return createTaskListTemplate(this.status, this.title);
  }

  #setDropHandler() {
    const list = this.element.querySelector('.task-list');

    // 🔄 Обработка dragover
    list.addEventListener('dragover', (event) => {
      event.preventDefault();
      const dragging = document.querySelector('.dragging');
      if (!dragging) return;

      const afterElement = this.#getDragAfterElement(list, event.clientY);
      if (afterElement == null) {
        list.appendChild(dragging);
      } else {
        list.insertBefore(dragging, afterElement);
      }
    });

    // ✅ Поддержка сброса даже в пустой список
    list.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      this.onTaskDrop(taskId, this.status);
    });
  }

  #getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}
