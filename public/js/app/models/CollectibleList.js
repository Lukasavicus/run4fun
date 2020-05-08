"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, CollectibleList;

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

            _export("CollectibleList", CollectibleList = function () {
                function CollectibleList() {
                    _classCallCheck(this, CollectibleList);

                    this._collectibles = [];
                }

                _createClass(CollectibleList, [{
                    key: "add",
                    value: function add(collectible) {
                        this._collectibles.push(collectible);
                    }
                }, {
                    key: "collectibles",
                    get: function get() {
                        return [].concat(this._collectibles);
                    }
                }]);

                return CollectibleList;
            }());

            _export("CollectibleList", CollectibleList);
        }
    };
});
//# sourceMappingURL=CollectibleList.js.map