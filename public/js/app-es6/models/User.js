import {TimeHelper} from '../helpers/TimeHelper';
import { BadgeList } from './BadgeList';
import { CollectibleList } from './CollectibleList';
import { TransactionList } from './TransactionList';

export class User {
    constructor(name, balance=0){
        this._name = name;
        this._balance = balance;
        this._activities = [];
        this._badgeList = new BadgeList();
        this._collectibleList = new CollectibleList();
        this._transactionList = new TransactionList();
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

    // Transactions

    addTransaction(transaction){
        this._transactionList.add(transaction);
    }

    get transactionList(){
        return this._transactionList;
    }

    get total_distance(){
        return parseFloat(this._activities.reduce((total, activity) => total += activity.route_distance, 0.0)).toFixed(2);
    }

    get _total_time_secs(){
        return this._activities.reduce((total, activity) => total += TimeHelper.getNumberSeconds(activity.time), 0.0);
    }

    get total_time(){
        return TimeHelper.timeToText(0, 0, this._total_time_secs);
    }

    get max_velocity(){
        return parseFloat(this._activities.reduce((max_, activity) => (max_ > activity.avg_velocity_kmh) ? max_ : activity.avg_velocity_kmh, 0.0)).toFixed(2);
    }

    get max_distance(){
        return parseFloat(this._activities.reduce((max_, activity) => (max_ > activity.route_distance) ? max_ : activity.route_distance, 0.0)).toFixed(2);
    }

    get avg_velocity_ms(){
        const secs = TimeHelper.getNumberSeconds(this.total_time);
        return ((this.total_distance * 1000) / secs).toFixed(2);
    }

    get avg_velocity_kmh(){
        const hours = TimeHelper.getNumberHours(this.total_time);
        return (this.total_distance / hours).toFixed(2);
    }

}