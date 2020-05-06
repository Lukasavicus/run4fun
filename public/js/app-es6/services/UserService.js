import {HttpService} from './HttpService';

import {Activity} from '../models/Activity';
import {Badge} from '../models/Badge';

export class UserService {
    constructor(){
        this._httpService = new HttpService();
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

}
