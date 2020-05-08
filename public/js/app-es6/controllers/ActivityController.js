import {Bind} from '../helpers/Bind';
import { DateHelper } from '../helpers/DateHelper';
import {MultiBind} from '../helpers/MultiBind';

import {Activity} from '../models/Activity';
import {Message} from '../models/Message';
import {User} from '../models/User';

import {UserService} from '../services/UserService';

import {ActivitiesView} from '../views/ActivitiesView';
import {ActivitiesDashboardView} from '../views/ActivitiesDashboardView';
import {MessageView} from '../views/MessageView';
import { NavigationBarView } from '../views/NavigationBarView';
import { BadgesView } from '../views/BadgesView';
import { CollectiblesView } from '../views/CollectiblesView';

class ActivityController {

    constructor(){
        let $ = document.querySelector.bind(document);
    
        this._date = $("#date");
        this._activity = $("#activity");
        this._place = $("#place");
        this._route_distance = $("#route_distance");
        this._time = $("#time");

        //this._user = new Bind(new ListActivities(), new ActivitiesView($("#activities-data")), 'add');
        this._user = new MultiBind(new User(window.sessionStorage.login), [
            new ActivitiesView($("#activities-data")), 
            new ActivitiesDashboardView($("#management-dashboard")),
            new BadgesView($("#badges")),
            new CollectiblesView($("#collectibles")),
            new NavigationBarView($(".user-pill"))
        ], 'addActivity', 'addBadge');
        this._message = new Bind(new Message(), new MessageView($("#messaging")), 'text');

        /**
         * this._collectiblesList = new Bind(new CollectiblesList(), new CollectiblesView(), 'addCollectible'); // creates a new instance of model-view -> CollectiblesList
         * 
         * buyCollectible(){ open modal, option to confirm checkout, purchase order }
         */

        this._service = new UserService();

        this.import();

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

        this._user.addActivity(activity);

        this._cleanForm();
    }

    import() {
        this._service
            .getUserActivities()
            .then(activities => {
                activities.forEach(activity => this._user.addActivity(activity));
            })
            .catch(error => this._message.text = error);

        this._service
            .getUserBadges()
            .then(badges => {
                return badges;
            })
            .then(badges => {
                badges.forEach(badge => this._user.addBadge(badge));
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