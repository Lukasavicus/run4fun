'use strict';

System.register(['./View'], function (_export, _context) {
    "use strict";

    var View, _createClass, ActivitiesDashboardView;

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

            _export('ActivitiesDashboardView', ActivitiesDashboardView = function (_View) {
                _inherits(ActivitiesDashboardView, _View);

                function ActivitiesDashboardView(HTMLElement) {
                    _classCallCheck(this, ActivitiesDashboardView);

                    return _possibleConstructorReturn(this, (ActivitiesDashboardView.__proto__ || Object.getPrototypeOf(ActivitiesDashboardView)).call(this, HTMLElement));
                }

                _createClass(ActivitiesDashboardView, [{
                    key: 'template',
                    value: function template(model) {
                        return '\n        <div>\n            <div>\n                <img src="imgs/badges/008-road.svg">\n                <p>Total Travelled Distance</p>\n            </div>\n            <p class="record" id="total_travelled_dist">' + model.total_kms + ' Kms</p>\n        </div>\n        <div>\n            <div>\n                <img src="imgs/badges/034-gas.svg">\n                <p>Total Travelled Time</p>\n            </div>\n            <p class="record" id="total_travelled_time">' + model.total_time + '</p>\n        </div>\n        <div>\n            <div>\n                <img src="imgs/badges/025-time.svg">\n                <p>Max Velocity Reached</p>\n            </div>\n            <p class="record" id="max_velocity_reached"></p>\n        </div>\n        <div>\n            <div>\n                <img src="imgs/badges/029-energy-drink.svg">\n                <p>Max One-Shoot Distance</p>\n            </div>\n            <p class="record" id="max_one_shoot_dist"></p>\n        </div>\n        <div>\n            <div>\n                <img src="imgs/badges/040-medal-1.svg">\n                <p>Best Record</p>\n            </div>\n            <p class="record" id="best_record"></p>\n        </div>\n        ';
                    }
                }]);

                return ActivitiesDashboardView;
            }(View));

            _export('ActivitiesDashboardView', ActivitiesDashboardView);
        }
    };
});
//# sourceMappingURL=ActivitiesDashboardView.js.map