import {loginControllerInstance} from './controllers/LoginController';

let loginController = loginControllerInstance();
let adminForm = document.querySelector('#admin-home-form');
let homeMessage = document.querySelector('#home-message');

adminForm.addEventListener('submit', event => {
    event.preventDefault();
    homeMessage.innerText = '';

    loginController
        .login(
            document.querySelector('#login').value,
            document.querySelector('#password').value,
            'admin_index.html',
            'admin'
        )
        .catch(error => homeMessage.innerText = error.message || 'Could not login');
});
