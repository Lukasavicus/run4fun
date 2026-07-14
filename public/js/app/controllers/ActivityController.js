'use strict';

System.register(['../helpers/Bind', '../helpers/DateHelper', '../helpers/MultiBind', '../models/Activity', '../models/Message', '../models/User', '../services/UserService', '../views/ActivitiesView', '../views/ActivitiesDashboardView', '../views/MessageView', '../views/NavigationBarView', '../views/BadgesView', '../views/CollectiblesView', '../views/TransactionsView', '../views/PurchaseModalView', '../models/Collectible', '../views/AnalyticsView', '../views/SettingsView'], function (_export, _context) {
    "use strict";

    var Bind, DateHelper, MultiBind, Activity, Message, User, UserService, ActivitiesView, ActivitiesDashboardView, MessageView, NavigationBarView, BadgesView, CollectiblesView, TransactionsView, PurchaseModalView, Collectible, AnalyticsView, SettingsView, _createClass, $, ActivityController, activityController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function activityControllerInstance() {
        return activityController;
    }

    _export('activityControllerInstance', activityControllerInstance);

    return {
        setters: [function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersMultiBind) {
            MultiBind = _helpersMultiBind.MultiBind;
        }, function (_modelsActivity) {
            Activity = _modelsActivity.Activity;
        }, function (_modelsMessage) {
            Message = _modelsMessage.Message;
        }, function (_modelsUser) {
            User = _modelsUser.User;
        }, function (_servicesUserService) {
            UserService = _servicesUserService.UserService;
        }, function (_viewsActivitiesView) {
            ActivitiesView = _viewsActivitiesView.ActivitiesView;
        }, function (_viewsActivitiesDashboardView) {
            ActivitiesDashboardView = _viewsActivitiesDashboardView.ActivitiesDashboardView;
        }, function (_viewsMessageView) {
            MessageView = _viewsMessageView.MessageView;
        }, function (_viewsNavigationBarView) {
            NavigationBarView = _viewsNavigationBarView.NavigationBarView;
        }, function (_viewsBadgesView) {
            BadgesView = _viewsBadgesView.BadgesView;
        }, function (_viewsCollectiblesView) {
            CollectiblesView = _viewsCollectiblesView.CollectiblesView;
        }, function (_viewsTransactionsView) {
            TransactionsView = _viewsTransactionsView.TransactionsView;
        }, function (_viewsPurchaseModalView) {
            PurchaseModalView = _viewsPurchaseModalView.PurchaseModalView;
        }, function (_modelsCollectible) {
            Collectible = _modelsCollectible.Collectible;
        }, function (_viewsAnalyticsView) {
            AnalyticsView = _viewsAnalyticsView.AnalyticsView;
        }, function (_viewsSettingsView) {
            SettingsView = _viewsSettingsView.SettingsView;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            $ = document.querySelector.bind(document);

            ActivityController = function () {
                function ActivityController() {
                    var _this = this;

                    _classCallCheck(this, ActivityController);

                    this._service = new UserService();

                    var userInfo = null;

                    this._date = $("#date");
                    this._activity = $("#activity");
                    this._place = $("#place");
                    this._route_distance = $("#route_distance");
                    this._time = $("#time");

                    // this._targetCollectible = new Collectible();
                    this._purchaseCollectible = new Bind(Collectible, new PurchaseModalView($("#purchase-modal")));

                    this._service.getUserInfo().then(function (user_obj) {
                        userInfo = user_obj;
                    }).then(function () {

                        _this._user = _this._newUserModel(userInfo);
                        _this._message = new Bind(new Message(), new MessageView($("#messaging")), 'text');
                        _this._init();
                    });
                }

                _createClass(ActivityController, [{
                    key: '_newUserModel',
                    value: function _newUserModel(userInfo) {
                        return new MultiBind(new User(userInfo.name, userInfo.balance, userInfo.login, userInfo.role), [new ActivitiesView($("#activities-data")), new ActivitiesDashboardView($("#management-dashboard")), new AnalyticsView($("#analytics")), new BadgesView($("#badges")), new CollectiblesView($("#collectibles")), new TransactionsView($("#extract")), new SettingsView($("#settings")), new NavigationBarView($(".user-pill"))], 'addActivity', 'setAnalyticsFilters', 'addBadge', 'setBadges', 'addCollectible', 'setCollectibles', 'addTransaction', 'setBalance', 'setTransactions', 'setPublicSettings');
                    }
                }, {
                    key: '_init',
                    value: function _init() {
                        this.import();
                        //this._test();
                    }
                }, {
                    key: 'add',
                    value: function add(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var activity = this._createActivity();
                        console.log("ADD Activity");
                        this._service.addActivity(activity).then(function (res) {
                            console.log(res);
                            _this2._message.text = "Activity created";
                            return Promise.all([_this2._refreshBadges(), _this2._refreshBalance(), _this2._refreshTransactions()]);
                        }).catch(function (error) {
                            return _this2._message.text = error;
                        });

                        this._user.addActivity(activity);

                        this._cleanForm();
                    }
                }, {
                    key: 'import',
                    value: function _import() {
                        var _this3 = this;

                        this._service.getUserActivities().then(function (activities) {
                            activities.forEach(function (activity) {
                                return _this3._user.addActivity(activity);
                            });
                        }).catch(function (error) {
                            return _this3._message.text = error;
                        });

                        this._service.getUserBadges().then(function (badges) {
                            return _this3._user.setBadges(badges);
                        }).catch(function (error) {
                            return _this3._message.text = error;
                        });

                        this._service.getUserCollectibles().then(function (collectibles) {
                            return _this3._user.setCollectibles(collectibles);
                        }).catch(function (error) {
                            return _this3._message.text = error;
                        });

                        this._service.getUserTransactions().then(function (transactions) {
                            return _this3._user.setTransactions(transactions);
                        }).catch(function (error) {
                            return _this3._message.text = error;
                        });

                        this._service.getPublicSettings().then(function (settings) {
                            return _this3._user.setPublicSettings(settings);
                        }).catch(function (error) {
                            return _this3._message.text = error;
                        });
                    }
                }, {
                    key: '_refreshBadges',
                    value: function _refreshBadges() {
                        var _this4 = this;

                        return this._service.getUserBadges().then(function (badges) {
                            return _this4._user.setBadges(badges);
                        });
                    }
                }, {
                    key: '_refreshBalance',
                    value: function _refreshBalance() {
                        var _this5 = this;

                        return this._service.getUserInfo().then(function (user) {
                            return _this5._user.setBalance(user.balance);
                        });
                    }
                }, {
                    key: '_refreshTransactions',
                    value: function _refreshTransactions() {
                        var _this6 = this;

                        return this._service.getUserTransactions().then(function (transactions) {
                            return _this6._user.setTransactions(transactions);
                        });
                    }
                }, {
                    key: '_refreshCollectibles',
                    value: function _refreshCollectibles() {
                        var _this7 = this;

                        return this._service.getUserCollectibles().then(function (collectibles) {
                            return _this7._user.setCollectibles(collectibles);
                        });
                    }
                }, {
                    key: '_createActivity',
                    value: function _createActivity() {
                        return new Activity(DateHelper.textToDate(this._date.value), this._activity.value, this._place.value, parseFloat(this._route_distance.value), this._time.value);
                    }
                }, {
                    key: '_cleanForm',
                    value: function _cleanForm() {
                        this._date = new Date();
                        this._activity = "Walking";
                        this._place = "";
                        this._route_distance = 0.00;
                        this._time = "00:00:00";
                        //this._date.focus();
                    }
                }, {
                    key: 'toogle_section',
                    value: function toogle_section(event) {
                        var button = event.target;
                        var toogle = button.dataset.toogle;
                        var target = button.closest(".section-title").querySelector("section");

                        if (toogle == "true") {
                            button.innerText = "Show";
                            button.dataset.toogle = "false";
                            target.classList.add("collapsed");
                        } else {
                            button.innerText = "Hide";
                            button.dataset.toogle = "true";
                            target.classList.remove("collapsed");
                        }
                    }
                }, {
                    key: 'updateAnalytics',
                    value: function updateAnalytics() {
                        this._user.setAnalyticsFilters($("#analytics-period").value, $("#analytics-from").value, $("#analytics-to").value);
                    }
                }, {
                    key: 'savePublicSettings',
                    value: function savePublicSettings(event) {
                        var _this8 = this;

                        event.preventDefault();

                        var settings = {
                            kpis: $("#public-kpis").checked,
                            runs: $("#public-runs").checked,
                            badges: $("#public-badges").checked,
                            collectibles: $("#public-collectibles").checked
                        };

                        this._service.updatePublicSettings(settings).then(function (savedSettings) {
                            _this8._user.setPublicSettings(savedSettings);
                            _this8._message.text = "Public settings saved";
                        }).catch(function (error) {
                            return _this8._message.text = error;
                        });
                    }
                }, {
                    key: 'buyCollectible',
                    value: function buyCollectible(elem) {
                        var _this9 = this;

                        // open modal, option to confirm checkout, purchase order
                        console.log(elem);

                        var icon = elem.dataset.icon;
                        var hist = elem.dataset.hist;

                        new this._purchaseCollectible(elem.id, elem.dataset.title, icon, elem.dataset.price, elem.dataset.serie, hist, false, elem.dataset.description);
                        $("#parent-purchase-modal").style.display = "block";

                        $('.modal-close').addEventListener('click', function () {
                            return $("#parent-purchase-modal").style.display = "none";
                        });
                        $('#dismiss-modal').addEventListener('click', function () {
                            return $("#parent-purchase-modal").style.display = "none";
                        });

                        $('#purchase-modal-form').addEventListener('submit', function (event) {
                            event.preventDefault();

                            $(".oper-gif img").classList.remove('disp-n');
                            _this9._service.purchaseCollectible(elem.id).then(function (resp) {
                                $(".oper-gif img").src = './imgs/misc/ok.gif';
                                $(".modal-content").classList.remove('error');
                                $(".modal-content").classList.add('success');
                                console.log("RESP on AcCntrl", resp);
                                return Promise.all([_this9._refreshCollectibles(), _this9._refreshBalance(), _this9._refreshTransactions()]);
                            }).catch(function (resp) {
                                $(".oper-gif img").src = './imgs/misc/nok.gif';
                                $(".modal-content").classList.remove('success');
                                $(".modal-content").classList.add('error');
                                console.log("RESP on AcCntrl", resp);
                            });
                        });
                    }
                }, {
                    key: '_closeModal',
                    value: function _closeModal() {
                        $("#parent-purchase-modal").style.display = "none";
                    }
                }, {
                    key: 'deleteActivity',
                    value: function deleteActivity(elem) {
                        console.log(elem);
                        var activity_id = elem.parentElement.parentElement.querySelector("td").innerText;
                        this._service.removeActivity(activity_id).then(function (r) {
                            return console.log("resp", r);
                        });
                    }
                }]);

                return ActivityController;
            }();

            activityController = new ActivityController();
        }
    };
});
//# sourceMappingURL=ActivityController.js.map