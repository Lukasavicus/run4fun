'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _typeof, _createClass, ProxyFactory;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

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

            _export('ProxyFactory', ProxyFactory = function () {
                function ProxyFactory() {
                    _classCallCheck(this, ProxyFactory);
                }

                _createClass(ProxyFactory, null, [{
                    key: 'create',
                    value: function create(objeto, options) {
                        this.options = options;
                        //console.log("new Proxy for:", objeto);
                        //console.log('options', options);

                        return new Proxy(objeto, {
                            get: function get(target, prop, receiver) {
                                //let option = ProxyFactory._get_option_by_property(prop);
                                var option = options.filter(function (option) {
                                    return option.props.includes(prop);
                                })[0];
                                //console.log('option', option, 'prop', prop);

                                // if(prop == 'send')
                                //     console.log('here comes the send');

                                if (option != undefined && ProxyFactory._ehFuncao(target[prop])) {
                                    //console.log("entrou");
                                    return function () {
                                        // before_action
                                        if (['before', 'both'].includes(option.applicability)) {
                                            //console.log('calling action before');
                                            // console.log('where is RequestFactory? ');
                                            // console.log('target', target);
                                            // console.log('receiver', receiver);
                                            option.action(target);
                                        }
                                        //console.log('calling prop->target');
                                        var retorno = Reflect.apply(target[prop], target, arguments);
                                        // after_effects
                                        if (['after', 'both'].includes(option.applicability)) {
                                            //console.log('calling action after', option.action, target);
                                            option.action(target);
                                        }
                                        return retorno;
                                    };
                                }

                                if (ProxyFactory._ehFuncao(target[prop])) {
                                    // console.log('Esta funcao foi chamada: ', prop);
                                    return Reflect.get(target, prop, receiver).bind(target);
                                } else {
                                    // console.log('Esta propriedade foi chamada: ', prop);
                                    return target[prop];
                                }
                            },
                            set: function set(target, prop, value, receiver) {
                                var option = options.filter(function (option) {
                                    return option.props.includes(prop);
                                })[0];
                                // console.log('option', option, 'prop', prop);
                                // console.log('Esta propriedade foi setada: ', prop);

                                var retorno = target[prop] = value;

                                if (option != undefined) option.action(target);

                                return retorno;
                            },


                            // other handlers
                            construct: function construct(target, args) {
                                console.log('HANDLERS - constructing');
                                var object = new (Function.prototype.bind.apply(target, [null].concat(_toConsumableArray(args))))();
                                options[0].action(object);
                                return object;
                            },
                            apply: function apply(target, that, args) {
                                console.log('HANDLERS - applying');
                                // sup.apply(that, args);
                                // base.apply(that, args);
                            },
                            getPrototypeOf: function getPrototypeOf(target) {
                                console.log('HANDLERS - getPrototypeOf');
                                //return monsterPrototype;
                            },

                            setPrototypeOf: function setPrototypeOf(target, prototype) {
                                console.log('HANDLERS - setPrototypeOf');
                            },
                            isExtensible: function isExtensible(target) {
                                console.log('HANDLERS - isExtensible');
                            }
                        });
                    }
                }, {
                    key: '_ehFuncao',
                    value: function _ehFuncao(func) {
                        return (typeof func === 'undefined' ? 'undefined' : _typeof(func)) == (typeof Function === 'undefined' ? 'undefined' : _typeof(Function));
                    }
                }]);

                return ProxyFactory;
            }());

            _export('ProxyFactory', ProxyFactory);
        }
    };
});
//# sourceMappingURL=ProxyFactory.js.map