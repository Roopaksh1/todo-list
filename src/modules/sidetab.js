import "../styles/sidetab.css";
import { todoWrapperToggle } from "./todoController";

export const toggleSideTab = () => {
  document.querySelector(".sidetab").classList.toggle("closed");
  todoWrapperToggle();
};

export const sidetab = () => {
  const sidetab = document.createElement("div");
  sidetab.classList.add("sidetab");
  sidetab.innerHTML = `<div class= "inbox-btn btn-wrapper"><i class="fa-solid fa-inbox inbox-btn btn" style="color: dodgerblue"></i>&nbsp;Inbox</div>
                       <div class="today-btn btn-wrapper"><i class="fa-solid fa-calendar-day btn" style="color: lightgreen"></i>&nbsp;Today</div><b class="project-heading">Projects</b>
                       <ul class= "project"><li>Hello</li><li>Hello</li></ul>`;
  return sidetab;
};
