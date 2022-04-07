import { render } from '../node_modules/lit-html/lit-html.js'
import page from '../../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/data.js'
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { homePage } from './views/home.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';


// MAIN  and logoutBtn
const main = document.getElementById('content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();

//Routing 
page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);


page.start();

//Middleware
function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

// Navigation for Guest and User
function setUserNav(){
    const email = sessionStorage.getItem('email');
    if(email != null){
        document.getElementById('profile').style.display = '';
        document.getElementById('create').style.display = '';
        document.getElementById('logoutBtn').style.display = '';
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
    }else{
        document.getElementById('profile').style.display = 'none';
        document.getElementById('create').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('login').style.display = '';
        document.getElementById('register').style.display = '';
    }
}

// Logout 
async function logout() {
    await apiLogout();
    setUserNav();
    page.redirect('/')
}

