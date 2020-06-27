import {HttpService} from './HttpService';

import {Activity} from '../models/Activity';
import {Badge} from '../models/Badge';
import {Collectible} from '../models/Collectible';
import {Transaction} from '../models/Transaction';

export class UserService {
    constructor(){
        this._httpService = new HttpService();
    }

    //User
    getUserInfo(){
        return new Promise((resolve, reject) => {
            this._httpService
            .get('/v1/user')
            .then(user_obj => resolve(user_obj))
            .catch(error => {
                console.log(error);
                reject(`Could not get collectibles for user`);
            });
        });
    }

    //Collectibles
    getUserCollectibles(){
        return new Promise((resolve, reject) => {
            this._httpService
            .get('/v1/users/collectibles')
            .then(collectibles_obj => resolve(collectibles_obj.map(collectible_obj =>
                    new Collectible(
                        collectible_obj._id,
                        collectible_obj.title,
                        collectible_obj.icon,
                        collectible_obj.value,
                        collectible_obj.serie,
                        collectible_obj.hist,
                        collectible_obj.owned,
                        collectible_obj.description
                    ))
            ))
            .catch(error => {
                console.log(error);
                reject(`Could not get collectibles for user`);
            });
        });
    }

    //Badges
    getUserBadges(){
        return new Promise((resolve, reject) => {
            this._httpService
            .get('/v1/users/badges')
            .then(badges_obj =>
                resolve(badges_obj.map(badge_obj =>
                    new Badge(
                        badge_obj.title,
                        badge_obj.icon,
                        badge_obj.description
                    )
                ))
            )
            .catch(error => {
                console.log(error);
                reject(`Could not get badges for user`);
            });
        });
    }

    // Activities
    getUserActivities(){
        return new Promise((resolve, reject) => {
            this._httpService
            .get('/v1/activities')
            .then(activities_obj =>
                resolve(activities_obj.map(activity_obj =>
                    new Activity(
                        new Date(activity_obj.date),
                        activity_obj.physical_activity,
                        activity_obj.place,
                        activity_obj.route_distance,
                        activity_obj.time
                    )
                ))
            )
            .catch(error => {
                console.log(error);
                reject(`Could not get activities for user`);
            });
        });
        
        /*
        return this._httpService
            .get('/v1/activities')
            .then(activities => console.log());
        */
    }

    // Transactions
    getUserTransactions(){
        return new Promise((resolve, reject) => {
            this._httpService
            .get('/v1/transactions')
            .then(transactions_obj =>
                resolve(transactions_obj.map(transaction_obj =>
                    new Transaction(
                        new Date(transaction_obj.date),
                        transaction_obj.value,
                        transaction_obj.type,
                        transaction_obj.description,
                    )
                ))
            )
            .catch(error => {
                console.log(error);
                reject(`Could not get transactions for user`);
            });
        });
    }

    addActivity(activity){
        return new Promise((resolve, reject) => {
            this._httpService
            .post('/v1/activities', {
                method : 'POST',
                body: JSON.stringify({
                    'date' : activity.date,
                    'physical_activity' : activity.physical_activity,
                    'place' : activity.place,
                    'route_distance' : activity.route_distance,
                    'time' : activity.time,
                }),
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            }, true)
            .then(response => {
                let user_obj = response['user_activities'];
                console.log(user_obj);
                let activity_obj = response['activity'];
                resolve(new Activity(
                        new Date(activity_obj.date),
                        activity_obj.physical_activity,
                        activity_obj.place,
                        activity_obj.route_distance,
                        activity_obj.time
                    )
                )
            })
            .catch(error => {
                console.log(error);
                reject(`Could not create activities for user`);
            });
        });
    }

    purchaseCollectible(collectible_id){
        // TODO: Try to use patch
        // return new Promise((resolve, reject) => {
        //     this._httpService
        //         .patch(`/v1/collectibles/${collectible_id}`)
        //         .then(res => resolve(res));
        // });
        return new Promise((resolve, reject) => {
            this._httpService
                .get(`/v1/collectible/purchase/${collectible_id}`)
                // .then(res => {console.log('RES SERVICE', res); return resolve(res)});
                .then(res => {
                    // console.log('RES SERVICE', res);
                    resolve(res);
                })
                .catch(res => {
                    // console.log('RES SERVICE ERROR', res);
                    reject(res);
                });
        });
    }

}
