function createaccount(){
    let firstname=document.getElementById("firstname").value;
    let lastname=document.getElementById("lastname").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let comformpassword=document.getElementById("confirm-password").value;
    let address=document.getElementById("address").value;
    let phonenumber=document.getElementById("phone").value;
    let month=document.getElementById("birth-month").value;
    let day=document.getElementById("birth-day").value;
    let year=document.getElementById("birth-year").value;



    console.log(firstname+" "+lastname);
    console.log(email);
    console.log(password+" "+comformpassword);
    console.log(address);
    console.log(phonenumber);
    console.log(day+" "+month+" "+year);   
}
function signinbutton(){
    console.log("Hello Login");
    
}
