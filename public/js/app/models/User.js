'use strict';

System.register(['../helpers/TimeHelper', './BadgeList', './CollectibleList'], function (_export, _context) {
    "use strict";

    var TimeHelper, BadgeList, CollectibleList, _createClass, User;

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
//# sourceMappingURL=User.js.map