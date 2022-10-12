import "../styles/header.css";
import { toggleSideTab } from "./sidetab";
import { openTodoForm } from "./todoController";


export const header = () => {
  const header = document.createElement("div");
  header.classList.add("header");
  header.innerHTML = `<i class="fa-solid fa-bars sidetab-btn btn" title="Open Tab"></i><i class="fa-solid fa-house home-btn btn" title="Home"></i><i class="fa-solid fa-plus add-btn btn" title="Add Task"></i>`;
  return header;
};

export const bindHeaderEvents = () => {
  document.querySelector(".sidetab-btn").addEventListener("click", toggleSideTab);
  document.querySelector(".add-btn").addEventListener("click", openTodoForm);
}