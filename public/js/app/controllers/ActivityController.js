'use strict';

System.register(['../helpers/Bind', '../helpers/DateHelper', '../helpers/MultiBind', '../models/Activity', '../models/Message', '../models/User', '../services/UserService', '../views/ActivitiesView', '../views/ActivitiesDashboardView', '../views/MessageView', '../views/NavigationBarView', '../views/BadgesView', '../views/CollectiblesView'], function (_export, _context) {
    "use strict";

    var Bind, DateHelper, MultiBind, Activity, Message, User, UserService, ActivitiesView, ActivitiesDashboardView, MessageView, NavigationBarView, BadgesView, CollectiblesView, _createClass, ActivityController, activityController;

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

            ActivityController = function () {
                function ActivityController() {
                    _classCallCheck(this, ActivityController);

                    var $ = document.querySelector.bind(document);

                    this._date = $("#date");
                    this._activity = $("#activity");
                    this._place = $("#place");
                    this._route_distance = $("#route_distance");
                    this._time = $("#time");

                    //this._user = new Bind(new ListActivities(), new ActivitiesView($("#activities-data")), 'add');
                    this._user = new MultiBind(new User(window.sessionStorage.login), [new ActivitiesView($("#activities-data")), new ActivitiesDashboardView($("#management-dashboard")), new BadgesView($("#badges")), new CollectiblesView($("#collectibles")), new NavigationBarView($(".user-pill"))], 'addActivity', 'addBadge');
                    this._message = new Bind(new Message(), new MessageView($("#messaging")), 'text');

                    /**
                     * this._collectiblesList = new Bind(new CollectiblesList(), new CollectiblesView(), 'addCollectible'); // creates a new instance of model-view -> CollectiblesList
                     * 
                     * buyCollectible(){ open modal, option to confirm checkout, purchase order }
                     */

                    this._service = new UserService();

                    this.import();
                }

                _createClass(ActivityController, [{
                    key: 'add',
                    value: function add(event) {
                        var _this = this;

                        event.preventDefault();

                        var activity = this._createActivity();

                        this._service.addActivity(activity).then(function (res) {
                            console.log(res);
                            _this._message.text = "Activity created";
                        }).catch(function (error) {
                            return _this._message.text = error;
                        });

                        this._user.addActivity(activity);

                        this._cleanForm();
                    }
                }, {
                    key: 'import',
                    value: function _import() {
                        var _this2 = this;

                        this._service.getUserActivities().then(function (activities) {
                            activities.forEach(function (activity) {
                                return _this2._user.addActivity(activity);
                            });
                        }).catch(function (error) {
                            return _this2._message.text = error;
                        });

                        this._service.getUserBadges().then(function (badges) {
                            return badges;
                        }).then(function (badges) {
                            badges.forEach(function (badge) {
                                return _this2._user.addBadge(badge);
                            });
                        }).catch(function (error) {
                            return _this2._message.text = error;
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
                }]);

                return ActivityController;
            }();

            activityController = new ActivityController();
        }
    };
});
//# sourceMappingURL=ActivityController.js.map