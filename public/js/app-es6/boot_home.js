import {loginControllerInstance} from './controllers/LoginController';

let loginController = loginControllerInstance();
let homeForm = document.querySelector("#home-form");
let homeFormTitle = document.querySelector("#home-form-title");
let homeMessage = document.querySelector("#home-message");

function showSignup(event) {
    event.preventDefault();
    homeMessage.innerText = "";
    homeForm.classList.add("signup-mode");
    homeFormTitle.innerText = "Create account";
}

function showLogin(event) {
    event.preventDefault();
    homeMessage.innerText = "";
    homeForm.classList.remove("signup-mode");
    homeFormTitle.innerText = "Welcome back";
}

document.querySelector("#show-signup").addEventListener('click', showSignup);
document.querySelector("#show-login").addEventListener('click', showLogin);

homeForm.addEventListener('submit',
    function(event){
        event.preventDefault();

        if(homeForm.classList.contains("signup-mode")) {
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
        }

        const login_ =  document.querySelector("#login").value;
        const pass_ = document.querySelector("#password").value;
        //console.log(login_, pass_);
        loginController
            .login(login_, pass_)
            .catch(error => homeMessage.innerText = error.message || "Could not login");
        return false;
});
