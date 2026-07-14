'use strict';

System.register(['./controllers/LoginController'], function (_export, _context) {
    "use strict";

    var loginControllerInstance, loginController, adminForm, homeMessage;
    return {
        setters: [function (_controllersLoginController) {
            loginControllerInstance = _controllersLoginController.loginControllerInstance;
        }],
        execute: function () {
            loginController = loginControllerInstance();
            adminForm = document.querySelector('#admin-home-form');
            homeMessage = document.querySelector('#home-message');


            adminForm.addEventListener('submit', function (event) {
                event.preventDefault();
                homeMessage.innerText = '';

                loginController.login(document.querySelector('#login').value, document.querySelector('#password').value, 'admin_index.html', 'admin').catch(function (error) {
                    return homeMessage.innerText = error.message || 'Could not login';
                });
            });
        }
    };
});