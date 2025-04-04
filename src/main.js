import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/task-form-component.js';
import { render, RenderPosition } from './framework/render.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/tasks-model.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskBoardContainer = document.querySelector('.taskboard');

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: taskBoardContainer,
  tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
tasksBoardPresenter.init();
