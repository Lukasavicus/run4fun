'use strict';

System.register(['./View', '../helpers/TimeHelper'], function (_export, _context) {
    "use strict";

    var View, TimeHelper, _slicedToArray, _createClass, AnalyticsView;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_View2) {
            View = _View2.View;
        }, function (_helpersTimeHelper) {
            TimeHelper = _helpersTimeHelper.TimeHelper;
        }],
        execute: function () {
            _slicedToArray = function () {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;

                    try {
                        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);

                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }

                    return _arr;
                }

                return function (arr, i) {
                    if (Array.isArray(arr)) {
                        return arr;
                    } else if (Symbol.iterator in Object(arr)) {
                        return sliceIterator(arr, i);
                    } else {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    }
                };
            }();

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

            _export('AnalyticsView', AnalyticsView = function (_View) {
                _inherits(AnalyticsView, _View);

                function AnalyticsView(HTMLElement) {
                    _classCallCheck(this, AnalyticsView);

                    return _possibleConstructorReturn(this, (AnalyticsView.__proto__ || Object.getPrototypeOf(AnalyticsView)).call(this, HTMLElement));
                }

                _createClass(AnalyticsView, [{
                    key: '_dateKey',
                    value: function _dateKey(date) {
                        return date.toISOString().slice(0, 10);
                    }
                }, {
                    key: '_periodKey',
                    value: function _periodKey(date, period) {
                        var year = date.getFullYear();
                        var month = date.getMonth();

                        if (period == 'day') return this._dateKey(date);
                        if (period == 'week') {
                            var monday = new Date(date);
                            monday.setDate(date.getDate() - (date.getDay() + 6) % 7);
                            return 'Week of ' + this._dateKey(monday);
                        }
                        if (period == 'bimester') return year + ' B' + (parseInt(month / 2) + 1);
                        if (period == 'quarter') return year + ' Q' + (parseInt(month / 3) + 1);
                        if (period == 'quadrimester') return year + ' 4M' + (parseInt(month / 4) + 1);
                        if (period == 'semester') return year + ' S' + (parseInt(month / 6) + 1);
                        if (period == 'year') return '' + year;

                        return year + '-' + String(month + 1).padStart(2, '0');
                    }
                }, {
                    key: '_filteredActivities',
                    value: function _filteredActivities(model) {
                        var from = model.analyticsFrom ? new Date(model.analyticsFrom + 'T00:00:00') : null;
                        var to = model.analyticsTo ? new Date(model.analyticsTo + 'T23:59:59') : null;

                        return model.activities.filter(function (activity) {
                            var date = activity.date;
                            if (from && date < from) return false;
                            if (to && date > to) return false;
                            return true;
                        });
                    }
                }, {
                    key: '_monthDays',
                    value: function _monthDays(model, activities) {
                        var base = model.analyticsTo ? new Date(model.analyticsTo + 'T00:00:00') : new Date();
                        var year = base.getFullYear();
                        var month = base.getMonth();
                        var lastDay = new Date(year, month + 1, 0).getDate();
                        var counts = activities.reduce(function (days, activity) {
                            var date = activity.date;
                            if (date.getFullYear() == year && date.getMonth() == month) {
                                var key = date.getDate();
                                days[key] = (days[key] || 0) + 1;
                            }
                            return days;
                        }, {});

                        return Array.from({ length: lastDay }, function (_, index) {
                            var day = index + 1;
                            return { day: day, count: counts[day] || 0 };
                        });
                    }
                }, {
                    key: 'template',
                    value: function template(model) {
                        var _this2 = this;

                        var activities = this._filteredActivities(model);
                        var totals = activities.reduce(function (periods, activity) {
                            var key = _this2._periodKey(activity.date, model.analyticsPeriod);
                            periods[key] = periods[key] || { distance: 0, seconds: 0 };
                            periods[key].distance += Number(activity.route_distance || 0);
                            periods[key].seconds += TimeHelper.getNumberSeconds(activity.time);
                            return periods;
                        }, {});
                        var rows = Object.keys(totals).sort().map(function (key) {
                            return {
                                key: key,
                                distance: totals[key].distance,
                                seconds: totals[key].seconds
                            };
                        });
                        var maxDistance = rows.reduce(function (max, row) {
                            return row.distance > max ? row.distance : max;
                        }, 0);
                        var maxRuns = this._monthDays(model, activities).reduce(function (max, day) {
                            return day.count > max ? day.count : max;
                        }, 0);

                        return '\n            <div class="analytics-controls">\n                <label>Group by\n                    <select id="analytics-period">\n                        ' + [['day', 'Day'], ['week', 'Week'], ['month', 'Month'], ['bimester', 'Bimester'], ['quarter', 'Quarter'], ['quadrimester', 'Quadrimester'], ['semester', 'Semester'], ['year', 'Year']].map(function (_ref) {
                            var _ref2 = _slicedToArray(_ref, 2),
                                value = _ref2[0],
                                label = _ref2[1];

                            return '<option value="' + value + '" ' + (model.analyticsPeriod == value ? 'selected' : '') + '>' + label + '</option>';
                        }).join('') + '\n                    </select>\n                </label>\n                <label>From\n                    <input type="date" id="analytics-from" value="' + model.analyticsFrom + '">\n                </label>\n                <label>To\n                    <input type="date" id="analytics-to" value="' + model.analyticsTo + '">\n                </label>\n            </div>\n\n            ' + (rows.length == 0 ? '\n                <div class="empty-state">\n                    <p>No activities for this period.</p>\n                    <span>Change the filters or add new runs to see analytics.</span>\n                </div>\n            ' : '\n                <div class="analytics-bars">\n                    ' + rows.map(function (row) {
                            return '\n                        <div class="analytics-row">\n                            <span>' + row.key + '</span>\n                            <div class="analytics-bar-track">\n                                <div class="analytics-bar" style="width:' + (maxDistance ? Math.max(6, row.distance / maxDistance * 100) : 0) + '%"></div>\n                            </div>\n                            <strong>' + row.distance.toFixed(2) + ' km</strong>\n                            <em>' + TimeHelper.timeToText(0, 0, row.seconds) + '</em>\n                        </div>\n                    ';
                        }).join('') + '\n                </div>\n            ') + '\n\n            <div class="heatmap">\n                <h3>Monthly run calendar</h3>\n                <div class="heatmap-grid">\n                    ' + this._monthDays(model, activities).map(function (day) {
                            return '\n                        <span class="heatmap-day level-' + (maxRuns ? Math.ceil(day.count / maxRuns * 4) : 0) + '" title="' + day.count + ' runs">' + day.day + '</span>\n                    ';
                        }).join('') + '\n                </div>\n            </div>\n        ';
                    }
                }]);

                return AnalyticsView;
            }(View));

            _export('AnalyticsView', AnalyticsView);
        }
    };
});