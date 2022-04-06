document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => console.log(data));
    loadHTMLTable([]);
})

// function loadHTMLTable(data) {
//     const table = document.querySelector('table tbody');
//     let tableHtml = "";
    
//     if (data.length === 0) {
//         table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
//     }
// }

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