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

                            console.log("arg before ", args);
                            if (window.sessionStorage.token) {
                                if (args[1] === undefined || args[1].headers === undefined) {
                                    args.push({ 'headers': { 'x-access-token': window.sessionStorage.token } });
                                } else {
                                    console.log('I do have a token ! Let me pass');
                                    args[1].headers['x-access-token'] = window.sessionStorage.token;
                                }
                            }
                            console.log("arg after ", args);
                            //const result = originalFetch.apply(window, args);
                            var result = originalFetch.apply(window, args).then(function (res) {
                                if (!res.ok && res.status == 401) {
                                    // IF 401 REDIRECT
                                    // delete window.sessionStorage.token;
                                    // delete window.sessionStorage.login;
                                    // window.location.href = "home.html";
                                }
                                return res;
                            });
                            return result; //.then(console.log('Request was sent'));
                        };
                    }(fetch);

                    // if(window.sessionStorage.token)
                    //     delete window.sessionStorage.token;
                }

                _createClass(HttpService, [{
                    key: '_handleErrors',
                    value: function _handleErrors(res) {
                        console.log('HttpService', res);
                        if (!res.ok) throw new Error(res.statusText);
                        return res;
                    }
                }, {
                    key: 'get',
                    value: function get(url) {
                        var _this = this;

                        return this._fetch(url).then(function (res) {
                            return _this._handleErrors(res);
                        })
                        // .then(res => res.json());
                        .then(function (res) {
                            // console.log('GET Res', res);
                            var res_json = res.json();
                            // console.log('GET ResJson', res_json);
                            return res_json;
                        });
                    }
                }, {
                    key: 'post',
                    value: function post(url, options) {
                        var _this2 = this;

                        var response_json = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                        console.log('POST', url, options, response_json);
                        return this._fetch(url, options).then(function (res) {
                            return _this2._handleErrors(res);
                        }).then(function (res) {
                            return response_json ? res.json() : res;
                        });
                    }
                }, {
                    key: 'patch',
                    value: function patch(url) {
                        var _this3 = this;

                        return this._fetch(url, {
                            method: 'PATCH'
                        }).then(function (res) {
                            return _this3._handleErrors(res);
                        }).then(function (res) {
                            return res.json();
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