"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Transaction;

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

            _export("Transaction", Transaction = function () {
                function Transaction(date, value, nature) {
                    _classCallCheck(this, Transaction);

                    this._date = date;
                    this._value = value;
                    this._nature = nature;

                    Object.freeze(this);
                }

                _createClass(Transaction, [{
                    key: "date",
                    get: function get() {
                        return this._date;
                    }
                }, {
                    key: "value",
                    get: function get() {
                        return this._value;
                    }
                }, {
                    key: "nature",
                    get: function get() {
                        return this._nature;
                    }
                }]);

                return Transaction;
            }());

            _export("Transaction", Transaction);
        }
    };
});
//# sourceMappingURL=Transaction.js.map