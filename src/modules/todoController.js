import { format } from "date-fns";
import "../styles/todo.css";
import { getAllTodo, getTodoByID, getTodoList, Project, removeTodo } from "./project";
import { handleSidetabEvents } from "./sidetab";
import { fetchProject } from "./storage";
import { createTodo } from "./todo";

window.addEventListener("load", () => fetchProject(Project.list));

export const displayProjectName = (projectName) => {
  if (!projectName.match(/^inbox$/i)) {
    document.querySelector(
      ".project-list"
    ).innerHTML += `<li class = "${projectName}">${projectName}</li>`;
    document
      .querySelector(`.${projectName}`)
      .addEventListener("click", handleSidetabEvents);
  }
};

export const todoWrapperToggle = () => {
  document.querySelector(".todo-wrapper").classList.toggle("expand");
};

export const openTodoForm = (e, edit, editTodo) => {
  const form = document.createElement("form");
  form.innerHTML = `<p>
  <label for="title">Title:</label>
  <input id="title" type="text" required maxlength="20" />
  <label for="duedate">Due Date:</label>
  <input id="duedate" type="datetime-local" min="${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}T${("0" + new Date().getHours()).slice(-2)}:${(
    "0" + new Date().getMinutes()
  ).slice(-2)}" required />
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
  <input type="text" id="project" required maxlength="20" value="Inbox" ${edit ? "readonly" : ""}/>
</p>
<div>
  <button type="button" class="close-todo">Close</button>
  ${edit ? `<button type="submit" class="edit-todo">Edit Task</button>` : '<button type="submit" class="submit-todo">Add Task</button>'}
</div>`;
  overlay(form);
  bindFormEvents(edit, editTodo);
};

export const displayTodoList = () => {
  const project = document.querySelector(".active");
  if (Array.from(project.classList).includes("today-btn")) {
    renderTodoList(getAllTodo());
  } else if (Array.from(project.classList).includes("inbox-btn")) {
    const todoList = getTodoList("Inbox");
    renderTodoList(todoList, "Inbox");
  } else {
    const todoList = getTodoList(project.textContent);
    renderTodoList(todoList, project.textContent);
  }
};

export const todoWrapper = () => {
  const todoWrapper = document.createElement("div");
  todoWrapper.classList.add("todo-wrapper");
  return todoWrapper;
};

const bindFormEvents = (edit, editTodo) => {
  if (edit) {
    document
    .querySelector(".edit-todo")
    .addEventListener("click", (e) => handleFormEvents(e, editTodo));
  } else {
    document
    .querySelector(".submit-todo")
    .addEventListener("click", handleFormEvents);
  }
  document
    .querySelector(".close-todo")
    .addEventListener("click", handleFormEvents);
};

function handleFormEvents(e, editTodo) {
  e.preventDefault();
  if (Array.from(e.target.classList).includes("submit-todo")) {
    if (document.querySelector("form").reportValidity()) {
      getFieldValues();
      closeTodoForm();
    } else {
    }
  } else if (Array.from(e.target.classList).includes("edit-todo")) {
    if (document.querySelector("form").reportValidity()) {
      getFieldValues(true, editTodo);
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

const getFieldValues = (edit, editTodo) => {
  const title = document.querySelector("#title").value;
  const desc = document.querySelector("#description").value;
  const dueDate = document.querySelector("#duedate").value;
  const priority = document.querySelector("#priority").value;
  const project = document.querySelector("#project").value;
  if (edit) {
    updateTodo(editTodo, { title, desc, dueDate, priority });
  } else {
    createTodo(title, desc, dueDate, priority, project);
  }
};

const closeTodoForm = () => {
  displayTodoList();
  document.querySelector(".overlay").remove();
};

const extractDate = (date) => {
  const arr = date.split(/-|T|:/);
  arr[1]--;
  return format(new Date(...arr), "yyyy-LLL-dd | H:mm");
};

const renderTodoList = (todoList, projectName) => {
  const wrapper = document.querySelector(".todo-wrapper");
  wrapper.innerHTML = "";
  if (!todoList) return;
  todoList.forEach((todo) => {
    const wrap = document.createElement("div");
    const list = document.createElement("div");
    list.classList.add("todo");
    list.setAttribute("data-id", `${todo.todoID}`);
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    div.classList.add("title-date");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("data-id", `${todo.todoID}`);
    checkbox.setAttribute("type", "checkbox");
    const title = document.createElement("span");
    title.classList.add("todo-title");
    title.innerText = `${todo.title}`;
    const dueDate = document.createElement("p");
    dueDate.classList.add("todo-due-date");
    dueDate.innerText = `${extractDate(todo.dueDate)}`;
    const priority = document.createElement("span");
    priority.classList.add("priority", `${todo.priority}`);
    priority.setAttribute("title", `priority: ${todo.priority}`);
    priority.innerHTML = `<i class="fa-regular fa-star"></i>`;
    const edit = document.createElement("span");
    edit.classList.add("edit-btn");
    edit.setAttribute("data-id", `${todo.todoID}`);
    edit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    div.append(checkbox, title, dueDate);
    div2.append(priority, edit);
    list.append(div, div2);
    wrap.append(list);
    wrapper.append(wrap);
    bindTodoEvents(todo.todoID);
  });
};

function showFullTodo(e) {
  e.stopImmediatePropagation()
  const todo = getTodoByID(this.getAttribute("data-id"));
  const div = document.createElement("div");
  div.classList.add("full-todo");
  div.innerHTML = `<div>
  <p><b>Title:</b> ${todo.title}</p>
  <p class="desc"><i class="fa-solid fa-arrow-up-right-from-square"></i><b>Description:</b> ${
    todo.description
  }</p>
</div>
<div>
  <p><b>Due Date:</b> ${extractDate(todo.dueDate)}</p>
  <p><b>Priority:</b> ${todo.priority}</p>
</div>`;
  this.parentNode.append(div);
  this.removeEventListener("click", showFullTodo);
  this.addEventListener("click", hideFullTodo);
  document
    .querySelector(".desc .fa-solid")
    .addEventListener(
      "click",
      showDescription.bind(undefined, todo.description)
    );
};

function hideFullTodo(e) {
  e.stopImmediatePropagation()
  this.parentNode.lastChild.remove();
  this.removeEventListener("click", hideFullTodo);
  this.addEventListener("click", showFullTodo);
};

const bindTodoEvents = (todoID) => {
  document
    .querySelectorAll(".todo")
    .forEach((todo) => todo.addEventListener("click", showFullTodo));
  document
    .querySelector(`input[data-id="${todoID}"]`)
    .addEventListener("change", () => {
      removeTodo(todoID);
    });
  document.querySelector(".todo .edit-btn").addEventListener("click", editTodo);
};

const showDescription = (desc) => {
  const div = document.createElement("div");
  div.classList.add("full-desc");
  div.innerHTML = `${desc} <button class="close-desc">Close</button>`;
  overlay(div);
  document
    .querySelector(".full-desc .close-desc")
    .addEventListener("click", hideDescription);
};

const hideDescription = () => {
  document.querySelector(".overlay").remove();
};

function editTodo(e) {
  e.stopImmediatePropagation();
  const todoID = this.getAttribute("data-id");
  const todo = getTodoByID(todoID);
  openTodoForm(undefined, true, todo);
  setOriginalValues(todo);
};

const setOriginalValues = (todo) => {
  document.querySelector("#title").value = todo.title;
  document.querySelector("#description").value = todo.description;
  document.querySelector("#duedate").value = todo.dueDate;
  document.querySelector("#priority").value = todo.priority;
}

const updateTodo = (todo, updatedValues) => {
  todo.title = updatedValues.title;
  todo.description = updatedValues.desc;
  todo.dueDate = updatedValues.dueDate;
  todo.priority = updatedValues.priority;
  displayTodoList();
}