'use strict';

System.register(['./controllers/ActivityController', './controllers/LoginController'], function (_export, _context) {
    "use strict";

    var activityControllerInstance, loginControllerInstance, activityController, loginController, flag;
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

            flag = true;

            setInterval(function () {
                if (flag) {
                    console.log('loaded');
                    Array.from(document.querySelectorAll("div.collectible.not-purchased")).forEach(function (el) {
                        el.onclick = function () {
                            Reflect.apply(activityController.buyCollectible, activityController, [el]);
                        };
                    });

                    flag = !flag;
                }
            }, 1500);
        }
    };
});
//# sourceMappingURL=boot.js.map