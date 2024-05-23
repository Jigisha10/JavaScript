
const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const getfacts = async () => {
    console.log("Getting Data....");
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    populateTable(data);
    console.table(data);
};

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
//         .then(response => response.json())
//         .then(data => populateTable(data))
//         .catch(error => console.error('Error fetching data:', error));
//  });

function populateTable(data) {
    const tableBody = document.getElementById('dataTable');

    data.forEach(user => {
        const row = document.createElement('tr');


        const cellCheckbox = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = user.id;
        cellCheckbox.appendChild(checkbox);
        row.appendChild(cellCheckbox);

        const cellName = document.createElement('td');
        cellName.textContent = user.name;
        row.appendChild(cellName);

        const cellEmail = document.createElement('td');
        cellEmail.textContent = user.email;
        row.appendChild(cellEmail);

        const cellRole = document.createElement('td');
        cellRole.textContent = user.role;
        row.appendChild(cellRole);

        const cellAction = document.createElement('td');

        // Edit Icon
        const editIcon = document.createElement('i');
        editIcon.className = 'editicon fa-solid fa-pen-to-square';
        editIcon.style.cursor = 'pointer';
        editIcon.title = 'Edit';
        editIcon.onclick = ()=> {
            editUser(user.id);
        };
        cellAction.appendChild(editIcon);

        // Delete Icon
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'deleteicon fa-solid fa-trash'; 
        deleteIcon.style.cursor = 'pointer' ;
        deleteIcon.title = 'Delete';
        deleteIcon.onclick = ()=> {
            deleteUser(user.id);
        }
        cellAction.appendChild(deleteIcon);

        row.appendChild(cellAction)

        tableBody.appendChild(row);
    });

    // Edit Function
}

    // Delete Function
    function editUser(userId) {
        alert('Edit user with ID ' + userId);
        // Implement your edit functionality here
    }

getfacts();

