import {loginControllerInstance} from './controllers/LoginController';

let loginController = loginControllerInstance();

document.querySelector("#login-btn").addEventListener('click',
    function(event){
    event.preventDefault();
    const login_ =  document.querySelector("#login").value;
    const pass_ = document.querySelector("#password").value;
    //console.log(login_, pass_);
    loginController.login(login_, pass_);
    return false;
});