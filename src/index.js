import "./styles/global.css"
import { bindHeaderEvents, header } from "./modules/header";
import { sidetab } from "./modules/sidetab";
import { todoWrapper } from "./modules/todoController";
import { createTodo } from "./modules/todo";

document.body.append(header())
document.body.append(sidetab())
document.body.append(todoWrapper());
createTodo();
bindHeaderEvents();