'use strict';

System.register(['../helpers/Bind', '../helpers/DateHelper', '../helpers/MultiBind', '../models/Activity', '../models/Message', '../models/User', '../services/UserService', '../views/ActivitiesView', '../views/ActivitiesDashboardView', '../views/MessageView', '../views/NavigationBarView', '../views/BadgesView', '../views/CollectiblesView', '../views/TransactionsView', '../views/PurchaseModalView', '../models/Collectible'], function (_export, _context) {
    "use strict";

    var Bind, DateHelper, MultiBind, Activity, Message, User, UserService, ActivitiesView, ActivitiesDashboardView, MessageView, NavigationBarView, BadgesView, CollectiblesView, TransactionsView, PurchaseModalView, Collectible, _createClass, $, ActivityController, activityController;

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

                    var name = null;
                    var balance = null;

                    this._date = $("#date");
                    this._activity = $("#activity");
                    this._place = $("#place");
                    this._route_distance = $("#route_distance");
                    this._time = $("#time");

                    // this._targetCollectible = new Collectible();
                    this._purchaseCollectible = new Bind(Collectible, new PurchaseModalView($("#purchase-modal")));

                    this._service.getUserInfo().then(function (user_obj) {
                        name = user_obj.name;
                        balance = user_obj.balance;
                    }).then(function () {

                        _this._user = _this._newUserModel(name, balance);
                        _this._message = new Bind(new Message(), new MessageView($("#messaging")), 'text');
                        _this._init();
                    });
                }

                _createClass(ActivityController, [{
                    key: '_newUserModel',
                    value: function _newUserModel(name, balance) {
                        return new MultiBind(new User(name, balance), [new ActivitiesView($("#activities-data")), new ActivitiesDashboardView($("#management-dashboard")), new BadgesView($("#badges")), new CollectiblesView($("#collectibles")), new TransactionsView($("#extract")), new NavigationBarView($(".user-pill"))], 'addActivity', 'addBadge', 'addCollectible', 'addTransaction');
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
                            return badges;
                        }).then(function (badges) {
                            badges.forEach(function (badge) {
                                return _this3._user.addBadge(badge);
                            });
                        }).catch(function (error) {
                            return _this3._message.text = error;
                        });

                        this._service.getUserCollectibles().then(function (collectibles) {
                            collectibles.forEach(function (collectible) {
                                return _this3._user.addCollectible(collectible);
                            });
                        }).catch(function (error) {
                            return _this3._message.text = error;
                        });

                        this._service.getUserTransactions().then(function (transactions) {
                            transactions.forEach(function (transaction) {
                                return _this3._user.addTransaction(transaction);
                            });
                        }).catch(function (error) {
                            return _this3._message.text = error;
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
                        var _id = event.target.id;
                        var toogle = $('#' + _id).dataset.toogle;
                        var target = $('#' + _id).parentElement.querySelector("section");

                        if (toogle == "true") {
                            $('#' + _id).innerText = "[Show Section]";
                            $('#' + _id).dataset.toogle = "false";
                        } else {
                            $('#' + _id).innerText = "[Hide Section]";
                            $('#' + _id).dataset.toogle = "true";
                        }

                        Array.from(target.children).forEach(function (el) {
                            console.log(el);
                        });
                        Array.from(target.children).forEach(function (el) {
                            return el.classList.toggle("invisible");
                        });
                    }
                }, {
                    key: 'buyCollectible',
                    value: function buyCollectible(elem) {
                        var _this4 = this;

                        // open modal, option to confirm checkout, purchase order
                        console.log(elem);

                        var items = Array.from(elem.children);
                        var icon = items[0].src;
                        var hist = items[1].innerText;

                        new this._purchaseCollectible(elem.id, "Title", icon, elem.dataset.price, elem.dataset.serie, hist, false, "desc");
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
                            _this4._service.purchaseCollectible(elem.id).then(function (resp) {
                                $(".oper-gif img").src = './imgs/misc/ok.gif';
                                $(".modal-content").classList.remove('error');
                                $(".modal-content").classList.add('success');
                                console.log("RESP on AcCntrl", resp);
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
                }]);

                return ActivityController;
            }();

            activityController = new ActivityController();
        }
    };
});
//# sourceMappingURL=ActivityController.js.map