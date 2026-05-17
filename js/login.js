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

    map.invalidateSize();

    closeOptMenus(false,false);

}

page.style.filter = 'blur(0px)'
page.style.height = 'max-content'
page.style.overflow = 'scroll'
LoginRegisterContainer.style.display = "none"

// usersData.style.display = "none"

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

function closeTab(user) {
    page.style.filter = ' blur(0px)'
    page.style.height = 'max-content'
    page.style.overflow = 'scroll'
    LoginRegisterContainer.style.display = "none"

    // tru for Vend
    // fal for cust

    // var myCookie = getCookie("customer_token");
    // var myCookie = getCookie("vendor_token");
    if(!user){

        if (getCookie("customer_token") == null) {
            // do cookie doesn't exist stuff;
            Login()
        }
        
    }else{

        
        if (getCookie("vendor_token") == null) {
            // do cookie doesn't exist stuff;
            Login()
        }
    }
    
    // if (!document.cookies) {
        // Login()
    // }

}

//  OnLogin Screen Form

function showLogin() {
    LoginForm.style.display = "flex"
    RegForm.style.display = "none"
    document.getElementById('ErrRegister').innerHTML = ``;
}

function showReg() {

    // logout()

    RegForm.style.display = "flex"
    LoginForm.style.display = "none"
    document.getElementById('Errlogin').innerHTML = ``;

    setTimeout(() => map.invalidateSize(), 200);

}

function logout() {
  fetch("./script/logout.php")
    .then(res => res.text())
    .then(() => {
      window.location.href = "vendor.html"; // or home page
    });
}

function logout_customer() {
  fetch("./script/logout_customer.php")
    .then(res => res.text())
    .then(() => {
      window.location.href = "index.html"; // or home page
    });
}

