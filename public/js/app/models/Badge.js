'use strict';

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

            _export('Badge', Badge = function () {
                function Badge(id, title, icon, description) {
                    var group = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'General';
                    var earned = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

                    _classCallCheck(this, Badge);

                    this._id = id;
                    this._title = title;
                    this._icon = icon;
                    this._description = description;
                    this._group = group;
                    this._earned = earned;

                    Object.freeze(this);
                }

                _createClass(Badge, [{
                    key: 'id',
                    get: function get() {
                        return this._id;
                    }
                }, {
                    key: 'title',
                    get: function get() {
                        return this._title;
                    }
                }, {
                    key: 'icon',
                    get: function get() {
                        return this._icon;
                    }
                }, {
                    key: 'description',
                    get: function get() {
                        return this._description;
                    }
                }, {
                    key: 'group',
                    get: function get() {
                        return this._group;
                    }
                }, {
                    key: 'earned',
                    get: function get() {
                        return this._earned;
                    }
                }]);

                return Badge;
            }());

            _export('Badge', Badge);
        }
    };
});
//# sourceMappingURL=Badge.js.map