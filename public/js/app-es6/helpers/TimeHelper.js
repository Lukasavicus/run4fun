export class TimeHelper{
    constructor(){
        throw new Error("This class should not be instantiated");
    }

    static getNumberSeconds(timeString){
        const hours = parseInt(timeString.split(':')[0]); // TODO: improve it
        const minutes = parseInt(timeString.split(':')[1]);
        const seconds = parseInt(timeString.split(':')[2]);

        return ((hours * 3600) + (minutes * 60) + (seconds * 1));
    }

    static getNumberHours(timeString){
        return (TimeHelper.getNumberSeconds(timeString) / 3600);
    }

    static timeToText(h=0, m=0, s=0){

        let hours = h;
        let minutes = m;
        let seconds = s;

        let secs = "00";
        let mins = "00";
        let hrs  = "00";

        //console.log(hours, minutes, seconds, h, m, s);

        if(seconds >= 60){
            hrs = parseInt(seconds / 3600);
            seconds %= 3600;
            mins = parseInt(seconds / 60);
            seconds %= 60;
            secs = parseInt(seconds % 60);
        }
        else{
            secs = seconds;
        }

        if(minutes >= 60){
            hrs = parseInt(minutes / 60);
            minutes %= 60;
            mins = parseInt(minutes % 60);
        }
        else if(s < 60){
            mins = minutes;
        }

        if(s < 60 && m < 60){
            hrs = hours;
        }

        //console.log(hrs, mins, secs);

        secs = ((secs < 10) ? '0' : '') + secs;
        mins = ((mins < 10) ? '0' : '') + mins;
        hrs = ((hrs < 10) ? '0' : '') + hrs;

        return `${hrs}:${mins}:${secs}`;
    }
}