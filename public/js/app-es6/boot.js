import {activityControllerInstance} from './controllers/ActivityController';
import {loginControllerInstance} from './controllers/LoginController';

let activityController = activityControllerInstance();
let loginController = loginControllerInstance();

document.querySelector('#activity-form').onsubmit = activityController.add.bind(activityController);
document.querySelector("#logout").onclick = loginController.logout.bind(loginController);