
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
        checkbox.className = 'userCheckbox';
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
        editIcon.onclick = () => {
            openEditModal(user);
        };

        cellAction.appendChild(editIcon);

        // Delete Icon
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'deleteicon fa-solid fa-trash';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.title = 'Delete';
        deleteIcon.onclick = () => {
            deleteUser(user.id);
        }
        cellAction.appendChild(deleteIcon);

        row.appendChild(cellAction)

        tableBody.appendChild(row);
    });

}
// Edit modal Function

function openEditModal(user) {
    //document.getElementById('userId').value = user.id;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userRole').value = user.role;

    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
}
const span = document.getElementsByClassName('close')[0];
span.onclick = function () {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
    const modal = document.getElementById('editModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
document.getElementById('editForm').onsubmit = function (event) {
    event.preventDefault();
    // const userId = document.getElementById('userId').value;
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userRole = document.getElementById('userRole').value;

    const row = document.querySelector(`tr[data-user-id='${userId}']`);
    if (row) {
        row.querySelector('.userName').textContent = userName;
        row.querySelector('.userEmail').textContent = userEmail;
        row.querySelector('.userRole').textContent = userRole;
    }
    //console.log('User ID:', userId);
    console.log('User Name:', userName);
    console.log('User Email:', userEmail);
    console.log('User Role:', userRole);
    // Perform the update operation (e.g., send data to the server)
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
};

// Select All Checkbox

document.getElementById('selectAll').addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('.userCheckbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});


// Delete Function
function editUser(userId) {
    alert('Edit user with ID ' + userId);
    // Implement your edit functionality here
}

// Search Filter

function myFunction() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchFilter");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    
    for (i = 1; i < tr.length; i++) { // Start from 1 to skip the header row
        tr[i].style.display = "none"; // Initially hide the row
        td = tr[i].getElementsByTagName("td");
        
        for (j = 1; j < td.length; j++) { // Start from 1 to skip the checkbox column
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = ""; // Show the row
                    break; // No need to check other columns
                }
            }
        }
    }
}


//getfacts();

