
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
        //checkbox.className = 'userCheckbox';
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

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

getData();