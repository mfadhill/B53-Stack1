// let names = "Muhammad Fadhil"
// console.log( typeof names)

// jika dia memebr vip dia boleh masuk
//is not memebr vip = harus daftar vip

// const isVip = true

// if(isVip == true){
//     console.log("silahkan masuk")
// }else{
//     console.log("Tolong daftar dulu")
// }

// && ||
// const age = 25

// if (age < 20) {
//     console.log("Kamu sudah melewati batas usian beasiswa")
// } else if (age < 30) {
//     console.log("Ambil kelas reguler")
// } else {
//     console.log("Maaf tidak bisa daftar")
// }

// fungsi sekumpulan kode yang akan berjalan apabila dijalankan atau dipanggil
// fungsi declaration, fungsi expression, arrow function

//function
// function sayHello() {
//     // block code
// }
// sayHello()
// const sayHello2() {
//     //
// }
// sayHello2()

// const sayHello3 = () => {
//     //
// }

// function sayHello(){
//     console.log("bang")
// }

// sayHello()

// function sayHello(name) {
//     console.log("selamat datang" + name)
// }

// sayHello("muhammad Fadhil")


// function memeebrship(name, isVip) {
//     if (isVip) {
//         let data = `selamat ${name}, kamu member vip`
//     } else {
//         let data = "maaf kamu bukan membership"
//     }
// }

// console.log(memeebrship("dandi saputra", true))
let dataBlogs = [];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let postAt = new Date();

  // console.log(postAt.getFullYear());
  // console.log(postAt.getMonth());
  // console.log(postAt.getDate());

  let dataBlog = {
    title,
    content: content,
    postAt,
  };

  dataBlogs.push(dataBlog);
  // console.log(dataBlogs);

  renderBlog();
}

function renderBlog() {
  document.getElementById("contents").innerHTML = "";

  for (let index = 0; index < dataBlogs.length; index++) {
    document.getElementById("contents").innerHTML += `
    <div class="blog-list-item">
    <div class="blog-image">
      <img src="assets/image/1.jpg" alt="" />
    </div>
    <div class="blog-content">
      <div class="btn-group">
        <button class="btn-edit">Edit Post</button>
        <button class="btn-post">Delete Post</button>
      </div>
      <h1>
        <a href="blog-detail.html" target="_blank"
          >${dataBlogs[index].title}</a
        >
      </h1>
      <div class="detail-blog-content">
        ${getFullDate(dataBlogs[index].postAt)}| Muhammad Fadhil
      </div>
      <p>
      ${dataBlogs[index].content}
      </p>
    </div>
  </div>
    `;
  }
}