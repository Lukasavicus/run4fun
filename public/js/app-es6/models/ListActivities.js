import {TimeHelper} from '../helpers/TimeHelper';

export class ListActivities {
    constructor(){
        this._activities = [];
    }

    add(activity){
        this._activities.push(activity);
    }

    get activities(){
        return [].concat(this._activities);
    }

    get total_kms(){
        return parseFloat(this._activities.reduce((total, activity) => total += activity.route_distance, 0.0)).toFixed(2);
    }

    get total_time(){
        return TimeHelper.timeToText(0, 0, this._activities.reduce((total, activity) => total += TimeHelper.getNumberSeconds(activity.time), 0.0));
    }

}