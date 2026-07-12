import {loginControllerInstance} from './controllers/LoginController';

let loginController = loginControllerInstance();
let homeMessage = document.querySelector("#home-message");

document.querySelector("#login-btn").addEventListener('click',
    function(event){
        event.preventDefault();
        const login_ =  document.querySelector("#login").value;
        const pass_ = document.querySelector("#password").value;
        //console.log(login_, pass_);
        loginController.login(login_, pass_);
        return false;
});

document.querySelector("#signup-btn").addEventListener('click',
    function(event){
        event.preventDefault();
        homeMessage.innerText = "";

        try {
            loginController.signup(
                document.querySelector("#signup-login").value,
                document.querySelector("#signup-email").value,
                document.querySelector("#signup-password").value
            )
            .catch(error => homeMessage.innerText = error.message || "Could not create account");
        }
        catch(error) {
            homeMessage.innerText = error.message;
        }

        return false;
});
