const productTable = document.getElementById('productTable');

const naslovForme = document.querySelector('#naslovForme');

const frmName = document.querySelector('#frmName');
const frmPrice = document.querySelector('#frmPrice');
const frmDescription = document.querySelector('#frmDescription');
const frmCategory = document.querySelector('#frmCategory');
const frmQty = document.querySelector('#frmQty');
const lblImg = document.querySelector('#lblImg');
const img = document.querySelector('#img');

const addButton = document.querySelector('#addButton');
const editButton = document.querySelector('#editButton');
const cancelButton = document.querySelector('#cancelButton');


let proizvodi = [];
let editProizvod;
let editMode = false;
let editId = null;

window.addEventListener('load', () => {
   ispisProizvoda();

});


const ispisProizvoda = () => {

    fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            proizvodi = resJson;

        })
        .then(_ => {
            productTable.innerHTML = '';
            proizvodi.forEach(proizvod => {
                productTable.innerHTML += `
        <tr>
            <td>${proizvod.id}</td>
            <td><img src="http://localhost:3000/${proizvod.img}" height="30px"></td>
            <td>${proizvod.name}</td>
            <td>${proizvod.qty}</td>
            <td>$${proizvod.price}</td>
            <td><button class="btn btn-info" onclick="viewProduct(${proizvod.id})">View</button></td>
            <td><button class="btn btn-warning" onclick="editProduct(${proizvod.id})">Edit</button></td>
            <td><button class="btn btn-danger" onclick="removeProduct(${proizvod.id})">Delete</button></td>
        </tr>
        `;
            })
        })
        .catch(err => console.log(err))


}



const viewProduct = (id) => {
    localStorage.setItem('singleProduct', id);
    window.location = "single.html";
};


const removeProduct = (id) => {

    fetch(`http://localhost:3000/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(resJson => {
            fetch('http://localhost:3000/')
                .then(proizvodiRaw => proizvodiRaw.json())
                .then(proizvodiJson => {
                    proizvodi = proizvodiJson;
                })
                .then(_ => {
                    ispisProizvoda();
                })
                .catch(err => console.log(err));
        })

};


const editProduct = (id) => {
    editId = id;
    addButton.hidden = true;
    img.hidden = true;
    lblImg.hidden = true;
    editButton.hidden = false;
    cancelButton.hidden = false;

    naslovForme.innerText = 'Edit product';

    fetch(`http://localhost:3000/${id}`)
        .then(proizvodRaw => {
            return proizvodRaw.json();
        })
        .then(proizvodJson => {
            console.log(proizvodJson[0]);
            editProizvod = proizvodJson[0];

            frmName.value = proizvodJson[0].name;
            frmPrice.value = proizvodJson[0].price;
            frmDescription.value = proizvodJson[0].description;
            frmCategory.value = proizvodJson[0].category;
            frmQty.value = proizvodJson[0].qty;

        })
        .catch(err => console.log(err));

}





editButton.addEventListener('click', (event) => {
    console.log(editProizvod);

    data = {
        name: frmName.value,
        price: Number(frmPrice.value),
        description: frmDescription.value,
        category: frmCategory.value,
        qty: Number(frmQty.value)
    };

    fetch(`http://localhost:3000/edit/${editId}`, {
            method: 'PUT',
            // mode: 'cors',
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(proizvodRaw => proizvodRaw.json())
        .then(proizvodJson => {

            // console.log(`editvano => ${Object.keys(proizvodJson)}`);
            // console.log(proizvodJson);

            frmName.value = '';
            frmPrice.value = '';
            frmDescription.value = '';
            frmCategory.value = '';
            frmQty.value = '';

            editId = null;
            addButton.hidden = false;
            img.hidden = false;
            lblImg.hidden = false;

            editButton.hidden = true;
            cancelButton.hidden = true;

            naslovForme.innerText = 'New product';



        })
        .then(_ => {
            ispisProizvoda();
        })
        .catch(err => console.log(err))
})




cancelButton.addEventListener('click', () => {
    frmName.value = '';
    frmPrice.value = '';
    frmDescription.value = '';
    frmCategory.value = '';
    frmQty.value = '';

    editId = null;
    addButton.hidden = false;
    img.hidden = false;
    lblImg.hidden = false;

    editButton.hidden = true;
    cancelButton.hidden = true;

    naslovForme.innerText = 'New product';


})