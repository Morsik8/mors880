import { AbstractComponent } from '../framework/abstract-component.js';

export default class TaskBoardComponent extends AbstractComponent {
  get template() {
    return `<div class="task-container"></div>`;
  }
}
