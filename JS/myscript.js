document.write("External Javascript");
function append(string1, string2){
    return(string1+string2);
}
// debugger;
var firstName="Jigisha";
var lastName="Ahir";
document.write(firstName,lastName);
i = 0;
window.onload= function(){
    document.getElementById('changetext').onclick=function(){
        document.getElementById("spntext").innerHTML= i++;
    }
}