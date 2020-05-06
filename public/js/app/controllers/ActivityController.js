'use strict';

System.register(['../helpers/Bind', '../helpers/DateHelper', '../helpers/MultiBind', '../models/Activity', '../models/ListActivities', '../models/Message', '../services/ActivityService', '../views/ActivitiesView', '../views/ActivitiesDashboardView', '../views/MessageView'], function (_export, _context) {
    "use strict";

    var Bind, DateHelper, MultiBind, Activity, ListActivities, Message, ActivityService, ActivitiesView, ActivitiesDashboardView, MessageView, _createClass, ActivityController, activityController;

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
        }, function (_modelsListActivities) {
            ListActivities = _modelsListActivities.ListActivities;
        }, function (_modelsMessage) {
            Message = _modelsMessage.Message;
        }, function (_servicesActivityService) {
            ActivityService = _servicesActivityService.ActivityService;
        }, function (_viewsActivitiesView) {
            ActivitiesView = _viewsActivitiesView.ActivitiesView;
        }, function (_viewsActivitiesDashboardView) {
            ActivitiesDashboardView = _viewsActivitiesDashboardView.ActivitiesDashboardView;
        }, function (_viewsMessageView) {
            MessageView = _viewsMessageView.MessageView;
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

                    //this._listActivities = new Bind(new ListActivities(), new ActivitiesView($("#activities-data")), 'add');
                    this._listActivities = new MultiBind(new ListActivities(), [new ActivitiesView($("#activities-data")), new ActivitiesDashboardView($("#management-dashboard"))], 'add');
                    this._message = new Bind(new Message(), new MessageView($("#messaging")), 'text');

                    this._service = new ActivityService();
                }

                _createClass(ActivityController, [{
                    key: 'test',
                    value: function test() {
                        this._listActivities.add(new Activity(DateHelper.textToDate("2020-01-01"), "Running", "condominium gym", 4, "00:36:51"));
                        this._listActivities.add(new Activity(DateHelper.textToDate("2020-01-03"), "Running", "condominium gym", 4, "00:36:45"));
                        this._listActivities.add(new Activity(DateHelper.textToDate("2020-01-12"), "Running", "condominium gym", 5, "00:46:59"));

                        this._message.text = 'New Activities created';
                    }
                }, {
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

                        this._listActivities.add(activity);

                        //this._message.text = 'New Activity created';

                        this._cleanForm();
                    }
                }, {
                    key: 'import',
                    value: function _import() {
                        var _this2 = this;

                        this._service.getUserActivities().then(function (activities) {
                            activities.forEach(function (activity) {
                                return _this2._listActivities.add(activity);
                            });
                            _this2._message.text = "Activities imported";
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