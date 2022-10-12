import "../styles/todo.css";

const overlay = (element) => {
  const overlay = document.querySelector(".overlay");
  if (overlay === null) {
    const temp = document.createElement("div");
    temp.classList.add("overlay");
    document.body.append(temp);
    temp.innerHTML = "";
    temp.append(element);
  } else {
    overlay.innerHTML = "";
    overlay.append(element);
  }
};

export const todoWrapperToggle = () => {
  document.querySelector(".todo-wrapper").classList.toggle("expand");
};

export const openTodoForm = () => {
  const form = document.createElement("form");
  form.innerHTML = `<p>
  <label for="title">Title:</label>
  <input id="title" type="text" required maxlength="20"/>
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
<textarea id="description" rows="10"></textarea>
<div>
  <button type="button" class="close-todo">Close</button> 
  <button type="submit" class="submit-todo">Add Task</button>
</div>`;
  overlay(form);
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
