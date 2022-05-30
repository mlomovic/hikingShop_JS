let korpa = []

window.addEventListener('load', ()=>{
    if(localStorage.getItem('korpa')){
        korpa = JSON.parse(localStorage.getItem('korpa'));
        document.querySelector('#brStavki').innerHTML = `(${korpa.length})`
    } 
})