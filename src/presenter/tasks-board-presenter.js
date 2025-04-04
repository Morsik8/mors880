// src/presenter/tasks-board-presenter.js
import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    #boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];

        render(this.#tasksBoardComponent, this.#boardContainer);

        const taskLists = {};

        Object.values(Status).forEach(status => {
            const tasksListComponent = new TasksListComponent(status, StatusLabel[status]);
            render(tasksListComponent, this.#tasksBoardComponent.getElement());
            taskLists[status] = tasksListComponent;
        });

        this.#boardTasks.forEach(task => {
            const taskComponent = new TaskComponent({ task });
            render(taskComponent, taskLists[task.status].getElement().querySelector('.task-list'));
        });
    }
}
