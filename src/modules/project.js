import { compareAsc, isEqual } from "date-fns";
import { removeFromStorage, storeProject } from "./storage";
import {
  backToHome,
  displayProjectName,
  displayTodoList,
  removeProject,
} from "./todoController";

export class Project {
  static list = {};

  constructor(todo) {
    if (todo) {
      this._todoList = [todo];
    } else {
      this._todoList = [];
    }
  }

  get todoList() {
    return this._todoList;
  }

  addTodo(todo) {
    this._todoList.push(todo);
  }
}

export const addToProject = (name, todo) => {
  if (name in Project.list) {
    Project.list[name].addTodo(todo);
    storeProject(name, todo);
  } else {
    const project = new Project(todo);
    Project.list[name] = project;
    storeProject(name, project);
    displayProjectName(name);
  }
};

export const getTodoList = (projectName) => {
  if (projectName in Project.list) {
    sortTodos(Project.list[projectName].todoList);
    return Project.list[projectName].todoList;
  }
};

export const removeTodo = (todoID, projectName) => {
  if (!projectName) {
    projectName = getProjectNameByID(todoID);
  }
  const list = Project.list[projectName].todoList;
  const index = list.findIndex((todo) => todo.todoID === todoID);
  list.splice(index, 1);
  removeFromStorage(projectName, index);
  if (isProjectEmpty(list)) {
    removeProject(projectName);
    backToHome();
  }
  displayTodoList();
};

export const isProjectEmpty = (list) => {
  if (list.length === 0) {
    return true;
  }
  return false;
};

export const getAllTodo = () => {
  const allTodo = [];
  for (let project in Project.list) {
    allTodo.push(...Project.list[project].todoList);
  }
  sortTodos(allTodo);
  return allTodo.filter((todo) => isToday(todo.dueDate));
};

const sortTodos = (todoList) => {
  todoList.sort((a, b) => {
    const tempA = a.dueDate.split(/-|T|:/);
    const dateA = new Date(...tempA);
    const tempB = b.dueDate.split(/-|T|:/);
    const dateB = new Date(...tempB);
    return compareAsc(dateA, dateB);
  });
};

const isToday = (date) => {
  date = date.split(/-|T|:/);
  const dateA = new Date(date[0], date[1], date[2]);
  const dateB = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  return isEqual(dateA, dateB);
};

const getProjectNameByID = (ID) => {
  for (let project in Project.list) {
    if (Project.list[project].todoList.find((todo) => todo.todoID === ID)) {
      return project;
    }
  }
};

export const getTodoByID = (todoID) => {
  for (let project in Project.list) {
    if (Project.list[project].todoList.find((todo) => todo.todoID == todoID)) {
      return Project.list[project].todoList.find(
        (todo) => todo.todoID == todoID
      );
    }
  }
};
