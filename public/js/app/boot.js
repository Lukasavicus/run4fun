'use strict';

System.register(['./controllers/ActivityController', './controllers/LoginController'], function (_export, _context) {
    "use strict";

    var activityControllerInstance, loginControllerInstance, activityController, loginController;
    return {
        setters: [function (_controllersActivityController) {
            activityControllerInstance = _controllersActivityController.activityControllerInstance;
        }, function (_controllersLoginController) {
            loginControllerInstance = _controllersLoginController.loginControllerInstance;
        }],
        execute: function () {
            activityController = activityControllerInstance();
            loginController = loginControllerInstance();


            document.querySelector('#activity-form').onsubmit = activityController.add.bind(activityController);
            document.querySelector("#logout").onclick = loginController.logout.bind(loginController);

            Array.from(document.querySelectorAll(".toogle-content")).forEach(function (el) {
                return el.onclick = activityController.toogle_section.bind(activityController);
            });

            // Array
            //     .from(document.querySelectorAll("div.collectible.not-purchased"))
            //     .forEach(el => el.onclick = activityController.buyCollectible.bind(activityController));

            // console.log(Array.from(document.querySelectorAll("div.collectible.not-purchased")));

            setTimeout(function () {
                console.log('collectibles loaded');
                Array.from(document.querySelectorAll("div.collectible.not-purchased")).forEach(function (el) {
                    el.onclick = function () {
                        Reflect.apply(activityController.buyCollectible, activityController, [el]);
                    };
                });
            }, 1500);

            setTimeout(function () {
                console.log('activities loaded');
                Array.from(document.querySelectorAll("td button")).filter(function (el) {
                    return el.innerText == "edit";
                }).forEach(function (el) {
                    el.onclick = function () {
                        //Reflect.apply(activityController.buyCollectible, activityController, [el]);
                    };
                });
                Array.from(document.querySelectorAll("td button")).filter(function (el) {
                    return el.innerText == "delete";
                }).forEach(function (el) {
                    el.onclick = function () {
                        Reflect.apply(activityController.deleteActivity, activityController, [el]);
                    };
                });
            }, 1500);
        }
    };
});
//# sourceMappingURL=boot.js.map