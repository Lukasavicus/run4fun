"use strict";

System.register(["../helpers/TimeHelper"], function (_export, _context) {
    "use strict";

    var TimeHelper, _createClass, Activity;

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

            _export("Activity", Activity = function () {
                function Activity() {
                    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
                    var physical_activity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Walking";
                    var place = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
                    var route_distance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.0;
                    var time = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "00:00:00";

                    _classCallCheck(this, Activity);

                    this._date = new Date(date.getTime());
                    this._physical_activity = physical_activity;
                    this._place = place;
                    this._route_distance = route_distance;
                    this._time = time;

                    Object.freeze(this);
                }

                _createClass(Activity, [{
                    key: "avg_time_by_distance",
                    value: function avg_time_by_distance(dist) {
                        return TimeHelper.timeToText(0, 0, parseInt(dist / this.avg_velocity_ms));
                    }
                }, {
                    key: "avg_velocity_ms",
                    get: function get() {
                        // return the average velocity in meters/second;
                        var secs = TimeHelper.getNumberSeconds(this._time);
                        return (this._route_distance * 1000 / secs).toFixed(2);
                    }
                }, {
                    key: "avg_velocity_kmh",
                    get: function get() {
                        // return the average velocity in meters/second;
                        var hours = TimeHelper.getNumberHours(this._time);
                        return (this._route_distance / hours).toFixed(2);
                    }
                }, {
                    key: "date",
                    get: function get() {
                        return new Date(this._date.getTime());
                    }
                }, {
                    key: "physical_activity",
                    get: function get() {
                        return this._physical_activity;
                    }
                }, {
                    key: "place",
                    get: function get() {
                        return this._place;
                    }
                }, {
                    key: "route_distance",
                    get: function get() {
                        return this._route_distance;
                    }
                }, {
                    key: "time",
                    get: function get() {
                        return this._time;
                    }
                }]);

                return Activity;
            }());

            _export("Activity", Activity);
        }
    };
});
//# sourceMappingURL=Activity.js.map