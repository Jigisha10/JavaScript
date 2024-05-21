 const URL ="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
 const factpara = document.querySelector("#fact");
 const btn = document.querySelector("#btn");

 const getfacts = async () => {
    console.log("getting data ....");
    let response = await fetch(URL);
    console.log(response); //JSON format 
    let data = await response.json();
    factpara.innertext = data[0].text;
 }

 btn.addEventListener("Click", getfacts);