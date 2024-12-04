const listData = [];

const openPopUp = document.getElementById('btn');
const pop = document.getElementById('popup');
const form = document.getElementById('formId');
const dataList = document.getElementById('dataList');
const nameInput = document.getElementById('name');
const activeInput = document.getElementById('box');
const closebutton = document.getElementById('closeup')
// let editIndex = null;

openPopUp.addEventListener('click', () => {
    form.reset();
    editIndex = null;
    pop.classList.add('active');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const active = activeInput.checked;

    if (editIndex !== null) {
        listData[editIndex] = { name, active };
        editIndex = null;
    } else {
        listData.push({ name, active });
    }

    updateList();
    form.reset();
    pop.classList.remove('active');
});

function updateList() {
    dataList.innerHTML = '';

    listData.forEach((data, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = data.name || 'N/A';
        row.appendChild(nameCell);

        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => {
            editIndex = index;
            nameInput.value = data.name;
            activeInput.checked = data.active;
            pop.classList.add('active');
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        // Delete button
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            listData.splice(index, 1);
            updateList();
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        // Append row to table body
        dataList.appendChild(row);
    });
}

closeup.addEventListener('click', () => {
    pop.classList.remove('active');
})