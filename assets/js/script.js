function getData() {
    let name = document.getElementById("name").value // => let name = ""
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let subject = document.getElementById("subject").value
    let message = document.getElementById("message").value
  
  
    if(name == "") {
      return alert("Please type your name")
    } else if(email == "") {
      return alert("Please type your email")
    } else if(phone == "") {
      return alert("Please type your phone")
    } else if(subject == "") {
      return alert("Please type your subject")
    } else if(message == "") {
      return alert("Please type your message")
    }
  
    const emailDestination = "hi.dandi9@gmail.com"
    let a = document.createElement("a")
    a.href = `mailto:${emailDestination}?subject=${subject}&body= Halo bang nama saya, ${name}, saya ingin ${message}. bisakah anda menghubungi saya ${phone}`
    a.click()
  
    const data = {
      name,
      email,
      phone,
      subject,
      message
    }
  
    console.log(data)
  }