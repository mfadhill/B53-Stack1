let dataBlogs = [];

function addBlog(event) {
  event.preventDefault();

  let nameProject = document.getElementById("name-project").value;
  let desc = document.getElementById("desc").value;

  // let postAt = new Date();
  let durationTime = getDurationTime();
  let dataBlog = {
    nameProject,
    durationTime,
    desc,
  };

  dataBlogs.push(dataBlog);

  // console.log(dataBlogs);

  renderBlog();
}

function renderBlog() {
  document.getElementById("contents").innerHTML = "";

  for (let i = 0; i < dataBlogs.length; i++) {
    // let durationString = getDistanceTime(dataBlogs[i].postAt)
    document.getElementById("contents").innerHTML += `

<div class="container">
<div class="card" style="padding-left:20px">
    <img src="assets/image/1.jpg" alt="">
    <div class="card-content">
        <h4> ${dataBlogs[i].nameProject}</h4>
        <p>${dataBlogs[i].desc}</p>
            <div>
                <button class="btn-edit" style="background-color: red;"> Edit Post</button>
                <button class="btn-post" style="background-color: black;"> Delete Post</button>
            </div>
    </div>
</div>
</div>
    `;
  }
}

function getDurationTime() {
  // let distanceDuration = endDate - starDate;
  let starDate = new Date(document.getElementById("start-date").value);
  let endDate = new Date(document.getElementById("end-date").value);
  let inputstartDate = new Date(endDate);
  let inputendDate = new Date(starDate);

  let durationTime = inputendDate - inputstartDate;



  let secondInHour = 3600;
  let HourInDay = 24;
  let dayInMount = 30;
  let miliSecond = 1000;

  let durationMonth = Math.floor(
    durationTime / (miliSecond * secondInHour * HourInDay * dayInMount)
  )

  let durationDay = Math.floor(
    durationTime / (miliSecond * secondInHour * HourInDay)
  )

  if (durationMonth > 0) {
    return `{$durationMonth} Bulan`;
  } else if (durationDay > 0) {
    return `{$durationDay} hari`;
  }
}