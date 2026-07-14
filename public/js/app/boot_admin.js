'use strict';

System.register(['./controllers/LoginController', './models/User', './services/UserService', './views/AdminView'], function (_export, _context) {
    "use strict";

    var loginControllerInstance, User, UserService, AdminView, loginController, service, adminView, message, adminUser;


    function showError(error) {
        message.innerText = error.message || error || 'Could not load admin data';
    }

    function refreshAdmin() {
        if (!adminUser) return Promise.resolve();
        message.innerText = '';

        return service.getAdminSummary().then(function (summary) {
            adminUser.setAdminSummary(summary);
            adminView.update(adminUser);
        }).catch(showError);
    }

    function leaveAdmin() {
        delete window.sessionStorage.token;
        delete window.sessionStorage.login;
        window.location.href = 'admin_home.html';
    }

    return {
        setters: [function (_controllersLoginController) {
            loginControllerInstance = _controllersLoginController.loginControllerInstance;
        }, function (_modelsUser) {
            User = _modelsUser.User;
        }, function (_servicesUserService) {
            UserService = _servicesUserService.UserService;
        }, function (_viewsAdminView) {
            AdminView = _viewsAdminView.AdminView;
        }],
        execute: function () {
            loginController = loginControllerInstance();
            service = new UserService();
            adminView = new AdminView(document.querySelector('#admin'));
            message = document.querySelector('#messaging');
            adminUser = null;
            service.getUserInfo().then(function (userInfo) {
                if (userInfo.role != 'admin') throw new Error('Admin access only');

                adminUser = new User(userInfo.name, userInfo.balance, userInfo.login, userInfo.role);
                document.querySelector('#admin-user').innerText = userInfo.name;
                return refreshAdmin();
            }).catch(leaveAdmin);

            document.querySelector('#admin').onclick = function (event) {
                if (event.target.id == 'refresh-admin') refreshAdmin();

                var deleteButton = event.target.closest('.admin-delete-user');
                if (deleteButton && confirm('Delete this user profile?')) {
                    service.deleteAdminUser(deleteButton.dataset.userId).then(refreshAdmin).catch(showError);
                }
            };

            document.querySelector('#logout').onclick = function (event) {
                event.preventDefault();
                loginController.logout('admin_home.html');
            };
        }
    };
});