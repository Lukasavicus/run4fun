'use strict';

System.register(['../helpers/TimeHelper', './BadgeList', './CollectibleList', './TransactionList'], function (_export, _context) {
    "use strict";

    var TimeHelper, BadgeList, CollectibleList, TransactionList, _createClass, User;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_helpersTimeHelper) {
            TimeHelper = _helpersTimeHelper.TimeHelper;
        }, function (_BadgeList) {
            BadgeList = _BadgeList.BadgeList;
        }, function (_CollectibleList) {
            CollectibleList = _CollectibleList.CollectibleList;
        }, function (_TransactionList) {
            TransactionList = _TransactionList.TransactionList;
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
                function User(name) {
                    var balance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                    _classCallCheck(this, User);

                    this._name = name;
                    this._balance = balance;
                    this._activities = [];
                    this._badgeList = new BadgeList();
                    this._collectibleList = new CollectibleList();
                    this._transactionList = new TransactionList();
                }

                _createClass(User, [{
                    key: 'addCollectible',
                    value: function addCollectible(collectible) {
                        this._collectibleList.add(collectible);
                    }
                }, {
                    key: 'addBadge',
                    value: function addBadge(badge) {
                        this._badgeList.add(badge);
                    }
                }, {
                    key: 'addActivity',
                    value: function addActivity(activity) {
                        this._activities.push(activity);
                    }
                }, {
                    key: 'addTransaction',
                    value: function addTransaction(transaction) {
                        this._transactionList.add(transaction);
                    }
                }, {
                    key: 'name',
                    get: function get() {
                        return this._name;
                    }
                }, {
                    key: 'balance',
                    get: function get() {
                        return this._balance;
                    }
                }, {
                    key: 'collectibleList',
                    get: function get() {
                        return this._collectibleList;
                    }
                }, {
                    key: 'badgeList',
                    get: function get() {
                        return this._badgeList;
                    }
                }, {
                    key: 'activities',
                    get: function get() {
                        return [].concat(this._activities);
                    }
                }, {
                    key: 'transactionList',
                    get: function get() {
                        return this._transactionList;
                    }
                }, {
                    key: 'total_distance',
                    get: function get() {
                        return parseFloat(this._activities.reduce(function (total, activity) {
                            return total += activity.route_distance;
                        }, 0.0)).toFixed(2);
                    }
                }, {
                    key: '_total_time_secs',
                    get: function get() {
                        return this._activities.reduce(function (total, activity) {
                            return total += TimeHelper.getNumberSeconds(activity.time);
                        }, 0.0);
                    }
                }, {
                    key: 'total_time',
                    get: function get() {
                        return TimeHelper.timeToText(0, 0, this._total_time_secs);
                    }
                }, {
                    key: 'max_velocity',
                    get: function get() {
                        return parseFloat(this._activities.reduce(function (max_, activity) {
                            return max_ > activity.avg_velocity_kmh ? max_ : activity.avg_velocity_kmh;
                        }, 0.0)).toFixed(2);
                    }
                }, {
                    key: 'max_distance',
                    get: function get() {
                        return parseFloat(this._activities.reduce(function (max_, activity) {
                            return max_ > activity.route_distance ? max_ : activity.route_distance;
                        }, 0.0)).toFixed(2);
                    }
                }, {
                    key: 'avg_velocity_ms',
                    get: function get() {
                        var secs = TimeHelper.getNumberSeconds(this.total_time);
                        return (this.total_distance * 1000 / secs).toFixed(2);
                    }
                }, {
                    key: 'avg_velocity_kmh',
                    get: function get() {
                        var hours = TimeHelper.getNumberHours(this.total_time);
                        return (this.total_distance / hours).toFixed(2);
                    }
                }]);

                return User;
            }());

            _export('User', User);
        }
    };
});
//# sourceMappingURL=User.js.map