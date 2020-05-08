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
    }
  };
});
//# sourceMappingURL=boot.js.map