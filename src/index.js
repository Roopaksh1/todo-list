import "./styles/global.css"
import { bindHeaderEvents, header } from "./modules/header";

document.body.append(header())
bindHeaderEvents();