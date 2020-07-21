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

setTimeout(() => {
        console.log('collectibles loaded');
        Array
            .from(document.querySelectorAll("div.collectible.not-purchased"))
            .forEach(el => {
                el.onclick = function(){
                    Reflect.apply(activityController.buyCollectible, activityController, [el]);
                };
            });
}, 1500);

setTimeout(() => {
        console.log('activities loaded');
        Array
            .from(document.querySelectorAll("td button"))
            .filter(el => el.innerText=="edit")
            .forEach(el => {
                el.onclick = function(){
                    //Reflect.apply(activityController.buyCollectible, activityController, [el]);
                };
            });
        Array
            .from(document.querySelectorAll("td button"))
            .filter(el => el.innerText=="delete")
            .forEach(el => {
                el.onclick = function(){
                    Reflect.apply(activityController.deleteActivity, activityController, [el]);
                };
            });
}, 1500);