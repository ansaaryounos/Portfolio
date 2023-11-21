const designer = document.getElementById("designer");
const specialist = document.getElementById("specialist");
const developer = document.getElementById("developer");
const director = document.getElementById("director");
const human = document.getElementById("human");

var menuIsOpen = false;

function ReloadPage() {
    location.reload();
}

function Menu() {

    if (!menuIsOpen) {

        let root = document.documentElement;
        root.style.setProperty('--menuColour', "#c2185b")

        var dots = document.getElementsByClassName('burger-rings');
        dots[0].style.transform = "translateY(-370px)";
        dots[2].style.transform = "translateX(370px)";
        dots[7].style.transform = "translateY(370px)";
        dots[5].style.transform = "translateX(-370px)";

        var menu = document.getElementById("menu-window-container");
        menu.style.opacity = 1;
        menu.style.transform = "translateX(0)"

        menuIsOpen = true;
    }
    else if (menuIsOpen) {
        
        let root = document.documentElement;
        root.style.setProperty('--menuColour', "#ffffff")

        var dots = document.getElementsByClassName('burger-rings');
        dots[0].style.transform = "translateX(0px)";
        dots[2].style.transform = "translateY(0px)";
        dots[7].style.transform = "translateX(0px)";
        dots[5].style.transform = "translateY(0px)";

        var menu = document.getElementById("menu-window-container");
        menu.style.opacity = 0;
        menu.style.transform = "translateX(600px)"

        menuIsOpen = false;
    }
}

window.addEventListener("load", function() {
    Adjust()
})

window.addEventListener("resize", function() {
    Adjust()
})

function Adjust() {
    const name = document.getElementById("name");

    if (window.innerWidth < 1100) {
        name.innerHTML = "Ansaar Younos"
        name.setAttribute('data-text', 'Ansaar Younos')
    }
    else {
        name.innerHTML = "AnsaarYounos"
        name.setAttribute('data-text', 'AnsaarYounos')
    }
}
//window.onpageshow = ReloadPage();

