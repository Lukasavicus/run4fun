'use strict';

System.register(['./View'], function (_export, _context) {
    "use strict";

    var View, _createClass, BadgesView;

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

            _export('BadgesView', BadgesView = function (_View) {
                _inherits(BadgesView, _View);

                function BadgesView(HTMLElement) {
                    _classCallCheck(this, BadgesView);

                    return _possibleConstructorReturn(this, (BadgesView.__proto__ || Object.getPrototypeOf(BadgesView)).call(this, HTMLElement));
                }

                _createClass(BadgesView, [{
                    key: 'template',
                    value: function template(model) {
                        return '\n            ' + model.badges.map(function (badge) {
                            return '\n                <div class="badge true">\n                    <img src="' + badge.icon + '" "="" class="badge-img">\n                    <p class="badge-title">' + badge.title + '</p>\n                </div>\n            ';
                        }).join('') + '\n        ';
                    }
                }]);

                return BadgesView;
            }(View));

            _export('BadgesView', BadgesView);
        }
    };
});
//# sourceMappingURL=BadgesView.js.map