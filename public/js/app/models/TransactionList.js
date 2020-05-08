"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, TransactionList;

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

            _export("TransactionList", TransactionList = function () {
                function TransactionList() {
                    _classCallCheck(this, TransactionList);

                    this._transactions = [];
                }

                _createClass(TransactionList, [{
                    key: "add",
                    value: function add(transaction) {
                        this._transactions.push(transaction);
                    }
                }, {
                    key: "transactions",
                    get: function get() {
                        return [].concat(this._transactions);
                    }
                }]);

                return TransactionList;
            }());

            _export("TransactionList", TransactionList);
        }
    };
});
//# sourceMappingURL=TransactionList.js.map