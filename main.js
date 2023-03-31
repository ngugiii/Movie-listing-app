const apiURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=46d52b6ae02c3ca59aacdf8fd6d3c277&page=1";
const searchAPI = "https://api.themoviedb.org/3/search/movie?&api_key=46d52b6ae02c3ca59aacdf8fd6d3c277&query=";
const imgPATH = "https://image.tmdb.org/t/p/w1280";

let moviesDiv = document.querySelector(".movies");
let form = document.querySelector("form");
let input = document.querySelector(".search");

async function getMovies(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    displayMovies(data.results);
}

function displayMovies(movies){
    let output="";
    movies.forEach((movie)=>{
        output+=
        `
        <div class="movie">
            <img src="${imgPATH + movie.poster_path}" alt="">
            <div class="details">
              <h2 class="title">${movie.title}</h2>
              <p class="rate">Rating: <span class="rating"> ${movie.vote_average} </span></p>
              <p class="overview">${movie.overview}</p>
            </div>
          </div> 
        `
    })
    moviesDiv.innerHTML = output;
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    moviesDiv.innerHTML="";

    const inputVal = input.value;

    if(inputVal){
        getMovies(searchAPI + inputVal);
        input.value="";
    }
    
})
getMovies(apiURL);
