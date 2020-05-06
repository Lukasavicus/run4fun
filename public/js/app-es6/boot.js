import {activityControllerInstance} from './controllers/ActivityController';

let activityController = activityControllerInstance();

document.querySelector('#activity-form').onsubmit = activityController.add.bind(activityController);
document.querySelector('#import-activities').onclick = activityController.import.bind(activityController);

activityController.test();