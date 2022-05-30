const slika = document.querySelector('#slika');
const naziv = document.querySelector('#naziv');
const cena = document.querySelector('.price');
const opis = document.querySelector('#opis');
const kolicina = document.querySelector('#qty');
const kategorije = document.querySelector('.category');

const forma = document.querySelector('form');



let currentId = null;

// let korpa = [];


window.addEventListener('load', () => {
    
   
    currentId = localStorage.getItem("singleProduct");

    fetch(`http://localhost:3000/${currentId}`)
        .then(proizvodRaw => {
            return proizvodRaw.json();
        })
        .then(proizvodJson => {

            slika.innerHTML = `<img src="http://localhost:3000${proizvodJson[0].img}" alt="Photo">`;
            naziv.textContent = `${proizvodJson[0].name}`;
            cena.textContent = `$${proizvodJson[0].price}`;
            opis.textContent = `${proizvodJson[0].desc}`;

            kolicina.innerHTML = '';

            for (let i = 1; i <= proizvodJson[0].qty; i++) {
                kolicina.innerHTML += `<option value="${i}">${i}</option>`;
            }

            let katTemp = proizvodJson[0].category.trim().split(',');
            kategorije.innerHTML = '';

            katTemp.forEach((element, idx) => {
                if (katTemp.length != idx + 1) {
                    kategorije.innerHTML += `<a href="">${element.trim()}</a>, `
                } else {
                    kategorije.innerHTML += `<a href="">${element.trim()}</a>`
                }
            })

        })
});



forma.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(event.target.kolicina.value);

    fetch(`http://localhost:3000/${currentId}`)
        .then(proizvodRaw => {
            return proizvodRaw.json();
        })
        .then(proizvodJson => {
            proizvodJson[0].qty = event.target.kolicina.value;
            // korpa.push({
            //     id: proizvodJson[0].id,
            //     name: proizvodJson[0].name,
            //     price: proizvodJson[0].price,
            //     img: proizvodJson[0].img,
            //     desc: proizvodJson[0].desc,
            //     category: proizvodJson[0].category,
            //     qty: proizvodJson[0].qty
            // })
            // console.log(korpa);

            if(!localStorage.getItem('korpa')){
                localStorage.setItem('korpa', '[]');
            };

            korpa = JSON.parse(localStorage.getItem('korpa'));
            korpa.push(proizvodJson[0]);
            console.log(korpa);
            localStorage.setItem('korpa', JSON.stringify(korpa));

        })
        .catch(err => console.log(err))
        .finally(_ =>{
            window.location="products.html";
        })


})