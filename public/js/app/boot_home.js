"use strict";

System.register(["./controllers/LoginController"], function (_export, _context) {
    "use strict";

    var loginControllerInstance, loginController, homeForm, homeFormTitle, homeMessage;


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

    return {
        setters: [function (_controllersLoginController) {
            loginControllerInstance = _controllersLoginController.loginControllerInstance;
        }],
        execute: function () {
            loginController = loginControllerInstance();
            homeForm = document.querySelector("#home-form");
            homeFormTitle = document.querySelector("#home-form-title");
            homeMessage = document.querySelector("#home-message");
            document.querySelector("#show-signup").addEventListener('click', showSignup);
            document.querySelector("#show-login").addEventListener('click', showLogin);

            homeForm.addEventListener('submit', function (event) {
                event.preventDefault();

                if (homeForm.classList.contains("signup-mode")) {
                    homeMessage.innerText = "";

                    try {
                        loginController.signup(document.querySelector("#signup-login").value, document.querySelector("#signup-email").value, document.querySelector("#signup-password").value).catch(function (error) {
                            return homeMessage.innerText = error.message || "Could not create account";
                        });
                    } catch (error) {
                        homeMessage.innerText = error.message;
                    }

                    return false;
                }

                var login_ = document.querySelector("#login").value;
                var pass_ = document.querySelector("#password").value;
                //console.log(login_, pass_);
                loginController.login(login_, pass_);
                return false;
            });
        }
    };
});
//# sourceMappingURL=boot_home.js.map