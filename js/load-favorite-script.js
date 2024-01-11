

const apiUrl = 'http://localhost:3000';


function getFavContent() {
    var isLogin = sessionStorage.getItem("isLogin");
    var userId;
    if (isLogin === "true") {
        userId = sessionStorage.getItem('userId');
    }

    // get fav movie data
    axios.get(apiUrl + "/favMovies").then(favRes => {
        var movieData = [];
        favRes.data.forEach(element => {
            if (userId == element.userId) {
                movieData.push(element.movieId);
            }
        });

        if (movieData.length === 0) {
            $("#movieList").html('<p class="ml-4 text-white">No favorite Movie found..</p>');
        } else {
            axios.get(apiUrl + "/movies").then(movieRes => {

                var favMovieHtml = '';

                movieRes.data.forEach(element => {
                    if (isPresent(movieData, element.id) === true) {
                        favMovieHtml += `<li>
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

                                        favMovieHtml += `<div class="row mt-3">
                                <div class="col-12">
                                    <button class="btn favBtn" onclick="removeFromFavoriteMovie(${element.id}, ${userId})">Remove form Favorite</button>
                                </div>
                                </div>`;


                                    }

                                    favMovieHtml += `</div>
                    </li>`;
                    }
                });

                $("#movieList").html(favMovieHtml);

            });
        }

    });


    // get fav TV Show data
       axios.get(apiUrl+"/favShows").then(favRes =>{
            
            var TVShowData = [];
            favRes.data.forEach(element => {
                if (userId == element.userId) {
                    TVShowData.push(element.showId);
                }
             });

            //  console.log(TVShowData);

             if(TVShowData.length === 0){
                $("#showList").html('<p class="ml-4 text-white">No favorite TV show found..</p>');
             }else{
                 axios.get(apiUrl+"/tvShows").then(TVShowRes=>{

                    // console.log(favRes.data);

                    var favTVShowHtml = '';

                    TVShowRes.data.forEach(element => {
                        if (isPresent(TVShowData, element.id) === true){
                            favTVShowHtml += `<li>
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

                                        favTVShowHtml += `<div class="row mt-3">
                                <div class="col-12">
                                    <button class="btn favBtn" onclick="removeFromFavoriteTVshow(${element.id}, ${userId})">Remove form Favorite</button>
                                </div>
                                </div>`;


                                    }

                                    favTVShowHtml += `</div>
                    </li>`;
                        }
                    });

                    $("#showList").html(favTVShowHtml);

                 });
             }


       });

       // get Music Show data
       axios.get(apiUrl+"/favSongs").then(favRes =>{
            var musicData = [];
            favRes.data.forEach(element => {
                if (userId == element.userId) {
                    musicData.push(element.songId);
                }
             });

             if(musicData.length === 0){
                $("#songList").html('<p class="ml-4 text-white">No favorite music found..</p>');
             }else{

                 axios.get(apiUrl+"/songs").then(musicRes=>{

                    var musicHtml = '';

                    musicRes.data.forEach(element => {
                        if (isPresent(musicData, element.id) === true){
                            musicHtml += `<li>
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

                                        musicHtml += `<div class="row mt-3">
                                <div class="col-12">
                                    <button class="btn favBtn" onclick="removeFromFavoriteMusic(${element.id}, ${userId})">Remove form Favorite</button>
                                </div>
                                </div>`;


                                    }

                                    musicHtml += `</div>
                    </li>`;
                        }
                    });

                    $("#songList").html(musicHtml);

                 }).catch(err=>{
                    console.log("Error in fav music data getting ", error);
                 });
             }


       });

}

getFavContent();

// remove favorite movie
function removeFromFavoriteMovie(movieId, userId) {

    axios.get(apiUrl + "/favMovies").then(favRes => {

        favRes.data.forEach(element => {
            if (element.movieId == movieId && element.userId == userId) {
                axios.delete(`${apiUrl}/favMovies/${element.id}`).then(deleteRes => {
                    alert("Successfully removed from your favorite list", deleteRes.data);
                }).catch(error => {
                    console.log("Error while removing to favorite ", error);
                })
            }
        });

    })
}

// Remove favorite Tvshow
function removeFromFavoriteTVshow(showId, userId) {

    axios.get(apiUrl + "/favShows").then(favRes => {

        favRes.data.forEach(element => {
            if (element.showId == showId && element.userId == userId) {
                axios.delete(`${apiUrl}/favShows/${element.id}`).then(deleteRes => {
                    alert("Successfully removed from your favorite list", deleteRes.data);
                }).catch(error => {
                    console.log("Error while removing to favorite ", error);
                })
            }
        });

    })
}

// Remove favorite music
function removeFromFavoriteMusic(songId, userId) {

    axios.get(apiUrl + "/favSongs").then(favRes => {

        favRes.data.forEach(element => {
            if (element.songId == songId && element.userId == userId) {
                axios.delete(`${apiUrl}/favSongs/${element.id}`).then(deleteRes => {
                    alert("Successfully removed from your favorite list", deleteRes.data);
                }).catch(error => {
                    console.log("Error while removing to favorite ", error);
                })
            }
        });

    })
}

function isPresent(arr, ele) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === ele) {
            return true;
        }
    }
    return false;
}
