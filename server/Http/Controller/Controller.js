import { tttServer } from "../../js.js";
import indexController from "../Model/indexController.js"


export default class Controller {
    run() {
        indexController(tttServer);
    }
}
