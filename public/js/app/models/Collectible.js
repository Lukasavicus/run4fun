"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Collectible;

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

            _export("Collectible", Collectible = function () {
                function Collectible(title, icon, price, serie, hist, owned, description) {
                    _classCallCheck(this, Collectible);

                    this._title = title;
                    this._icon = icon;
                    this._price = price;
                    this._serie = serie;
                    this._hist = hist;
                    this._owned = owned;
                    this._description = description;

                    Object.freeze(this);
                }

                _createClass(Collectible, [{
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
                    key: "price",
                    get: function get() {
                        return this._price;
                    }
                }, {
                    key: "serie",
                    get: function get() {
                        return this._serie;
                    }
                }, {
                    key: "hist",
                    get: function get() {
                        return this._hist;
                    }
                }, {
                    key: "owned",
                    get: function get() {
                        return this._owned;
                    }
                }, {
                    key: "description",
                    get: function get() {
                        return this._description;
                    }
                }]);

                return Collectible;
            }());

            _export("Collectible", Collectible);
        }
    };
});
//# sourceMappingURL=Collectible.js.map