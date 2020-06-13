import {TimeHelper} from '../helpers/TimeHelper';
import { BadgeList } from './BadgeList';
import { CollectibleList } from './CollectibleList';

export class User {
    constructor(name, balance=0){
        this._name = name;
        this._balance = balance;
        this._activities = [];
        this._badgeList = new BadgeList();
        this._collectibleList = new CollectibleList();
    }

    get name(){
        return this._name;
    }

    get balance(){
        return this._balance;
    }

    //Collectibles
    addCollectible(collectible){
        this._collectibleList.add(collectible);
    }

    get collectibleList(){
        return this._collectibleList;
    }

    //Badges
    addBadge(badge){
        this._badgeList.add(badge);
    }

    get badgeList(){
        return this._badgeList;
    }

    // Activities
    addActivity(activity){
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