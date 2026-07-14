import {loginControllerInstance} from './controllers/LoginController';
import {User} from './models/User';
import {UserService} from './services/UserService';
import {AdminView} from './views/AdminView';

let loginController = loginControllerInstance();
let service = new UserService();
let adminView = new AdminView(document.querySelector('#admin'));
let message = document.querySelector('#messaging');
let adminUser = null;

function showError(error){
    message.innerText = error.message || error || 'Could not load admin data';
}

function refreshAdmin(){
    if(!adminUser) return Promise.resolve();
    message.innerText = '';

    return service
        .getAdminSummary()
        .then(summary => {
            adminUser.setAdminSummary(summary);
            adminView.update(adminUser);
        })
        .catch(showError);
}

function leaveAdmin(){
    delete window.sessionStorage.token;
    delete window.sessionStorage.login;
    window.location.href = 'admin_home.html';
}

service
    .getUserInfo()
    .then(userInfo => {
        if(userInfo.role != 'admin') throw new Error('Admin access only');

        adminUser = new User(userInfo.name, userInfo.balance, userInfo.login, userInfo.role);
        document.querySelector('#admin-user').innerText = userInfo.name;
        return refreshAdmin();
    })
    .catch(leaveAdmin);

document.querySelector('#admin').onclick = event => {
    if(event.target.id == 'refresh-admin') refreshAdmin();

    const deleteButton = event.target.closest('.admin-delete-user');
    if(deleteButton && confirm('Delete this user profile?')) {
        service
            .deleteAdminUser(deleteButton.dataset.userId)
            .then(refreshAdmin)
            .catch(showError);
    }
};

document.querySelector('#logout').onclick = event => {
    event.preventDefault();
    loginController.logout('admin_home.html');
};
