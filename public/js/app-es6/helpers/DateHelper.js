export class DateHelper {

    constructor(){
        throw new Error('This class could not be instantiated');
    }

    static dateToText(date){
        const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        const MM = ((date.getMonth()+1) < 10 ? '0' : '') + (date.getMonth()+1);
        return `${dd}/${MM}/${date.getFullYear()}`;
    }

    static textToDate(text){
        if(!DateHelper._assert(text))
            throw new Error('The date should be in format aaaa-mm-dd');
        return new Date(...text.split('-').map((el, idx) => el - (idx % 2)));
    }

    static _assert(text){
        return /^\d{4}-\d{2}-\d{2}$/.test(text);
    }
}