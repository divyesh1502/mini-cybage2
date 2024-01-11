const isLogin = sessionStorage.getItem("isLogin");
function loadContent() {

  // load movie form database
  if(isLogin === "true"){
    $("#loginBtn").html(`<button onclick="logout()" class="btn btn-primary p-3"><span >Log out</span></button>`);
  }else{
    $("#loginBtn").html(`<a href="login.html" class="btn btn-primary p-3"><span>Sign in</span></a>`);
  }

 
  axios.get(`http://localhost:3000/movies`).then((response) => {

    var movieData = '';

    response.data.forEach(element => {
      movieData += `<li>
            <div class="movie-card">

              <a href="movie-details.html">
                <figure class="card-banner">
                  <img src="${element.image}" alt="The Northman movie poster">
                </figure>
              </a>

              <div class="title-wrapper">
                <a href="movie-details.html">
                  <h3 class="card-title">${element.title}</h3>
                </a>

                <time datetime="2022">2022</time>
              </div>

              <div class="card-meta">
                <div class="badge badge-outline">HD</div>

                <div class="duration">
                  <ion-icon name="time-outline"></ion-icon>

                  <time datetime="PT137M">137 min</time>
                </div>

                <div class="rating">
                  <ion-icon name="star"></ion-icon>

                  <data>8.5</data>
                </div>
              </div>`;

      if (isLogin === "true") {

        movieData += `<div class="row mt-3">
                  <div class="col-12">
                    <button class="btn favBtn" onclick="addToFavMovie(${element.id})">Add to Favorite</button>
                  </div>
                </div>`;

      }

      movieData += `</div>
          </li>`
    });

    $("#movieList").html(movieData);

  }).catch(err => {
    console.log("something went wrong in", err)
  })

  // load tv show form database
  axios.get(`http://localhost:3000/tvShows`).then((response) => {

    var showData = '';

    response.data.forEach(element => {
      showData += `<li>
            <div class="movie-card">

              <a href="movie-details.html">
                <figure class="card-banner">
                  <img src="${element.image}" alt="The Northman movie poster">
                </figure>
              </a>

              <div class="title-wrapper">
                <a href="movie-details.html">
                  <h3 class="card-title">${element.title}</h3>
                </a>

                <time datetime="2022">2022</time>
              </div>

              <div class="card-meta">
                <div class="badge badge-outline">HD</div>

                <div class="duration">
                  <ion-icon name="time-outline"></ion-icon>

                  <time datetime="PT137M">137 min</time>
                </div>

                <div class="rating">
                  <ion-icon name="star"></ion-icon>

                  <data>8.5</data>
                </div>
              </div>`;


      if (isLogin === "true") {

        showData += `<div class="row mt-3">
                    <div class="col-12">
                      <button class="btn favBtn" onclick="addToFavShow(${element.id})">Add to Favorite</button>
                    </div>
                  </div>`;


      }

      showData += `</div>
          </li>`
    });

    $("#showList").html(showData);

  }).catch(err => {
    console.log("something went wrong in tv show loading", err)
  })



  // load song form database
  axios.get(`http://localhost:3000/songs`).then((response) => {

    var songsData = '';

    response.data.forEach(element => {
      songsData += `<li>
            <div class="movie-card">

              <a href="song-details-1.html">
                <figure class="card-banner">
                  <img src="${element.image}" alt="The Northman movie poster">
                </figure>
              </a>

              <div class="title-wrapper">
                <a href="movie-details.html">
                  <h3 class="card-title">${element.title}</h3>
                </a>

                <time datetime="2022">2022</time>
              </div>

              <div class="card-meta">
                <div class="badge badge-outline">HD</div>

                <div class="duration">
                  <ion-icon name="time-outline"></ion-icon>

                  <time datetime="PT137M">137 min</time>
                </div>

                <div class="rating">
                  <ion-icon name="star"></ion-icon>

                  <data>8.5</data>
                </div>
                </div>`;


      if (isLogin === "true") {

        songsData += `<div class="row mt-3">
                      <div class="col-12">
                        <button class="btn favBtn" onclick="addToFavSong(${element.id})">Add to Favorite</button>
                      </div>
                    </div>`;


      }

      songsData += `</div>
          </li>`;
    });

    $("#songList").html(songsData);

  }).catch(err => {
    console.log("something went wrong in song loading", err)
  })
}

loadContent();

var userId = parseInt(sessionStorage.getItem("userId"));

function addToFavMovie(movieId) {

  axios.get("http://localhost:3000/favMovies", {
    params: {
      userId: userId,
      movieId: movieId
    }
  }).then(response => {
    if (response.data.length > 0) {
      alert("Movie Already added");
    } else {
      axios.post('http://localhost:3000/favMovies', { userId, movieId }).then((response) => {

        alert("Successfully Added to favorite");

      }).catch(error => {

        console.log("Something went wrong");

      })

    }
  })
}

function addToFavShow(showId) {

  axios.get("http://localhost:3000/favShows", {
    params: {
      userId: userId,
      showId: showId
    }
  }).then(response => {
    if (response.data.length > 0) {
      alert("Show Already added");
    } else {
      axios.post('http://localhost:3000/favShows', { userId, showId }).then((response) => {

        alert("Successfully Added to favorite");

      }).catch(error => {

        console.log("Something went wrong");

      })

    }
  })
}

function addToFavSong(songId) {
  axios.get("http://localhost:3000/favSongs", {
    params: {
      userId: userId,
      songId: songId
    }
  }).then(response => {
    if (response.data.length > 0) {
      alert("Song Already added");
    } else {
      axios.post('http://localhost:3000/favSongs', { userId, songId }).then((response) => {

        alert("Successfully Added to favorite");

      }).catch(error => {

        console.log("Something went wrong");

      })

    }
  })
}