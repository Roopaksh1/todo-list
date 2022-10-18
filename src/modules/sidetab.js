import "../styles/sidetab.css";
import { displayTodoList, todoWrapperToggle } from "./todoController";

export const toggleSideTab = () => {
  document.querySelector(".sidetab").classList.toggle("closed");
  todoWrapperToggle();
};

export const handleSidetabEvents = (e) => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");
  displayTodoList();
};

export const bindSidetabEvents = () => {
  document
    .querySelector(".inbox-btn.btn-wrapper")
    .addEventListener("click", handleSidetabEvents);
  document
    .querySelector(".today-btn.btn-wrapper")
    .addEventListener("click", handleSidetabEvents);
};

export const sidetab = () => {
  const sidetab = document.createElement("div");
  sidetab.classList.add("sidetab");
  sidetab.innerHTML = `<div class= "inbox-btn btn-wrapper"><i class="fa-solid fa-inbox inbox-btn btn" style="color: dodgerblue"></i>&nbsp;Inbox</div>
                       <div class="today-btn btn-wrapper active"><i class="fa-solid fa-calendar-day btn" style="color: lightgreen"></i>&nbsp;Today</div><b class="project-heading">Projects</b>
                       <ul class= "project-list"></ul>`;
  return sidetab;
};
