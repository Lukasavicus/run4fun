import {HttpService} from '../services/HttpService';

class LoginController{
	
	constructor(){
		this._service = new HttpService();
	}

	_parseJwt (token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	
		return JSON.parse(jsonPayload);
	};

	login(login, passwd, redirect='index.html', requiredRole='user'){
		// Realiza a submisão de login
		// Ao receber a resposta favoravel de login:
		// 		Grava o resultado do x-access-token na sessão do usuário
		// 		Redireciona para o index
		if(!login || !passwd) return Promise.reject(new Error('Fill login and password'));

		delete window.sessionStorage.token;
		delete window.sessionStorage.login;

		return this._service.post('/autenticar', {
			method : 'POST',
			body: JSON.stringify({
				'login' : login,
				'password' : passwd
			}),
			headers: {
			  'Content-Type': 'application/json'
			  // 'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		.then(res => {
			const token = res.headers.get('x-access-token');
			console.log('token', token);
			if(!token) throw new Error('Invalid login or password');

			window.sessionStorage.token = token;
			window.sessionStorage.login = this._parseJwt(token).login;
			return this._service.get('/v1/user');
		})
		.then(user => {
			if(user.role != requiredRole) {
				throw new Error(requiredRole == 'admin' ? 'Admin access only' : 'Use the admin login page');
			}

			window.location.href = redirect;
		})
		.catch(error => {
			delete window.sessionStorage.token;
			delete window.sessionStorage.login;
			if(error.message == 'Unauthorized') throw new Error('Invalid login or password');
			throw error;
		});
		// redir home (login / sign in)
	}

	signup(login, email, password){
		if(!login || !email || !password) {
			throw new Error('Fill login, email and password');
		}

		return this._service.post('/signup', {
			method : 'POST',
			body: JSON.stringify({
				'login' : login,
				'email' : email,
				'password' : password
			}),
			headers: {
			  'Content-Type': 'application/json'
			},
		}, true)
		.then(() => this.login(login, password));
	}

	logout(redirect='home.html'){
		delete window.sessionStorage.token;
		delete window.sessionStorage.login;
		window.location.href = typeof redirect == 'string' ? redirect : 'home.html';
	}

}

let loginController = new LoginController();

export function loginControllerInstance(){
    return loginController;
}
