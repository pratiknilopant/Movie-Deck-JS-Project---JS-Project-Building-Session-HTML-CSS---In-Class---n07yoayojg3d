let pageNumber;
let totalPages= 0;

let currentState = "desc"

const SORT_AES = "popularity.asc";
const SORT_DES = "popularity.desc";

const movieListSection = document.querySelector("#movie-list");
const nextBtn = document.querySelector("#next");
const backBtn = document.querySelector("#prev");
const pageNumberContainer = document.querySelector("#page-no");
const ratingToggle = document.querySelector("#rating-toggle");

const SORT_ASC_TEXT = "Sort by rating descending";
const SORT_DESC_TEXT = "Sort by rating ascending";

const SORT_ASC = "popularity.asc";
const SORT_DESC = "popularity.desc";

//search Input and button
const searchInput = document.getElementById("search-bar-input")
const searchButton = document.getElementById("search-bar-button")

searchButton.addEventListener("click", () => {
  const searchQuery = searchInput.value.trim(); 
  if (searchQuery != "") {
      pageNumber = 1;
      showMovies(pageNumber, currentState, searchQuery); 
  }else{
     showMovies(pageNumber, currentState, searchQuery)
  }
});

function addNavigationButtons() {
    nextBtn.addEventListener("click", ()=>{
        if(pageNumber<totalPages){
            pageNumber++;
            showMovies(pageNumber);
        }
    })
    
    backBtn.addEventListener("click", ()=>{
        if(pageNumber>1){
            pageNumber--;
            showMovies(pageNumber,currentState);
        
        }
    });
}

function addPopularityButton(){

    ratingToggle.addEventListener("click", (e)=>{
    currentState=currentState ==="desc"? "asc" : "desc";
    pageNumber = 1;
    showMovies(pageNumber, currentState);
    e.target.innerText = currentState ==="desc"? SORT_DESC_TEXT : SORT_ASC_TEXT;
     
});
}

async function showMovies(pageNumber =1, sort_by="desc", searchQuery=""){

  console.log(searchQuery)
    movieListSection.innerText = "";
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRjZDdiOGFiOGQ0NjFjOTk3NWE3YjI2NWY4NTExOSIsInN1YiI6IjY0ZDRlNjc5ZjQ5NWVlMDI5NDJlNzY4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TwgDJBJYxKGoGSmEOiX__wc4fUn3muJSKK4YCyGLYp0'
        }
      };
      let response;

      // `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${pageNumber}&sort_by=${
      //   sort_by === "asc" ? SORT_ASC : SORT_DESC
      // }`,
      response = await fetch(
// `        https://api.themoviedb.org/3/search/movie?query=Spider-Man:%20Across%20the%20Spider-Verse&api_key=7c4cd7b8ab8d461c9975a7b265f85119
// `
       `https://api.themoviedb.org/3/${searchQuery===""?"discover/movie?include_adult=false": "search/movie?query="+searchQuery}&language=en-US&page=${pageNumber}&sort_by=${
          sort_by === "asc" ? SORT_ASC : SORT_DESC
        }`,options 

        
      );

      const json = await response.json();
      totalPages = json.total_pages;

      const movieList = json.results;

      let movieFav = movieList[0].id;
      console.log(movieFav)




    console.log(movieList)

    //create elements
    for(let movie of movieList){
    const movieTitle = document.createElement("h2");
    movieTitle.innerText = movie.title;
    const rating = document.createElement("p");
    rating.innerText = movie.vote_average;
    const movieDetails = document.createElement("section");
    movieDetails.appendChild(movieTitle);
    movieDetails.appendChild(rating);
    movieDetails.classList.add("movie-details");
    let banner = document.createElement("img");
    banner.src = `https://image.tmdb.org/t/p/original//${movie.backdrop_path}`
    banner.classList.add("movie-poster");
    const footer = document.createElement("footer");
    const date = document.createElement("p");
    date.innerText=`date ${movie.release_date}`
    const heart = document.createElement("i");
    heart.classList.add("fa-regular", "fa-heart", "fa-2xl");


      let click = 0
      heart.addEventListener("click", (event) => {
    if (click % 2 === 0) {
        click++;
        heart.classList.remove("fa-regular", "fa-heart", "fa-2xl");
        heart.classList.add("fa-solid", "fa-heart", "like");
    } else {
        heart.classList.remove("fa-solid", "fa-heart", "like");
        heart.classList.add("fa-regular", "fa-heart", "fa-2xl");
        click++;
    }
    
    // Store the button state in localStorage
    const newState = click % 2 === 0 ? "solid" : "regular";
    localStorage.setItem("heartButtonState", newState);
});

// When the page loads
document.addEventListener("DOMContentLoaded", function() {
    const storedState = localStorage.getItem("heartButtonState");
    if (storedState === "solid") {
        heart.classList.remove("fa-regular", "fa-heart", "fa-2xl");
        heart.classList.add("fa-solid", "fa-heart", "like");
        click = 1;
    } else {
        heart.classList.remove("fa-solid", "fa-heart", "like");
        heart.classList.add("fa-regular", "fa-heart", "fa-2xl");
        click = 0;
    }
});






    footer.appendChild(date);
    footer.appendChild(heart); 

    //parent 
    const movieElement = document.createElement("article");

    movieElement.classList.add("movie");
    movieElement.appendChild(banner);
    movieElement.appendChild(movieTitle)
    movieElement.appendChild(footer)
    movieListSection.appendChild(movieElement);
    pageNumberContainer.innerText = pageNumber;
}
}

async function init() {
  pageNumber = 1;
   await showMovies(1);
   addNavigationButtons();
   addPopularityButton();
}

init();





  // let wishList =  [];

  // function setup(){
  //   console.log("Window Loaded")
  //   const products =document.querySelectorAll(".but");

  // }
  // function addItem(){

  // }
  // function RemoveItem(){

  // }
  // window.addEventListener("load", setup);
