
const getData = async () => {
    let x = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"); // data lane ki promise 
    let data = await x.json();  // data parse 
    // console.table(data);
    populateTable(data);
    //document.write(data);
}
function populateTable(data) {
    const tableBody = document.getElementById('dataTable');

    for (let i = 0; i < data.length; i++) {
        //console.log(data[i]);
        const user = data[i];
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
        cellAction.innerHTML = `<button title="Edit" class="editicon fa-solid fa-pen-to-square"></button>
                <button title="Delete" class="deleteicon fa-solid fa-trash"></button>`
        row.appendChild(cellAction);

        tableBody.appendChild(row);
    }

}

//----------- Search Filter Code ----------------//

// function myFunction() {
//     // var input, filter, table, tr, td, i, j, txtValue;
//     // input = document.getElementById("search-input");
//     // filter = input.value.toUpperCase();
//     // table = document.getElementById("dataTable");
//     // tr = table.getElementsByTagName("tr");

//     // // Show clear button if there is input, otherwise hide it
//     // var clearButton = document.getElementById("clear-button");
//     // clearButton.style.display = input.value ? "inline-block" : "none";

//     // // Hide the "No Data found"  
//     // var noDataRow = document.getElementById("no-data");
//     // noDataRow.style.display = "none";
//     // visible = false;

//     // for (i = 1; i < tr.length; i++) {
//     //     if (tr[i].id === "no-data") {
//     //         continue;  // skip the no data found
//     //     }

//     //     tr[i].style.display = "none";
//     //     td = tr[i].getElementsByTagName("td");
//     //     for (j = 0; j < td.length; j++) {
//     //         if (td[j]) {
//     //             txtValue = td[j].textContent || td[j].innerText;
//     //             if (txtValue.toUpperCase().indexOf(filter) > -1) {
//     //                 tr[i].style.display = "table-row";
//     //                 visible = true;
//     //                 break
//     //             }
//     //         }
//     //     }
//     // }
//     // if (!visible) {
//     //     noDataRow.style.display = "table-row";
//     // }
//     var input, filter, table, tr, td, i, txtValue;
//     input = document.getElementById("search-input");
//     filter = input.value.toUpperCase();
//     table = document.getElementById("dataTable");
//     tr = table.getElementsByTagName("tr");
//     for (i = 0; i < tr.length; i++) {
//         td = tr[i].getElementsByTagName("td");
//         if (td === txtValue.toUpperCase().indexOf(filter) > -1 ) {
//            // txtValue = (td[1].textContent || td[1].innerText) + " " + (td[2].textContent || td[2].innerText) + " " + (td[3].textContent || td[3].innerText);

//             txtValue = (td[1].textContent || td[1].innerText) + " " +
//                        (td[2].textContent || td[2].innerText) + " " +
//                        (td[3].textContent || td[3].innerText);
//             if (txtValue.toUpperCase().indexOf(filter) > -1) {
//                 tr[i].style.display = "";
//             } else {
//                 tr[i].style.display = "none";
//             }
//         }
//     }
// }

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");

    //  Show clear button if there is input, otherwise hide it
    var clearButton = document.getElementById("clear-button");
    clearButton.style.display = input.value ? "inline-block" : "none";

    // Hide the "No Data found"  
    var noDataRow = document.getElementById("no-data");
    noDataRow.style.display = "none";
    visible = false;

    for (i = 0; i < tr.length; i++) {
        if (tr[i].id === "no-data") {
            continue;  // skip the no data found
        }
        td = tr[i].getElementsByTagName("td");
        if (td && td.length >= 4) { // Check if td is not undefined and has at least 4 elements
            var name = td[1].textContent || td[1].innerText;
            var email = td[2].textContent || td[2].innerText;
            var role = td[3].textContent || td[3].innerText;

            // Concatenate text values of user.name, user.email, and user.role
            txtValue = name + " " + email + " " + role;

            // Check if the concatenated text value contains the filter text
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "table-row";
                visible = true;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    if(!visible){
        noDataRow.style.display = "table-row";
    }
}


//----------- clear search data ------------- //

function clearSearch() {
    var input = document.getElementById("search-input");
    var table = document.getElementById("dataTable");
    var tr = table.getElementsByTagName("tr");
    var clearButton = document.getElementById("clear-button");

    input.value = "";
    clearButton.style.display = "none";

    for (let i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
    input.focus();
}

//----------- Select ALL Checkbox Code ----------// 

function selectAllCheckbox() {
    var selectAll = document.getElementById("selectAll");
    var checkboxes = document.querySelectorAll(".userCheckbox");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = selectAll.checked;
    }
}

getData();