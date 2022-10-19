import "./styles/global.css"
import { bindHeaderEvents, header } from "./modules/header";
import { bindSidetabEvents, sidetab } from "./modules/sidetab";
import { todoWrapper } from "./modules/todoController";
import { footer } from "./modules/footer";

document.body.append(header(), sidetab(), todoWrapper(), footer());
bindHeaderEvents();
bindSidetabEvents();