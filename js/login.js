let LoginRegisterContainer = document.querySelector(".LoginRegisterContainer")
let page = document.getElementById('container')
let closse = document.querySelectorAll('#close')

let LoginForm = document.getElementById('loginForm')
let RegForm = document.getElementById('registerForm')

let taskpages = document.getElementById('taskpages')

// NAVBAR - Login

let Login = () => {
    page.style.filter = 'blur(4px)'
    page.style.height = '100dvh'
    page.style.overflow = 'hidden'
    LoginRegisterContainer.style.display = "flex"
    showLogin()

    closeOptMenus(false,false);

}

let Register = () => {
    Login()
    showReg()

    closeOptMenus(false,false);

}

page.style.filter = 'blur(0px)'
page.style.height = 'max-content'
page.style.overflow = 'scroll'
LoginRegisterContainer.style.display = "none"

// usersData.style.display = "none"

function closeTab() {
    page.style.filter = ' blur(0px)'
    page.style.height = 'max-content'
    page.style.overflow = 'scroll'
    LoginRegisterContainer.style.display = "none"

    if (!document.cookie) {
        Login()
    }
}

//  OnLogin Screen Form

function showLogin() {
    LoginForm.style.display = "flex"
    RegForm.style.display = "none"
    document.getElementById('ErrRegister').innerHTML = ``;

}

function showReg() {
    RegForm.style.display = "flex"
    LoginForm.style.display = "none"
    document.getElementById('Errlogin').innerHTML = ``;
}

function logout() {
  fetch("./script/logout.php")
    .then(res => res.text())
    .then(() => {
      window.location.href = "vendor.html"; // or home page
    });
}