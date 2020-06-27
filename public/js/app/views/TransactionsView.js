'use strict';

System.register(['./View', '../helpers/DateHelper'], function (_export, _context) {
    "use strict";

    var View, DateHelper, _createClass, TransactionsView;

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

            _export('TransactionsView', TransactionsView = function (_View) {
                _inherits(TransactionsView, _View);

                function TransactionsView(HTMLElement) {
                    _classCallCheck(this, TransactionsView);

                    return _possibleConstructorReturn(this, (TransactionsView.__proto__ || Object.getPrototypeOf(TransactionsView)).call(this, HTMLElement));
                }

                _createClass(TransactionsView, [{
                    key: 'template',
                    value: function template(model) {
                        return '\n            <table id="transactions-table">\n                <thead>\n                    <tr>\n                        <th>Date</th>\n                        <th>Value</th>\n                        <th>Nature</th>\n                        <th>Description</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ' + (model.transactionList.length ? '' : model.transactionList.transactions.map(function (transaction) {
                            return '\n                            <tr>\n                                <td>' + DateHelper.dateToText(transaction.date) + '</td>\n                                <td>' + transaction.value + '</td>\n                                <td>' + transaction.type + '</td>\n                                <td>' + transaction.description + ' km</td>\n                            </tr>\n                            ';
                        }).join('')) + '\n                </tbody>\n                <tfoot>\n                    <tr>\n                        <td colspan="2" >Current Balance:</td>\n                        <td>' + model.balance + ' Neons</td>\n                    </tr>\n                </tfoot>\n            </table>\n        ';
                    }
                }]);

                return TransactionsView;
            }(View));

            _export('TransactionsView', TransactionsView);
        }
    };
});
//# sourceMappingURL=TransactionsView.js.map