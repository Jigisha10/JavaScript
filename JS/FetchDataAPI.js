//let data = [];
let currentPage = 1;
const itemsPerPage = 10;

const getData = async () => {
    let response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"); // data lane ki promise 
    let data = await response.json();
    // console.table(data);
    populateTable(data, currentPage);
    updatePagination(data);
}

function populateTable(data, page = 1) {
    // const tableBody = document.getElementById('dataTable');
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = ''; // Clear existing table data

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginationItems = data.slice(startIndex, endIndex);

    for (let i = 0; i < paginationItems.length; i++) {
        const user = paginationItems[i];
        const row = document.createElement('tr');

        // checkbox 
        const cellCheckbox = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = user.id
        checkbox.className = 'userCheckbox';
        cellCheckbox.appendChild(checkbox);
        row.appendChild(cellCheckbox);

        //User Name
        const cellName = document.createElement('td');
        cellName.textContent = user.name;
        row.appendChild(cellName);

        // User Email
        const cellEmail = document.createElement('td');
        cellEmail.textContent = user.email;
        row.appendChild(cellEmail);

        // User Role
        const cellRole = document.createElement('td');
        cellRole.textContent = user.role;
        row.appendChild(cellRole);

        // User Action
        const cellAction = document.createElement('td');
        cellAction.innerHTML = `<button title="Edit" class="editicon fa-solid fa-pen-to-square" onclick="openEditModal(this)"></button>
                <button title="Delete" class="deleteicon fa-solid fa-trash" id="delete-user" onclick="deleteUser(this)"></button>`
        row.appendChild(cellAction);

        tableBody.appendChild(row);
    }
    // if (paginationItems.length === 0) {
    //     document.getElementById("no-data").style.display = "table-row";
    // } else {
    //     document.getElementById("no-data").style.display = "none";
    // }
}


//----------- Search Filter Code ----------------//

function SearchFilter() {
    var input, filter, table, tr, td, i, txtValue;
    var pageCount = 0;
    const displayRow = [];
    const hideRow = [];
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");

    //  Show clear button if there is input, otherwise hide it
    var clearButton = document.getElementById("clear-button");
    clearButton.style.display = input.value ? "inline-block" : "none";

    // Hide the "No Data found"
    // var noDataRow = document.getElementById("no-data");
    // noDataRow.style.display = "none";
    // var visible = false;

    for (i = 0; i < tr.length; i++) {
        // if (tr[i].id === "no-data") {
        //     continue;  // skip the no data found
        // }
        td = tr[i].getElementsByTagName("td");
        if (td && td.length >= 4) { // Check if td is not undefined and has at least 4 elements
            var name = td[1].textContent || td[1].innerText;
            var email = td[2].textContent || td[2].innerText;
            var role = td[3].textContent || td[3].innerText;

            txtValue = name + " " + email + " " + role;

            // Check if the concatenated text value contains the filter text
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                displayRow.push(tr[i].id);
                // pageCount += 1;
                // updatePagination(pageCount);
                // if (displayRow.length <= 10) {
                //     tr[i].style.display = "table-row";
                // } else {
                //     tr[i].style.display = "none";
                // }
                tr[i].style.display = "table-row";
                visible = true;
            } else {
                hideRow.push(tr[i].id)
                tr[i].style.display = "none";
            }
        }
    }
    // if (!visible) {
    //     noDataRow.style.display = "table-row";
    // }
    return { displayRow: displayRow, hideRow: hideRow }
}

//------------ pagination Functionality --------------------//

function updatePagination(data) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    const pageCount = Math.ceil(data.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        let page = document.createElement('li');
        page.className = 'page-Number';
        page.innerText = i;
        page.id = `totalPage${i}`;
        paginationDiv.appendChild(page);
    }
    const page = document.querySelectorAll('.page-Number');
    for (let i = 0; i < page.length; i++) {
        page[i].addEventListener('click', function (e) {
            const currentPage = e.target.innerText;
            for (let j = 0; j < page.length; j++) {
                page[j].classList.remove('active');
            }
            page[i].classList.add('active');
            populateTable(data, currentPage);
        });
    }
}
// document.addEventListener('click', function (event) {
//     let input = document.getElementById("search-input").value;
//     let data = event.target.id;
//     let page = data.includes('totalPage');
//     let table = document.getElementById("dataTable");
//     let tr = table.getElementsByTagName('tr');
//     if (input == '' && page) {
//         let pageStart = data.charAt(9) - 1;
//         let start = data.charAt(9) == 1 ? 1 : Number(`${pageStart}1`);
//         let end = start + 10;
//         for (let i = 1; i < tr.length; i++) {
//             if (i >= start && i < end) {
//                 tr[i].style.display = "table-row";
//             } else {
//                 tr[i].style.display = "none;"
//             }
//         }
//     } else {
//         if (page) {
//             let show = SearchFilter();
//             let pageStart = data.charAt(9) - 1;
//             let showStart = data.charAt(9) == 1 ? 0 : Number(`${pageStart}1`);
//             let showEnd = showStart + 10;
//             for (let i = 0; i < tr.length; i++) {
//                 if (i >= showStart && i < showEnd && show.display[i]) {
//                     document.getElementById(show.displayRow[i].style.display = "table-row");
//                 } else if ((i < showStart || i > showEnd) && show.displayRow[i]) {
//                     document.getElementById(show.displayRow[i]).style.display = "none";
//                 } else {
//                     if (show.hideRow[i]) {
//                         document.getElementById(show.hideRow[i]).style.display = "none";
//                     }
//                 }
//             }
//         }
//     }

// });



//----------- clear search data ------------- //

function clearSearch() {
    let input = document.getElementById("search-input");
    let table = document.getElementById("dataTable");
    let tr = table.getElementsByTagName("tr");
    let clearButton = document.getElementById("clear-button");

    input.value = "";
    clearButton.style.display = "none";

    for (let i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
    input.focus();
}

//----------- Select ALL Checkbox Code ----------// 

function selectAllCheckbox() {
    let selectAll = document.getElementById("selectAll");
    let checkboxes = document.querySelectorAll(".userCheckbox");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = selectAll.checked;
    }
}

//---------- delete icon functionality ---------------//

function deleteUser(button) {
    if (confirm("Are you sure you want to delete this record?")) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

//---------- Delete selected Checkbox Functionality --------------//

function deleteSelected() {
    if (confirm("Are you sure you want to delete the selected records?")) {
        let table = document.getElementById("dataTable");
        let checkboxes = table.querySelectorAll(".userCheckbox:checked");
        for (let i = checkboxes.length - 1; i >= 0; i--) {
            let row = checkboxes[i].parentElement.parentElement;
            row.parentElement.removeChild(row);
        }
    }
}


getData();

// Edit modal Function

function openEditModal(user) {
    const thisRow = user.closest('tr');
    const editabletd = thisRow.querySelectorAll('.editable');
    console.log(editabletd);

    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
}
const span = document.getElementById('close');
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



