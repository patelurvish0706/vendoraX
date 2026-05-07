(() => {
    const m = matchMedia('(prefers-color-scheme: dark)');
    const link = document.head.appendChild(document.createElement('link'));
    link.rel = 'shortcut icon';

    const set = () => link.href = m.matches ? 'css/logoDark.svg' : 'css/logo.svg';
    set();
    m.onchange = set;
})();


const AccountServicesBtns = document.getElementById("AccountServicesBtns");
const MoreServicesBtns = document.getElementById("MoreServicesBtns");

let active = (e) => {
    e.target.style.color = "#fff"
    e.target.style.backgroundColor = "#4c6381"
}

let deactive = (e) => {
    e.target.style.color = "#4c6381"
    e.target.style.backgroundColor = "#fff"
}

let deactiveAll = () => {

    for (let i = 0; i < document.querySelectorAll(".NavLink .material-symbols-outlined").length; i++) {
        document.querySelectorAll(".NavLink .material-symbols-outlined")[i].style.color = "#4c6381"
        document.querySelectorAll(".NavLink .material-symbols-outlined")[i].style.backgroundColor = "#fff"
    }
    MoreServicesBtns.style.display = "none"
    AccountServicesBtns.style.display = "none"
}

let isAccOpen = false;
document.getElementById('AccountServices').addEventListener("click", (e) => {
    // console.log(e.target.parentElement);
    deactiveAll()

    if (!isAccOpen) {
        deactiveAll()
        active(e);
        AccountServicesBtns.style.display = "flex"
        MoreServicesBtns.style.display = "none"

        isMoreOpen = false;
        return isAccOpen = true;

    }
    if (isAccOpen) {
        // deactiveAll()    
        AccountServicesBtns.style.display = "none"

        return isAccOpen = false;

    }
})

let isMoreOpen = false;
document.getElementById('MoreServices').addEventListener("click", (e) => {
    deactiveAll()

    if (!isMoreOpen) {
        deactiveAll()
        active(e);
        AccountServicesBtns.style.display = "none"
        MoreServicesBtns.style.display = "flex"
        isAccOpen = false;
        return isMoreOpen = true;

    }
    if (isMoreOpen) {
        // deactiveAll() 
        MoreServicesBtns.style.display = "none"

        return isMoreOpen = false;
    }
})

// -------------------Redirects------------------------------

let gotoVendor = () => {
    window.open('./Vendor.html', '_blank')
}

let gotoAboutVendoraX = () =>{
    window.open('./About.html', '_blank')
}

let gotoVendorFaqs = () =>{
    window.open('./About.html', '_blank')
}

let gotoVendoraGuide = () =>{
    window.open('./About.html', '_blank')
}