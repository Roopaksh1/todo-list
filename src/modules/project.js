import { displayProjectName, insertTodo } from "./todoController";

export class Project {
  static list = {};

  constructor(todo) {
    this._todoList = [todo];
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
  } else {
    const project = new Project(todo);
    Project.list[name] = project;
  }
  displayProjectName(name);
  insertTodo(Project.list[name].todoList);
};