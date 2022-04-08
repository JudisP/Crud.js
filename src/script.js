document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data =>  loadHTMLTable(data['data']));
})

// function loadHTMLTable(data) {
//     const table = document.querySelector('table tbody');
//     let tableHtml = "";
    
//     if (data.length === 0) {
//         table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
//     }
// }

const addBtn = document.querySelector('#savebd');

addBtn.onclick = function() {
    console.log('click')
    const nameInput = document.querySelector('#nomeadd');
    const nome = nameInput.value;
    nameInput.value = "";

    fetch('http://localhost:3000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({nomes: nome,
        formacao: formacao,
        categoria: categoria,
        status: status,
        email: email,
        celular: celular})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {

}

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const openModalEdit = () => document.getElementById('modaledit')
    .classList.add('active')

const closeModalEdit = () => document.getElementById('modaledit')
    .classList.remove('active')


document.getElementById('cadastrar')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.getElementById('editar')
    .addEventListener('click', openModalEdit)

document.getElementById('modalEditClose')
    .addEventListener('click', closeModalEdit)

document.getElementById('cancelaredit')
    .addEventListener('click', closeModalEdit)