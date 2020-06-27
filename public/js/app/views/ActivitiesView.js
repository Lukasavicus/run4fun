'use strict';

System.register(['./View', '../helpers/DateHelper'], function (_export, _context) {
    "use strict";

    var View, DateHelper, _createClass, ActivitiesView;

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
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
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

            _export('ActivitiesView', ActivitiesView = function (_View) {
                _inherits(ActivitiesView, _View);

                function ActivitiesView(HTMLElement) {
                    _classCallCheck(this, ActivitiesView);

                    return _possibleConstructorReturn(this, (ActivitiesView.__proto__ || Object.getPrototypeOf(ActivitiesView)).call(this, HTMLElement));
                }

                _createClass(ActivitiesView, [{
                    key: 'template',
                    value: function template(model) {
                        return '\n            <table id="records-table">\n                <thead>\n                    <tr>\n                        <th rowspan="3" >Date</th>\n                        <th rowspan="3" >Physical Activity</th>\n                        <th rowspan="3" >Place</th>\n                        <th colspan="5" >Measures</th>\n                    </tr>\n                    <tr>\n                        <th rowspan="2" >Distance</th>\n                        <th rowspan="2" >Time</th>\n                        <th colspan="3" >Pace</th>\n                    </tr>\n                    <tr>\n                        <th>Avg. Velocity (m/s)</th>\n                        <th>Avg. Velocity (km/h)</th>\n                        <th>Avg. Time (100 mts)</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ' + model.activities.map(function (activity) {
                            return '\n                            <tr>\n                                <td>' + DateHelper.dateToText(activity.date) + '</td>\n                                <td>' + activity.physical_activity + '</td>\n                                <td>' + activity.place + '</td>\n                                <td>' + activity.route_distance + ' km</td>\n                                <td>' + activity.time + '</td>\n                                <td>' + activity.avg_velocity_ms + '</td>\n                                <td>' + activity.avg_velocity_kmh + '</td>\n                                <td>' + activity.avg_time_by_distance(100) + '</td>\n                            </tr>\n                            ';
                        }).join('') + '\n                </tbody>\n                <tfoot>\n                    <tr>\n                        <td colspan="3" >Total</td>\n                        <td>' + model.total_distance + ' kms</td>\n                        <td>' + model.total_time + '</td>\n                        <td>' + model.avg_velocity_ms + '</td>\n                        <td>' + model.avg_velocity_kmh + '</td>\n                        <td> xx:xx:xx </td>\n                    </tr>\n                </tfoot>\n            </table>\n        ';
                    }
                }]);

                return ActivitiesView;
            }(View));

            _export('ActivitiesView', ActivitiesView);
        }
    };
});
//# sourceMappingURL=ActivitiesView.js.map