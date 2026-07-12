"use strict";

System.register(["./controllers/LoginController"], function (_export, _context) {
    "use strict";

    var loginControllerInstance, loginController, homeMessage;
    return {
        setters: [function (_controllersLoginController) {
            loginControllerInstance = _controllersLoginController.loginControllerInstance;
        }],
        execute: function () {
            loginController = loginControllerInstance();
            homeMessage = document.querySelector("#home-message");


            document.querySelector("#login-btn").addEventListener('click', function (event) {
                event.preventDefault();
                var login_ = document.querySelector("#login").value;
                var pass_ = document.querySelector("#password").value;
                //console.log(login_, pass_);
                loginController.login(login_, pass_);
                return false;
            });

            document.querySelector("#signup-btn").addEventListener('click', function (event) {
                event.preventDefault();
                homeMessage.innerText = "";

                try {
                    loginController.signup(document.querySelector("#signup-login").value, document.querySelector("#signup-email").value, document.querySelector("#signup-password").value).catch(function (error) {
                        return homeMessage.innerText = error.message || "Could not create account";
                    });
                } catch (error) {
                    homeMessage.innerText = error.message;
                }

                return false;
            });
        }
    };
});
//# sourceMappingURL=boot_home.js.map