'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

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

            _export('HttpService', HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);

                    this._fetch = function (originalFetch) {
                        return function () {
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                args[_key] = arguments[_key];
                            }

                            //console.log("arg before ",args);
                            if (window.sessionStorage.token) {
                                var options = args[1];
                                if (options === undefined) args.push({ 'headers': { 'x-access-token': window.sessionStorage.token } });else options.headers['x-access-token'] = window.sessionStorage.token;
                            }
                            //console.log("arg after ",args);
                            var result = originalFetch.apply(window, args);
                            return result; //.then(console.log('Request was sent'));
                        };
                    }(fetch);

                    // if(window.sessionStorage.token)
                    //     delete window.sessionStorage.token;
                }

                _createClass(HttpService, [{
                    key: '_handleErrors',
                    value: function _handleErrors(res) {
                        if (!res.ok) throw new Error(res.statusText);
                        return res;
                    }
                }, {
                    key: 'get',
                    value: function get(url) {
                        var _this = this;

                        return this._fetch(url).then(function (res) {
                            return _this._handleErrors(res);
                        }).then(function (res) {
                            return res.json();
                        });
                    }
                }, {
                    key: 'post',
                    value: function post(url, options) {
                        var _this2 = this;

                        var response_json = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                        return this._fetch(url, options).then(function (res) {
                            return _this2._handleErrors(res);
                        }).then(function (res) {
                            return response_json ? res.json() : res;
                        });
                    }
                }, {
                    key: '_get',
                    value: function _get(url) {
                        return new Promise(function (resolve, reject) {
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', url);
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4) {
                                    if (xhr.status == 200) {
                                        resolve(JSON.parse(xhr.responseText));
                                    } else {
                                        console.log(xhr.responseText);
                                        reject(xhr.responseText);
                                    }
                                }
                            };
                            xhr.send();
                        });
                    }
                }]);

                return HttpService;
            }());

            _export('HttpService', HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map