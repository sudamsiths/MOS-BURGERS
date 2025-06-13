function signinbutton(){
    let username= document.getElementById("username").value;
    let password=document.getElementById("password").value;
    
    let systemusername="admin";
    let systempassword="1234"; 

   if (systemusername === username && systempassword === password) {
        window.location.href = "index.html";
        console.log("Redirecting to index.html...");
        alert("Login successful!");
    } else {
        alert("Invalid username or password");
    }
}
