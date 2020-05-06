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
					key: 'login',
					value: function login(_login, passwd) {
						// Realiza a submisão de login
						// Ao receber a resposta favoravel de login:
						// 		Grava o resultado do x-access-token na sessão do usuário
						// 		Redireciona para o index
						this._service.post('/autenticar', {
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
							return res.headers.get('x-access-token');
						}).then(function (token) {
							console.log('token', token);
							if (token) window.sessionStorage.token = token;
						}).then(function (res) {
							if (1 == 1) {
								window.location.href = "index.html";
							}
						}).catch(function (err) {
							return console.log(err);
						});
						// redir home (login / sign in)
					}
				}, {
					key: 'logout',
					value: function logout() {
						// Apaga o resultado do x-access-token na sessão do usuário
					}
				}, {
					key: 'signin',
					value: function signin() {
						// Faz validações
						// 		Se validações ok:
						// 		Submete dados para cadastro do usuário
						//		Se cadastro ok redireciona para tela de login
					}
				}]);

				return LoginController;
			}();

			loginController = new LoginController();
		}
	};
});
//# sourceMappingURL=LoginController.js.map