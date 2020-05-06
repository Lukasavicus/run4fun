"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, MsgType, Message;

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

            MsgType = {
                OK: "success",
                ERROR: "danger",
                INFO: "info"
            };

            Object.freeze(MsgType);

            _export("Message", Message = function () {
                function Message() {
                    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MsgType.INFO;

                    _classCallCheck(this, Message);

                    this._text = text;
                    this._type = type;
                }

                _createClass(Message, [{
                    key: "text",
                    get: function get() {
                        return this._text;
                    },
                    set: function set(text) {
                        this._text = text;
                    }
                }, {
                    key: "type",
                    get: function get() {
                        return this._type;
                    },
                    set: function set(type) {
                        this._type = type;
                    }
                }]);

                return Message;
            }());

            _export("Message", Message);
        }
    };
});
//# sourceMappingURL=Message.js.map