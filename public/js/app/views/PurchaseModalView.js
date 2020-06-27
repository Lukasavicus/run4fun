'use strict';

System.register(['./View'], function (_export, _context) {
    "use strict";

    var View, _createClass, PurchaseModalView;

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

            _export('PurchaseModalView', PurchaseModalView = function (_View) {
                _inherits(PurchaseModalView, _View);

                function PurchaseModalView(HTMLElement) {
                    _classCallCheck(this, PurchaseModalView);

                    return _possibleConstructorReturn(this, (PurchaseModalView.__proto__ || Object.getPrototypeOf(PurchaseModalView)).call(this, HTMLElement));
                }

                _createClass(PurchaseModalView, [{
                    key: 'template',
                    value: function template(model) {
                        return '\n            <div class="modal-header">\n                <p style="display: inline;">Purchase Collectible</p>\n                <span class="modal-close">&times</span>\n            </div>\n            <div class="modal-body">\n                <form class="form" action="v1/collectibles/' + model.id + '" id="purchase-modal-form" >\n                    <div class="collectible" title="' + model.description + '" >\n                        <script> console.log(\'log1\'); </script>\n                        <img src="' + model.icon + '" class="collectible-img">\n                        <script> console.log(\'log2\'); </script>\n                        <p class="collectible-description">' + model.hist + '</p>\n                    </div>\n                    <div class="oper-gif">\n                        <span>\n                            <img src=\'./imgs/misc/loading.gif\' class="disp-n">\n                        </span>\n                    </div>\n                    <div class="price-div">\n                        <span class="price-content">\n                            cost: ' + model.price + '\u26A1\n                        </span>\n                    </div>\n                    <div style="text-align: center;">\n                        <button type="submit">Purchase</button>\n                        <button type="reset" id="dismiss-modal">Dismiss</button>\n                    </div>\n                </form>\n            </div>\n        ';
                    }
                }]);

                return PurchaseModalView;
            }(View));

            _export('PurchaseModalView', PurchaseModalView);
        }
    };
});
//# sourceMappingURL=PurchaseModalView.js.map