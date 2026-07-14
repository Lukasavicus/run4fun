import {activityControllerInstance} from './controllers/ActivityController';
import {loginControllerInstance} from './controllers/LoginController';

let activityController = activityControllerInstance();
let loginController = loginControllerInstance();

document.querySelector('#activity-form').onsubmit = activityController.add.bind(activityController);
document.querySelector("#logout").onclick = loginController.logout.bind(loginController);

Array
    .from(document.querySelectorAll(".toogle-content"))
    .forEach(el => el.onclick = activityController.toogle_section.bind(activityController));

document.querySelector("#collectibles").onclick = event => {
    const collectible = event.target.closest("div.collectible.not-purchased");
    if(collectible) Reflect.apply(activityController.buyCollectible, activityController, [collectible]);
};

document.querySelector("#analytics").onchange = event => {
    if(event.target.closest(".analytics-controls"))
        Reflect.apply(activityController.updateAnalytics, activityController, []);
};

document.querySelector("#settings").onsubmit = event => {
    if(event.target.id == "public-settings-form")
        Reflect.apply(activityController.savePublicSettings, activityController, [event]);
};

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
