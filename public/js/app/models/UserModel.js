'use strict';

System.register(['../helpers/TimeHelper'], function (_export, _context) {
    "use strict";

    var TimeHelper, _createClass, User;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_helpersTimeHelper) {
            TimeHelper = _helpersTimeHelper.TimeHelper;
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

            _export('User', User = function () {
                function User() {
                    _classCallCheck(this, User);

                    this._activities = [];
                }

                _createClass(User, [{
                    key: 'add',
                    value: function add(activity) {
                        this._activities.push(activity);
                    }
                }, {
                    key: 'activities',
                    get: function get() {
                        return [].concat(this._activities);
                    }
                }, {
                    key: 'total_kms',
                    get: function get() {
                        return parseFloat(this._activities.reduce(function (total, activity) {
                            return total += activity.route_distance;
                        }, 0.0)).toFixed(2);
                    }
                }, {
                    key: 'total_time',
                    get: function get() {
                        return TimeHelper.timeToText(0, 0, this._activities.reduce(function (total, activity) {
                            return total += TimeHelper.getNumberSeconds(activity.time);
                        }, 0.0));
                    }
                }]);

                return User;
            }());

            _export('User', User);
        }
    };
});
//# sourceMappingURL=UserModel.js.map