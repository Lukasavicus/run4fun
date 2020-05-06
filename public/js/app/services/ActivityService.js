'use strict';

System.register(['./HttpService', '../models/Activity'], function (_export, _context) {
    "use strict";

    var HttpService, Activity, _createClass, ActivityService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_modelsActivity) {
            Activity = _modelsActivity.Activity;
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

            _export('ActivityService', ActivityService = function () {
                function ActivityService() {
                    _classCallCheck(this, ActivityService);

                    this._httpService = new HttpService();
                }

                _createClass(ActivityService, [{
                    key: 'getUserActivities',
                    value: function getUserActivities() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._httpService.get('/v1/activities').then(function (activities_obj) {
                                return resolve(activities_obj.map(function (activity_obj) {
                                    return new Activity(new Date(activity_obj.date), activity_obj.physical_activity, activity_obj.place, activity_obj.route_distance, activity_obj.time);
                                }));
                            }).catch(function (error) {
                                console.log(error);
                                reject('Could not get activities for user');
                            });
                        });

                        /*
                        return this._httpService
                            .get('/v1/activities')
                            .then(activities => console.log());
                        */
                    }
                }, {
                    key: 'addActivity',
                    value: function addActivity(activity) {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._httpService.post('/v1/activities', {
                                method: 'POST',
                                body: JSON.stringify({
                                    'date': activity.date,
                                    'physical_activity': activity.physical_activity,
                                    'place': activity.place,
                                    'route_distance': activity.route_distance,
                                    'time': activity.time
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                }
                            }, true).then(function (response) {
                                var user_obj = response['user_activities'];
                                console.log(user_obj);
                                var activity_obj = response['activity'];
                                resolve(new Activity(new Date(activity_obj.date), activity_obj.physical_activity, activity_obj.place, activity_obj.route_distance, activity_obj.time));
                            }).catch(function (error) {
                                console.log(error);
                                reject('Could not create activities for user');
                            });
                        });
                    }
                }]);

                return ActivityService;
            }());

            _export('ActivityService', ActivityService);
        }
    };
});
//# sourceMappingURL=ActivityService.js.map