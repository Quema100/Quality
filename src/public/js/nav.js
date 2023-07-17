let icon = () => {
    const badQuema = document.getElementById('bad')
    const tinking = document.getElementById('tinking')
    const drug = document.getElementById('drug')
    const Quema = document.getElementById('img')

    let i=1
    Quema.addEventListener('click',()=>{
        if(i===6){
            badQuema.style.display = "block"
            Quema.style.display = "none"
            i=0
        }else{
            i++
        }
    })

    badQuema.addEventListener('click',()=>{
        badQuema.style.display = "none"
        tinking.style.display = "block"
    })

    tinking.addEventListener('click',()=>{
        tinking.style.display = "none"
        drug.style.display = "block"
    })

    drug.addEventListener('click',()=>{
        drug.style.display = "none"
        Quema.style.display = "block"
    })
}

window.onload = icon