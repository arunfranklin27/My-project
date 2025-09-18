const searchInput = document.querySelector('#searchInput');
const resultsList = document.querySelector('#results');
const searchButton = document.querySelector("#searchButton");

// 🔑 Replace with your Spoonacular API key
const API_KEY = "1f6d9541502b4e2c9d2fe34f6e9d1b01";

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  searchRecipes();
});

// allow Enter key
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchRecipes();
  }
});

async function searchRecipes() {
  const searchValue = searchInput.value.trim();
  if (!searchValue) {
    resultsList.innerHTML = "<li>Please enter a food or ingredient.</li>";
    return;
  }

  try {
    // ✅ Spoonacular Recipe Search Endpoint
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&number=10&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      resultsList.innerHTML = "<li>No recipes found. Try another ingredient.</li>";
      return;
    }

    displayRecipes(data.results);
  } catch (error) {
    resultsList.innerHTML = "<li>⚠️ Error fetching recipes. Try again later.</li>";
    console.error(error);
  }
}

function displayRecipes(meals) {
  let html = '';
  meals.forEach((meal) => {
    html += `
      <li class="recipe-item">
        <div>
          <img src="${meal.image}" alt="${meal.title}">
          <h3>${meal.title}</h3>
        </div>
        <div class="recipe-link">
          <a href="https://spoonacular.com/recipes/${meal.title.replace(/\s+/g, "-")}-${meal.id}" 
             target="_blank">View Recipe</a>
        </div>
      </li>
    `;
  });
  resultsList.innerHTML = html;
}
