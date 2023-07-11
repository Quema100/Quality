let addevent = () => {
    const body = document.querySelector('body'),

    toggleswitch = document.getElementById('toggle-switch');

    toggleswitch.addEventListener("click",() => {
        body.classList.toggle("white");
    })
}

window.onload = addevent