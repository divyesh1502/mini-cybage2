$(document).ready(function () {

    $("#searchForm").submit((e) => {
  
      e.preventDefault();
  
      var searchInput = document.getElementById("searchInput").value;
      console.log(searchInput);
  
      axios.get(`http://localhost:3000/movies?title=${searchInput}`)
        .then((res) => {
          console.log(res.data);
  
          var songsHtml = '';
  
          res.data.forEach(element => {
            songsHtml += `<li>
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
                    </div>`
          });
  
          $("#resultsContainer").html(songsHtml);
        })
        .catch(e => {
          console.log("Error", e);
        })
  
      axios.get(`http://localhost:3000/tvShows?title=${searchInput}`)
        .then((res) => {
          console.log(res.data);
  
  
          var tvshowHtml = '';
  
          res.data.forEach(element => {
            tvshowHtml += `<li>
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
                  </div>`
          });
  
          $("#resultsContainer").html(tvshowHtml);
        })
        .catch(e => {
          // console.log("Error", e);
        })
  
    })
  
  
  })
  
  