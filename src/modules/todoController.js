import { format } from "date-fns";
import "../styles/todo.css";
import { createTodo } from "./todo";

export const displayProjectName = (projectName) => {
  if (!projectName.match(/^inbox$/i)) {
    document.querySelector(
      ".project-list"
    ).innerHTML += `<li>${projectName}</li>`;
  }
};

export const todoWrapperToggle = () => {
  document.querySelector(".todo-wrapper").classList.toggle("expand");
};

export const openTodoForm = () => {
  const form = document.createElement("form");
  form.innerHTML = `<p>
  <label for="title">Title:</label>
  <input id="title" type="text" required maxlength="20" />
  <label for="duedate">Due Date:</label>
  <input id="duedate" type="datetime-local" required />
  <label for="priority">Priority:</label>
  <select id="priority">
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low" selected>Low</option>
  </select>
</p>
<p>
  <label for="description">Description:</label>
</p>
<p class="desc-wrapper">
  <textarea id="description" rows="10"></textarea>
  <label for="project">Project:</label>
  <input type="text" id="project" required maxlength="20" value="Inbox" />
</p>
<div>
  <button type="button" class="close-todo">Close</button>
  <button type="submit" class="submit-todo">Add Task</button>
</div>`;
  overlay(form);
  bindFormEvents();
};

export const insertTodo = (project) => {
  const wrapper = document.querySelector(".todo-wrapper");
  wrapper.innerHTML = "";
  project.forEach((todo) => {
    const list = document.createElement("div");
    list.classList.add("todo");
    const div = document.createElement("div");
    div.classList.add("title-date");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    const title = document.createElement("span");
    title.classList.add("todo-title");
    title.innerText = `${todo.title}`;
    const dueDate = document.createElement("p");
    dueDate.classList.add("todo-due-date");
    dueDate.innerText = `${todo.dueDate}`;
    const priority = document.createElement("span");
    priority.classList.add("priority");
    priority.innerHTML = `<i class="fa-regular fa-star"></i>`;
    div.append(checkbox, title, dueDate);
    list.append(div, priority);
    wrapper.append(list);
  });
};

export const todoWrapper = () => {
  const todoWrapper = document.createElement("div");
  todoWrapper.classList.add("todo-wrapper");
  return todoWrapper;
};

const bindFormEvents = () => {
  document
    .querySelector(".submit-todo")
    .addEventListener("click", handleFormEvents);
  document
    .querySelector(".close-todo")
    .addEventListener("click", handleFormEvents);
};

const handleFormEvents = (e) => {
  if (Array.from(e.target.classList).includes("submit-todo")) {
    if (document.querySelector("form").reportValidity()) {
      e.preventDefault();
      getFieldValues();
      closeTodoForm();
    } else {
    }
  } else {
    closeTodoForm();
  }
};

const overlay = (element) => {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.append(overlay);
  overlay.append(element);
};

const getFieldValues = () => {
  const title = document.querySelector("#title").value;
  const desc = document.querySelector("#description").value;
  const dueDate = document.querySelector("#duedate").value;
  const priority = document.querySelector("#priority").value;
  const project = document.querySelector("#project").value;
  const date = extractDate(dueDate);
  createTodo(title, desc, date, priority, project);
};

const closeTodoForm = () => {
  document.querySelector(".overlay").remove();
};

const extractDate = (date) => {
  const arr = date.split(/-|T|:/);
  return format(new Date(...arr), "yyyy-MM-dd | H-mm a");
};
