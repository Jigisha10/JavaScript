const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
// const factpara = document.querySelector("#fact");
// const btn = document.querySelector("#btn");

const getfacts = async () => {
   console.log("getting data ....");
   let response = await fetch(URL);
   console.log(response); //JSON format 
   let data = await response.json();
   console.table(data);
   document.getElementById("fact").innerHTML = data();
   document.querySelector("#mytable").innerHTML=data;
   
   // factpara.innertext = data[0].text;
}


// second example
// function getfacts() {
//    fetch(URL)
//       .then((response) => {
//          return response.json();
//       })
//       .then((data)=> {
//          console.log(data);
//       })
// }

document.addEventListener('DOMContentLoaded', function() {
   fetch('https://jsonplaceholder.typicode.com/users')
       .then(response => response.json())
       .then(data => populateTable(data))
       .catch(error => console.error('Error fetching data:', error));
});

function populateTable(data) {
   const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
   
   data.forEach(user => {
       const row = document.createElement('tr');
       
       const cellId = document.createElement('td');
       cellId.textContent = user.id;
       row.appendChild(cellId);
       
       const cellName = document.createElement('td');
       cellName.textContent = user.name;
       row.appendChild(cellName);
       
       const cellEmail = document.createElement('td');
       cellEmail.textContent = user.email;
       row.appendChild(cellEmail);
       
       tableBody.appendChild(row);
   });
}


btn.addEventListener("click", getfacts);