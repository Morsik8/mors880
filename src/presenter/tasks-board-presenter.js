import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import ButtonClearComponent from '../view/button-clear-component.js';
import EmptyListComponent from '../view/empty-list-component.js';

import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #boardTasks = [];
  #taskLists = {};

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];

    render(this.#tasksBoardComponent, this.#boardContainer);

    this.#renderTasksList();
  }

  #renderTasksList() {
    Object.values(Status).forEach((status) => {
      const statusTasks = this.#boardTasks.filter((task) => task.status === status);

      if (statusTasks.length === 0) {
        this.#renderEmptyList(status);
        
        return;
      }

      const tasksListComponent = new TasksListComponent(status, StatusLabel[status]);
      this.#taskLists[status] = tasksListComponent;

      render(tasksListComponent, this.#tasksBoardComponent.element);

      statusTasks.forEach((task) => this.#renderTask(task, tasksListComponent));

      if (status === Status.TRASH) {
        this.#renderClearButton(tasksListComponent);
      }
    });
  }

  #renderTask(task, listComponent) {
    const taskComponent = new TaskComponent({ task });
    const listElement = listComponent.element.querySelector('.task-list');
    render(taskComponent, listElement);
  }

  #renderClearButton(listComponent) {
    const clearButtonComponent = new ButtonClearComponent();
    const taskListElement = listComponent.element.querySelector('.task-list');
    render(clearButtonComponent, taskListElement, 'afterend');
  }

  #renderEmptyList(status) {
    const emptyListComponent = new EmptyListComponent(status, StatusLabel[status]);
    render(emptyListComponent, this.#tasksBoardComponent.element);
  }
}
