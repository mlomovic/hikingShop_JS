const cartTable = document.getElementById('cartTable');
const featuredArea = document.querySelector('.istaknuto');


window.addEventListener('load', () => {
    if (localStorage.getItem('korpa')) {
        korpa = JSON.parse(localStorage.getItem('korpa'));
    };

    // Kreiranje tabele odabranih proizvoda - korpe
    cartTable.innerHTML = '';

    korpa.forEach(stavka => {
        cartTable.innerHTML += `
        <tr>
            <td>${stavka.id}</td>
            <td><img src="http://localhost:3000/${stavka.img}" height="30px"></td>
            <td>${stavka.name}</td>
            <td>$${stavka.price}</td>
            <td>${stavka.qty}</td>
            <td>$${stavka.price * stavka.qty}</td>
            <td><button class="btn btn-danger" onclick="removeItem(${stavka.id})">X</button></td>
        </tr>
        `;
    });

    let total = korpa.reduce((acc, curVal) => {
        return acc + curVal.qty * curVal.price;
    }, 0);

    cartTable.innerHTML += `
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>total:</td>
        <td>$${total}</td>
    </tr>
    `;


    // Inicijalizacija featured sekcije

    featureInit();

});


const removeItem = (id) => {
    korpa = JSON.parse(localStorage.getItem('korpa'));
    korpa.splice(id, 1);
    localStorage.setItem('korpa', JSON.stringify(korpa));

    // Ispis tabele korpa posle brisanja elementa

    cartTable.innerHTML = '';

    korpa.forEach(stavka => {
        cartTable.innerHTML += `
        <tr>
            <td>${stavka.id}</td>
            <td><img src="http://localhost:3000/${stavka.img}" height="30px"></td>
            <td>${stavka.name}</td>
            <td>$${stavka.price}</td>
            <td>${stavka.qty}</td>
            <td>$${stavka.price * stavka.qty}</td>
            <td><button class="btn btn-danger" onclick="removeItem(${stavka.id})">X</button></td>
        </tr>
        `;
    });

    let total = korpa.reduce((acc, curVal) => {
        return acc + curVal.qty * curVal.price;
    }, 0);

    cartTable.innerHTML += `
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>total:</td>
        <td>$${total}</td>
    </tr>
    `;
}



const clearCart = () => {

    localStorage.setItem('korpa', '[]');
    korpa = [];


    cartTable.innerHTML = '';

    console.log('prova');
    // window.location = 'products.html';
}



const featureInit = () => {
    fetch('http://localhost:3000/')
    .then(res => res.json())
    .then(proizvodi => {

        featuredArea.innerHTML = '';
        proizvodi.forEach(proizvod => {
            featuredArea.innerHTML += `
        <div class="item">
            <a onclick=goToSingle(${proizvod.id})>
                <img src="http://localhost:3000/${proizvod.img}">
                <h3>${proizvod.name}</h3>
                <p>$${proizvod.price}</p>
            </a>
        </div>
            `;
        });
        

    })       
    .catch(err => console.log(err));
}

const goToSingle = (id) => {
    localStorage.setItem("singleProduct", id)
    window.location = "single.html";
}