"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Badge;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export("Badge", Badge = function () {
                function Badge(title, icon, description) {
                    _classCallCheck(this, Badge);

                    this._title = title;
                    this._icon = icon;
                    this._description = description;

                    Object.freeze(this);
                }

                _createClass(Badge, [{
                    key: "title",
                    get: function get() {
                        return this._title;
                    }
                }, {
                    key: "icon",
                    get: function get() {
                        return this._icon;
                    }
                }, {
                    key: "description",
                    get: function get() {
                        return this._description;
                    }
                }]);

                return Badge;
            }());

            _export("Badge", Badge);
        }
    };
});
//# sourceMappingURL=Badge.js.map