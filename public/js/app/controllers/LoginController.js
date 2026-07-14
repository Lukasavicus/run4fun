'use strict';

System.register(['../services/HttpService'], function (_export, _context) {
	"use strict";

	var HttpService, _createClass, LoginController, loginController;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function loginControllerInstance() {
		return loginController;
	}

	_export('loginControllerInstance', loginControllerInstance);

	return {
		setters: [function (_servicesHttpService) {
			HttpService = _servicesHttpService.HttpService;
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

			LoginController = function () {
				function LoginController() {
					_classCallCheck(this, LoginController);

					this._service = new HttpService();
				}

				_createClass(LoginController, [{
					key: '_parseJwt',
					value: function _parseJwt(token) {
						var base64Url = token.split('.')[1];
						var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
						var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
							return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
						}).join(''));

						return JSON.parse(jsonPayload);
					}
				}, {
					key: 'login',
					value: function login(_login, passwd) {
						var _this = this;

						var redirect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'index.html';
						var requiredRole = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'user';

						// Realiza a submisão de login
						// Ao receber a resposta favoravel de login:
						// 		Grava o resultado do x-access-token na sessão do usuário
						// 		Redireciona para o index
						if (!_login || !passwd) return Promise.reject(new Error('Fill login and password'));

						delete window.sessionStorage.token;
						delete window.sessionStorage.login;

						return this._service.post('/autenticar', {
							method: 'POST',
							body: JSON.stringify({
								'login': _login,
								'password': passwd
							}),
							headers: {
								'Content-Type': 'application/json'
								// 'Content-Type': 'application/x-www-form-urlencoded',
							}
						}).then(function (res) {
							var token = res.headers.get('x-access-token');
							console.log('token', token);
							if (!token) throw new Error('Invalid login or password');

							window.sessionStorage.token = token;
							window.sessionStorage.login = _this._parseJwt(token).login;
							return _this._service.get('/v1/user');
						}).then(function (user) {
							if (user.role != requiredRole) {
								throw new Error(requiredRole == 'admin' ? 'Admin access only' : 'Use the admin login page');
							}

							window.location.href = redirect;
						}).catch(function (error) {
							delete window.sessionStorage.token;
							delete window.sessionStorage.login;
							if (error.message == 'Unauthorized') throw new Error('Invalid login or password');
							throw error;
						});
						// redir home (login / sign in)
					}
				}, {
					key: 'signup',
					value: function signup(login, email, password) {
						var _this2 = this;

						if (!login || !email || !password) {
							throw new Error('Fill login, email and password');
						}

						return this._service.post('/signup', {
							method: 'POST',
							body: JSON.stringify({
								'login': login,
								'email': email,
								'password': password
							}),
							headers: {
								'Content-Type': 'application/json'
							}
						}, true).then(function () {
							return _this2.login(login, password);
						});
					}
				}, {
					key: 'logout',
					value: function logout() {
						var redirect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'home.html';

						delete window.sessionStorage.token;
						delete window.sessionStorage.login;
						window.location.href = typeof redirect == 'string' ? redirect : 'home.html';
					}
				}]);

				return LoginController;
			}();

			loginController = new LoginController();
		}
	};
});
//# sourceMappingURL=LoginController.js.map