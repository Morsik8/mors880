import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import ButtonClearComponent from '../view/button-clear-component.js';
import EmptyListComponent from '../view/empty-list-component.js';

import { render, RenderPosition } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    this.#renderTasksList();
  }

  createTask(taskTitle) {
    this.#tasksModel.addTask(taskTitle);
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderTasksList();
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #renderTasksList() {
    Object.values(Status).forEach((status) => {
      const statusTasks = this.#tasksModel.getTasksByStatus(status);

      const tasksListComponent = new TasksListComponent(
        status,
        StatusLabel[status],
        this.#handleTaskDrop.bind(this)
      );

      render(tasksListComponent, this.#tasksBoardComponent.element);

      const listElement = tasksListComponent.element.querySelector('.task-list');

      if (statusTasks.length === 0) {
        this.#renderEmptyList(status, tasksListComponent);
      } else {
        statusTasks.forEach((task) => {
          this.#renderTask(task, tasksListComponent);
        });

        if (status === Status.TRASH) {
          this.#renderClearButton(tasksListComponent);
        }
      }
    });
  }

  #renderTask(task, listComponent) {
    const taskComponent = new TaskComponent({ task });
    const listElement = listComponent.element.querySelector('.task-list');
    render(taskComponent, listElement);
  }

  #renderClearButton(listComponent) {
    const clearButtonComponent = new ButtonClearComponent(() => {
      this.#tasksModel.clearTrash();
    });

    const listElement = listComponent.element.querySelector('.task-list');
    render(clearButtonComponent, listElement, RenderPosition.AFTEREND);
  }

  #renderEmptyList(status, listComponent) {
    const emptyListComponent = new EmptyListComponent(status, StatusLabel[status]);
    const listElement = listComponent.element.querySelector('.task-list');
    render(emptyListComponent, listElement);
  }

  #handleTaskDrop(taskId, newStatus) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus);
  }
}
