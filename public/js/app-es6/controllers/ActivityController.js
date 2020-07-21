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
import { TransactionsView } from '../views/TransactionsView';
import { PurchaseModalView } from '../views/PurchaseModalView';
import { Collectible } from '../models/Collectible';

let $ = document.querySelector.bind(document);

class ActivityController {

    constructor(){
        this._service = new UserService();

        let name = null;
        let balance = null;

        this._date = $("#date");
        this._activity = $("#activity");
        this._place = $("#place");
        this._route_distance = $("#route_distance");
        this._time = $("#time");

        // this._targetCollectible = new Collectible();
        this._purchaseCollectible = new Bind(Collectible, new PurchaseModalView($("#purchase-modal")));

        this._service
            .getUserInfo()
            .then(user_obj => {
                name = user_obj.name;
                balance = user_obj.balance;
            })
            .then(() => {

                this._user = this._newUserModel(name, balance);
                this._message = new Bind(new Message(), new MessageView($("#messaging")), 'text');
                this._init();

            });
    }

    _newUserModel(name, balance){
        return new MultiBind(new User(name, balance), [
            new ActivitiesView($("#activities-data")), 
            new ActivitiesDashboardView($("#management-dashboard")),
            new BadgesView($("#badges")),
            new CollectiblesView($("#collectibles")),
            new TransactionsView($("#extract")),
            new NavigationBarView($(".user-pill"))
        ], 'addActivity', 'addBadge', 'addCollectible', 'addTransaction');
    }

    _init(){
        this.import();
                //this._test();
    }

    add(event){
        event.preventDefault();

        const activity = this._createActivity();
        console.log("ADD Activity");
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


        this._service
            .getUserCollectibles()
            .then(collectibles => {
                collectibles.forEach(collectible => this._user.addCollectible(collectible));
            })
            .catch(error => this._message.text = error);

            this._service
                .getUserTransactions()
                .then(transactions => {
                    transactions.forEach(transaction => this._user.addTransaction(transaction));
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

    toogle_section(event){
        let _id = event.target.id;
        let toogle = $(`#${_id}`).dataset.toogle;
        let target = $(`#${_id}`).parentElement.querySelector("section");
        
        if(toogle == "true"){
            $(`#${_id}`).innerText = "[Show Section]";
            $(`#${_id}`).dataset.toogle = "false";
        }
        else{
            $(`#${_id}`).innerText = "[Hide Section]";
            $(`#${_id}`).dataset.toogle = "true";
        }

        Array.from(target.children).forEach(el => {console.log(el)});
        Array.from(target.children).forEach(el => el.classList.toggle("invisible"));

    }

    buyCollectible(elem){
        // open modal, option to confirm checkout, purchase order
        console.log(elem);

        let items = Array.from(elem.children);
        let icon = items[0].src;
        let hist = items[1].innerText;

        new this._purchaseCollectible(elem.id, "Title", icon, elem.dataset.price, elem.dataset.serie, hist, false, "desc");
        $("#parent-purchase-modal").style.display = "block";

        $('.modal-close').addEventListener('click', () => $("#parent-purchase-modal").style.display = "none" );
        $('#dismiss-modal').addEventListener('click', () => $("#parent-purchase-modal").style.display = "none" );

        $('#purchase-modal-form').addEventListener('submit', (event) => {
            event.preventDefault();

            $(".oper-gif img").classList.remove('disp-n');
            this._service
                .purchaseCollectible(elem.id)
                .then((resp) => {
                    $(".oper-gif img").src = './imgs/misc/ok.gif';
                    $(".modal-content").classList.remove('error');
                    $(".modal-content").classList.add('success');
                    console.log("RESP on AcCntrl", resp);
                })
                .catch((resp) => {
                    $(".oper-gif img").src = './imgs/misc/nok.gif';
                    $(".modal-content").classList.remove('success');
                    $(".modal-content").classList.add('error');
                    console.log("RESP on AcCntrl", resp);
                });
        });

    }

    _closeModal(){
        $("#parent-purchase-modal").style.display = "none";
    }

    deleteActivity(elem){
        console.log(elem);
        let activity_id = elem.parentElement.parentElement.querySelector("td").innerText;
        this._service
            .removeActivity(activity_id)
            .then(r => console.log("resp", r));
    }

}

let activityController = new ActivityController();

export function activityControllerInstance(){
    return activityController;
}