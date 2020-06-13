import {activityControllerInstance} from './controllers/ActivityController';
import {loginControllerInstance} from './controllers/LoginController';

let activityController = activityControllerInstance();
let loginController = loginControllerInstance();

document.querySelector('#activity-form').onsubmit = activityController.add.bind(activityController);
document.querySelector("#logout").onclick = loginController.logout.bind(loginController);

Array
    .from(document.querySelectorAll(".toogle-content"))
    .forEach(el => el.onclick = activityController.toogle_section.bind(activityController));

// Array
//     .from(document.querySelectorAll("div.collectible.not-purchased"))
//     .forEach(el => el.onclick = activityController.buyCollectible.bind(activityController));

// console.log(Array.from(document.querySelectorAll("div.collectible.not-purchased")));

let flag = true;
		setInterval(() => {
			if(flag){
                console.log('loaded');
                Array
                    .from(document.querySelectorAll("div.collectible.not-purchased"))
                    .forEach(el => {
                        el.onclick = function(){
                            Reflect.apply(activityController.buyCollectible, activityController, [el]);
                        };
                    });

				flag = !flag
			}
		}, 1500);