let icon = () => {
    const noob = document.getElementById('noob')
    const Quema = document.getElementById('img')

    Quema.addEventListener('mouseover',()=>{
        noob.style.display = "block"
        Quema.style.display = "none"
    })

    noob.addEventListener('mouseout',()=>{
        noob.style.display = "none"
        Quema.style.display = "block"
    })

}

window.onload = icon