let icon = () => {
    const noob = document.getElementById('noob')
    const Quema = document.getElementById('img')
    let i=1
    Quema.addEventListener('click',()=>{
        if(i===6){
            noob.style.display = "block"
            Quema.style.display = "none"
            i=0
        }else{
            i++
        }
    })

    noob.addEventListener('click',()=>{
        noob.style.display = "none"
        Quema.style.display = "block"
    })

}

window.onload = icon