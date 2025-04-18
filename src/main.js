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

// Компонент формы + логика "добавить"
const formAddTaskComponent = new FormAddTaskComponent({
  onclick: (taskTitle) => {
    tasksBoardPresenter.createTask(taskTitle);
  }
});

render(formAddTaskComponent, formContainer);
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
tasksBoardPresenter.init();
