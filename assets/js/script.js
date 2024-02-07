function getData(){
    let name = document.getElementById("name").value //let name = **
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let subject = document.getElementById("subject").value
    
    if(name == ""){
        return alert("please type your name*")
    } else if (email ==""){
        return alert("please type your name*")
    }

    const emailDestination = "hi.dandi9(@gmail.com"

    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(subject)
}