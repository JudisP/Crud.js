document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data =>  loadHTMLTable(data['data']));
})


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

document.getElementById('modaledit')
    .addEventListener('click', openModalEdit)

document.getElementById('modalEditClose')
    .addEventListener('click', closeModalEdit)

document.getElementById('cancelaredit')
    .addEventListener('click', closeModalEdit)



const addBtn = document.getElementById('savebd');
var input = document.getElementById('modalCad').elements;

addBtn.onclick = function() {
    console.log('click')
    var input = document.getElementById('modalCad').elements;
    console.log(input)

    fetch('http://localhost:3000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({nomes: input[0].value,
        formacao: input[1].value,
        categoria: input[2].value,
        status: input[3].value,
        email: input[4].value,
        celular: input[5].value})
    })
    .then(response => document.location.reload(true));
    // .then(data => insertRowIntoTable(data['data']));
}


document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "button red") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "button green") {
        handleEditRow(event.target.dataset.id);
    }
});

function handleEditRow(id) {
    const updateSection = document.getElementById('editar');
    updateSection.hidden = false;
    document.querySelector('').dataset.id = id;
}

//update
updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input');


    console.log(updateNameInput);

    fetch('http://localhost:3000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({nomes: input[0].value,
        formacao: input[1].value,
        categoria: input[2].value,
        status: input[3].value,
        email: input[4].value,
        celular: input[5].value})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}

//delete
function deleteRowById(id) {
    console.log('click')
    console.log(id)
    fetch('http://localhost:3000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

//html
function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
            tableHtml += `<td>${data[key]}</td>`;
        }
    }
    // console.log(error)
    tableHtml += `<td><button class="button red" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="button green" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, nomes, formacao, categoria, status, email, celular}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${nomes}</td>`;
        tableHtml += `<td>${formacao}</td>`;
        tableHtml += `<td>${categoria}</td>`;
        tableHtml += `<td>${status}</td>`;
        tableHtml += `<td>${email}</td>`;
        tableHtml += `<td>${celular}</td>`;
        tableHtml += `<td><button class="button green" id="editar" data-id=${id}>Edit</button>
        <button class="button red" id="deletar" data-id=${id}>Delete</button></td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}