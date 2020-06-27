import {TimeHelper} from '../helpers/TimeHelper';

export class Activity{
    constructor(date=new Date(), physical_activity="Walking", place="", route_distance=0.0, time="00:00:00"){
        this._date = new Date(date.getTime());
        this._physical_activity = physical_activity;
        this._place = place;
        this._route_distance = route_distance;
        this._time = time;

        Object.freeze(this);
    }

    get avg_velocity_ms(){
        // return the average velocity in meters/second;
        const secs = TimeHelper.getNumberSeconds(this._time);
        return ((this._route_distance * 1000) / secs).toFixed(2);
    }

    get avg_velocity_kmh(){
        // return the average velocity in km/h;
        const hours = TimeHelper.getNumberHours(this._time);
        return (this._route_distance / hours).toFixed(2);
    }

    avg_time_by_distance(dist){
        return TimeHelper.timeToText(0, 0, (parseInt(dist / this.avg_velocity_ms)));
    }
    
    get date(){
        return new Date(this._date.getTime());
    }
    
    get physical_activity(){
        return this._physical_activity;
    }
    
    get place(){
     return this._place;
    }
    
    get route_distance(){
        return this._route_distance;
    }
    
    get time(){
        return this._time;
    }

}