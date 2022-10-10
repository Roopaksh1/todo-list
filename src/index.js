import "./styles/global.css"
import { bindHeaderEvents, header } from "./modules/header";
import { sidetab } from "./modules/sidetab";

document.body.append(header())
document.body.append(sidetab())
bindHeaderEvents();