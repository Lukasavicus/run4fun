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
                    var login = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                    var role = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'user';

                    _classCallCheck(this, User);

                    this._name = name;
                    this._balance = balance;
                    this._login = login;
                    this._role = role;
                    this._activities = [];
                    this._badgeList = new BadgeList();
                    this._collectibleList = new CollectibleList();
                    this._transactionList = new TransactionList();
                    this._analyticsPeriod = 'month';
                    this._analyticsFrom = '';
                    this._analyticsTo = '';
                    this._publicSettings = { badges: true, collectibles: true, kpis: true, runs: false };
                    this._adminSummary = null;
                }

                _createClass(User, [{
                    key: 'setBalance',
                    value: function setBalance(balance) {
                        this._balance = balance;
                    }
                }, {
                    key: 'addCollectible',
                    value: function addCollectible(collectible) {
                        this._collectibleList.add(collectible);
                    }
                }, {
                    key: 'setCollectibles',
                    value: function setCollectibles(collectibles) {
                        this._collectibleList.replace(collectibles);
                    }
                }, {
                    key: 'addBadge',
                    value: function addBadge(badge) {
                        this._badgeList.add(badge);
                    }
                }, {
                    key: 'setBadges',
                    value: function setBadges(badges) {
                        this._badgeList.replace(badges);
                    }
                }, {
                    key: 'addActivity',
                    value: function addActivity(activity) {
                        this._activities.push(activity);
                    }
                }, {
                    key: 'setAnalyticsFilters',
                    value: function setAnalyticsFilters(period, from, to) {
                        this._analyticsPeriod = period || 'month';
                        this._analyticsFrom = from || '';
                        this._analyticsTo = to || '';
                    }
                }, {
                    key: 'addTransaction',
                    value: function addTransaction(transaction) {
                        this._transactionList.add(transaction);
                    }
                }, {
                    key: 'setTransactions',
                    value: function setTransactions(transactions) {
                        this._transactionList.replace(transactions);
                    }
                }, {
                    key: 'setPublicSettings',
                    value: function setPublicSettings(settings) {
                        this._publicSettings = settings || { badges: true, collectibles: true, kpis: true, runs: false };
                    }
                }, {
                    key: 'setAdminSummary',
                    value: function setAdminSummary(summary) {
                        this._adminSummary = summary;
                    }
                }, {
                    key: 'name',
                    get: function get() {
                        return this._name;
                    }
                }, {
                    key: 'login',
                    get: function get() {
                        return this._login;
                    }
                }, {
                    key: 'role',
                    get: function get() {
                        return this._role;
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
                    key: 'analyticsPeriod',
                    get: function get() {
                        return this._analyticsPeriod;
                    }
                }, {
                    key: 'analyticsFrom',
                    get: function get() {
                        return this._analyticsFrom;
                    }
                }, {
                    key: 'analyticsTo',
                    get: function get() {
                        return this._analyticsTo;
                    }
                }, {
                    key: 'transactionList',
                    get: function get() {
                        return this._transactionList;
                    }
                }, {
                    key: 'publicSettings',
                    get: function get() {
                        return this._publicSettings;
                    }
                }, {
                    key: 'adminSummary',
                    get: function get() {
                        return this._adminSummary;
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
                }, {
                    key: 'best_pace',
                    get: function get() {
                        var bestSeconds = this._activities.reduce(function (best, activity) {
                            var distance = Number(activity.route_distance || 0);
                            var seconds = TimeHelper.getNumberSeconds(activity.time);
                            if (distance <= 0 || seconds <= 0) return best;

                            var pace = seconds / distance;
                            return best == null || pace < best ? pace : best;
                        }, null);

                        if (bestSeconds == null) return '--:--/km';

                        var minutes = parseInt(bestSeconds / 60);
                        var seconds = parseInt(bestSeconds % 60);
                        return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0') + '/km';
                    }
                }]);

                return User;
            }());

            _export('User', User);
        }
    };
});
//# sourceMappingURL=User.js.map