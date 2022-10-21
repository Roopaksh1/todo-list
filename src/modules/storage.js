import { Project } from "./project";
import { Todo } from "./todo";
import { displayProjectName, displayTodoList } from "./todoController";

export const storeProject = (name, value) => {
  if (localStorage.getItem(name)) {
    const obj = JSON.parse(localStorage.getItem(name));
    obj._todoList.push(value);
    localStorage.setItem(name, JSON.stringify(obj));
  } else {
    localStorage.setItem(name, JSON.stringify(value));
  }
};

export const fetchProject = (list) => {
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const todos = JSON.parse(localStorage.getItem(key));
      list[key] = new Project();
      for (let todo of todos._todoList) {
        list[key].addTodo(
          new Todo(
            todo._title,
            todo._description,
            todo._dueDate,
            todo._priority,
            todo._todoID
          )
        );
        displayProjectName(key);
      }
    }
  }
  displayTodoList();
};

export const removeFromStorage = (key, index) => {
  const project = JSON.parse(localStorage.getItem(key));
  project._todoList.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(project));
};
