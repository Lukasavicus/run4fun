'use strict';

System.register(['./controllers/ActivityController'], function (_export, _context) {
  "use strict";

  var activityControllerInstance, activityController;
  return {
    setters: [function (_controllersActivityController) {
      activityControllerInstance = _controllersActivityController.activityControllerInstance;
    }],
    execute: function () {
      activityController = activityControllerInstance();


      document.querySelector('#activity-form').onsubmit = activityController.add.bind(activityController);
    }
  };
});
//# sourceMappingURL=boot.js.map