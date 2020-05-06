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
		this._service.post('/autenticar', {
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

	logout(){
		// Apaga o resultado do x-access-token na sessão do usuário
	}

	signin(){
		// Faz validações
		// 		Se validações ok:
		// 		Submete dados para cadastro do usuário
		//		Se cadastro ok redireciona para tela de login
	}
}

let loginController = new LoginController();

export function loginControllerInstance(){
    return loginController;
}