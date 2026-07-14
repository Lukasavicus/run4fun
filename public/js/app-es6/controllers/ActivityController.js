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
import { AnalyticsView } from '../views/AnalyticsView';
import { SettingsView } from '../views/SettingsView';

let $ = document.querySelector.bind(document);

class ActivityController {

    constructor(){
        this._service = new UserService();

        let userInfo = null;

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
                userInfo = user_obj;
            })
            .then(() => {

                this._user = this._newUserModel(userInfo);
                this._message = new Bind(new Message(), new MessageView($("#messaging")), 'text');
                this._init();

            });
    }

    _newUserModel(userInfo){
        return new MultiBind(new User(userInfo.name, userInfo.balance, userInfo.login, userInfo.role), [
            new ActivitiesView($("#activities-data")), 
            new ActivitiesDashboardView($("#management-dashboard")),
            new AnalyticsView($("#analytics")),
            new BadgesView($("#badges")),
            new CollectiblesView($("#collectibles")),
            new TransactionsView($("#extract")),
            new SettingsView($("#settings")),
            new NavigationBarView($(".user-pill"))
        ], 'addActivity', 'setAnalyticsFilters', 'addBadge', 'setBadges', 'addCollectible', 'setCollectibles', 'addTransaction', 'setBalance', 'setTransactions', 'setPublicSettings');
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
                return Promise.all([
                    this._refreshBadges(),
                    this._refreshBalance(),
                    this._refreshTransactions()
                ]);
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
            .then(badges => this._user.setBadges(badges))
            .catch(error => this._message.text = error);


        this._service
            .getUserCollectibles()
            .then(collectibles => this._user.setCollectibles(collectibles))
            .catch(error => this._message.text = error);

            this._service
            .getUserTransactions()
            .then(transactions => this._user.setTransactions(transactions))
            .catch(error => this._message.text = error);

        this._service
            .getPublicSettings()
            .then(settings => this._user.setPublicSettings(settings))
            .catch(error => this._message.text = error);

    }

    _refreshBadges(){
        return this._service
            .getUserBadges()
            .then(badges => this._user.setBadges(badges));
    }

    _refreshBalance(){
        return this._service
            .getUserInfo()
            .then(user => this._user.setBalance(user.balance));
    }

    _refreshTransactions(){
        return this._service
            .getUserTransactions()
            .then(transactions => this._user.setTransactions(transactions));
    }

    _refreshCollectibles(){
        return this._service
            .getUserCollectibles()
            .then(collectibles => this._user.setCollectibles(collectibles));
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
        let button = event.target;
        let toogle = button.dataset.toogle;
        let target = button.closest(".section-title").querySelector("section");
        
        if(toogle == "true"){
            button.innerText = "Show";
            button.dataset.toogle = "false";
            target.classList.add("collapsed");
        }
        else{
            button.innerText = "Hide";
            button.dataset.toogle = "true";
            target.classList.remove("collapsed");
        }

    }

    updateAnalytics(){
        this._user.setAnalyticsFilters(
            $("#analytics-period").value,
            $("#analytics-from").value,
            $("#analytics-to").value
        );
    }

    savePublicSettings(event){
        event.preventDefault();

        const settings = {
            kpis: $("#public-kpis").checked,
            runs: $("#public-runs").checked,
            badges: $("#public-badges").checked,
            collectibles: $("#public-collectibles").checked,
        };

        this._service
            .updatePublicSettings(settings)
            .then(savedSettings => {
                this._user.setPublicSettings(savedSettings);
                this._message.text = "Public settings saved";
            })
            .catch(error => this._message.text = error);
    }

    buyCollectible(elem){
        // open modal, option to confirm checkout, purchase order
        console.log(elem);

        let icon = elem.dataset.icon;
        let hist = elem.dataset.hist;

        new this._purchaseCollectible(elem.id, elem.dataset.title, icon, elem.dataset.price, elem.dataset.serie, hist, false, elem.dataset.description);
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
                    return Promise.all([
                        this._refreshCollectibles(),
                        this._refreshBalance(),
                        this._refreshTransactions()
                    ]);
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
