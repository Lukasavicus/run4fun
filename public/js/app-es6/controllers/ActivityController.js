import {Bind} from '../helpers/Bind';
import { DateHelper } from '../helpers/DateHelper';
import {MultiBind} from '../helpers/MultiBind';

import {Activity} from '../models/Activity';
import {ListActivities} from '../models/ListActivities';
import {Message} from '../models/Message';

import {ActivityService} from '../services/ActivityService';

import {ActivitiesView} from '../views/ActivitiesView';
import {ActivitiesDashboardView} from '../views/ActivitiesDashboardView';
import {MessageView} from '../views/MessageView';

class ActivityController {

    constructor(){
        let $ = document.querySelector.bind(document);
    
        this._date = $("#date");
        this._activity = $("#activity");
        this._place = $("#place");
        this._route_distance = $("#route_distance");
        this._time = $("#time");

        //this._listActivities = new Bind(new ListActivities(), new ActivitiesView($("#activities-data")), 'add');
        this._listActivities = new MultiBind(new ListActivities(), [
            new ActivitiesView($("#activities-data")), 
            new ActivitiesDashboardView($("#management-dashboard"))
        ], 'add');
        this._message = new Bind(new Message(), new MessageView($("#messaging")), 'text');

        this._service = new ActivityService();
    }

    test(){
        this._listActivities.add(new Activity(DateHelper.textToDate("2020-01-01"), "Running", "condominium gym", 4, "00:36:51"));
        this._listActivities.add(new Activity(DateHelper.textToDate("2020-01-03"), "Running", "condominium gym", 4, "00:36:45"));
        this._listActivities.add(new Activity(DateHelper.textToDate("2020-01-12"), "Running", "condominium gym", 5, "00:46:59"));

        this._message.text = 'New Activities created';
    }

    add(event){
        event.preventDefault();

        const activity = this._createActivity();

        this._service
            .addActivity(activity)
            .then(res => {
                console.log(res);
                this._message.text = "Activity created";
            })
            .catch(error => this._message.text = error);

        this._listActivities.add(activity);

        //this._message.text = 'New Activity created';

        this._cleanForm();
    }

    import() {
        this._service
            .getUserActivities()
            .then(activities => {
                activities.forEach(activity => this._listActivities.add(activity));
                this._message.text = "Activities imported";
            })
            .catch(error => this._message.text = error);
    }

    _createActivity(){
        return new Activity(
            DateHelper.textToDate(this._date.value),
            this._activity.value,
            this._place.value,
            parseFloat(this._route_distance.value),
            this._time.value
        );
    }

    _cleanForm(){
        this._date = new Date();
        this._activity = "Walking";
        this._place = "";
        this._route_distance = 0.00;
        this._time = "00:00:00";
        //this._date.focus();
    }
}

let activityController = new ActivityController();

export function activityControllerInstance(){
    return activityController;
}