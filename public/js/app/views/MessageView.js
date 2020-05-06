'use strict';

System.register(['./View'], function (_export, _context) {
    "use strict";

    var View, _createClass, MessageView;

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

            _export('MessageView', MessageView = function (_View) {
                _inherits(MessageView, _View);

                function MessageView(HTMLElement) {
                    _classCallCheck(this, MessageView);

                    return _possibleConstructorReturn(this, (MessageView.__proto__ || Object.getPrototypeOf(MessageView)).call(this, HTMLElement));
                }

                _createClass(MessageView, [{
                    key: 'template',
                    value: function template(model) {
                        return model.text ? '<p class="alert alert-' + model.type + '">' + model.text + '</p>' : '<p></p>';
                    }
                }]);

                return MessageView;
            }(View));

            _export('MessageView', MessageView);
        }
    };
});
//# sourceMappingURL=MessageView.js.map