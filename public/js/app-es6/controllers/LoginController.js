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

	login(login, passwd){
		// Realiza a submisão de login
		// Ao receber a resposta favoravel de login:
		// 		Grava o resultado do x-access-token na sessão do usuário
		// 		Redireciona para o index
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
		.then(res => res.headers.get('x-access-token'))
		.then(token => {
			console.log('token', token);
			if(token){
				window.sessionStorage.token = token;
				window.sessionStorage.login = this._parseJwt(token).login;
			}
		})
		.then(res => {
			if(1 == 1){
				window.location.href = "index.html";
			}
		})
		.catch(err => console.log(err));
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

	logout(){
		delete window.sessionStorage.token;
		delete window.sessionStorage.login;
		window.location.href = "home.html";
	}

}

let loginController = new LoginController();

export function loginControllerInstance(){
    return loginController;
}
