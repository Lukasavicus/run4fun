'use strict';

System.register(['./controllers/LoginController'], function (_export, _context) {
    "use strict";

    var loginControllerInstance, loginController;
    return {
        setters: [function (_controllersLoginController) {
            loginControllerInstance = _controllersLoginController.loginControllerInstance;
        }],
        execute: function () {
            loginController = loginControllerInstance();


            document.querySelector("#login-btn").addEventListener('click', function (event) {
                event.preventDefault();
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