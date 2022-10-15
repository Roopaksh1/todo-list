import { addToProject } from "./project";

export class Todo {
  static todoID = 1;

  constructor(title, description, dueDate, priority) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._todoID = Todo.todoID;
    Todo.todoID++;
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get description() {
    return this._title;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(newDueDate) {
    this._dueDate = newDueDate;
  }

  get priority() {
    return this._priority;
  }

  set priority(newPriority) {
    this._priority = newPriority;
  }

  get todoID() {
    return this._todoID;
  }
}

export const createTodo = (title, desc, dueDate, priority, projectName) => {
  const todo = new Todo(title, desc, dueDate, priority);
  projectName = updateProjectName(projectName);
  addToProject(projectName, todo);
};

const updateProjectName = (projectName) => {
  if (projectName.match(/^inbox$/i)) {
    return "Inbox";
  } else return projectName;
}
