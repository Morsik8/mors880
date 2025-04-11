import { AbstractComponent } from '../framework/abstract-component.js';

export default class TaskFormComponent extends AbstractComponent {
  get template() {
    return `
      <div class="add-section">
        <h2>Новая задача</h2>
        <input type="text" id="new-task" placeholder="Название задачи...">
        <button id="add-task">+ Добавить</button>
      </div>
    `;
  }
}
