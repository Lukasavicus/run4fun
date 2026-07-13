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

            document.querySelector("#collectibles").onclick = function (event) {
                var collectible = event.target.closest("div.collectible.not-purchased");
                if (collectible) Reflect.apply(activityController.buyCollectible, activityController, [collectible]);
            };

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