import {TimeHelper} from '../helpers/TimeHelper';
import { BadgeList } from './BadgeList';
import { CollectibleList } from './CollectibleList';
import { TransactionList } from './TransactionList';

export class User {
    constructor(name, balance=0, login='', role='user'){
        this._name = name;
        this._balance = balance;
        this._login = login;
        this._role = role;
        this._activities = [];
        this._badgeList = new BadgeList();
        this._collectibleList = new CollectibleList();
        this._transactionList = new TransactionList();
        this._analyticsPeriod = 'month';
        this._analyticsFrom = '';
        this._analyticsTo = '';
        this._publicSettings = {badges: true, collectibles: true, kpis: true, runs: false};
        this._adminSummary = null;
    }

    get name(){
        return this._name;
    }

    get login(){
        return this._login;
    }

    get role(){
        return this._role;
    }

    get balance(){
        return this._balance;
    }

    setBalance(balance){
        this._balance = balance;
    }

    //Collectibles
    addCollectible(collectible){
        this._collectibleList.add(collectible);
    }

    setCollectibles(collectibles){
        this._collectibleList.replace(collectibles);
    }

    get collectibleList(){
        return this._collectibleList;
    }

    //Badges
    addBadge(badge){
        this._badgeList.add(badge);
    }

    setBadges(badges){
        this._badgeList.replace(badges);
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

    setAnalyticsFilters(period, from, to){
        this._analyticsPeriod = period || 'month';
        this._analyticsFrom = from || '';
        this._analyticsTo = to || '';
    }

    get analyticsPeriod(){
        return this._analyticsPeriod;
    }

    get analyticsFrom(){
        return this._analyticsFrom;
    }

    get analyticsTo(){
        return this._analyticsTo;
    }

    // Transactions

    addTransaction(transaction){
        this._transactionList.add(transaction);
    }

    setTransactions(transactions){
        this._transactionList.replace(transactions);
    }

    get transactionList(){
        return this._transactionList;
    }

    setPublicSettings(settings){
        this._publicSettings = settings || {badges: true, collectibles: true, kpis: true, runs: false};
    }

    get publicSettings(){
        return this._publicSettings;
    }

    setAdminSummary(summary){
        this._adminSummary = summary;
    }

    get adminSummary(){
        return this._adminSummary;
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

    get best_pace(){
        const bestSeconds = this._activities.reduce((best, activity) => {
            const distance = Number(activity.route_distance || 0);
            const seconds = TimeHelper.getNumberSeconds(activity.time);
            if(distance <= 0 || seconds <= 0) return best;

            const pace = seconds / distance;
            return best == null || pace < best ? pace : best;
        }, null);

        if(bestSeconds == null) return '--:--/km';

        const minutes = parseInt(bestSeconds / 60);
        const seconds = parseInt(bestSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}/km`;
    }

}
