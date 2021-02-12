let itemName = (item) => item.strMeal;
let itemImage = (item) => item.strMealThumb;

function dataCrawler() {
  childRemover("dishes");
  let searchItem = document.getElementById("search-item");
  let query = searchItem.value;
  let apiLink = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query;
  searchItem.value = "";
  fetch(apiLink)
    .then((response) => response.json())
    .then((json) => process(json));
}

function process(dump) {
  items = dump.meals;
  if (items == null) {
    alert("You can't cook that buddy :-(");
  } else {
    const itemList = document.getElementById("dishes");
    for (let i = 0; i < items.length; i++) {
      let dishAnchor = document.createElement("a");
      dishAnchor.setAttribute("onclick", `recipeBuilder(${i})`);
      dishAnchor.setAttribute("class", "dish");
      dishAnchor.setAttribute("href", "#");

      let dishImage = document.createElement("img");
      dishImage.setAttribute("src", itemImage(items[i]));
      dishImage.setAttribute("class", "dish-image");
      dishAnchor.appendChild(dishImage);

      let dishName = document.createElement("p");
      dishName.innerText = itemName(items[i]);
      dishName.setAttribute("class", "dish-name");
      dishAnchor.appendChild(dishName);

      itemList.appendChild(dishAnchor);
    }
  }
}

function recipeBuilder(i) {
  document.getElementById("dishes").style.display = "none";
  document.getElementById("search-bar").style.display = "none";
  document.getElementById("recipe").style.display = "block";
  const recipeCard = document.createElement("a");
  recipeCard.setAttribute("href", "#");
  recipeCard.setAttribute("onclick", "searchMore()");
  let dishImage = document.createElement("img");
  dishImage.setAttribute("src", itemImage(items[i]));
  recipeCard.appendChild(dishImage);
  let dishName = document.createElement("h2");
  dishName.innerText = itemName(items[i]);
  recipeCard.appendChild(dishName);
  let title = document.createElement("h4");
  title.innerText = "Ingredients";
  recipeCard.appendChild(title);
  let ingredientList = document.createElement("ul");
  let ingredientCollection = ingredientFinder(i);
  ingredientCollection.map((ingredient) => {
    let ingredientItem = document.createElement("li");
    ingredientItem.innerText = ingredient;
    ingredientList.appendChild(ingredientItem);
  });
  recipeCard.appendChild(ingredientList);
  const recipePage = document.getElementById("recipe");
  recipePage.appendChild(recipeCard);
}

function ingredientFinder(i) {
  item = items[i];
  let ingredientList = [];
  for (let j = 1; j < 21; j++) {
    let ingredientCounter = `strIngredient${j}`;
    if (item[ingredientCounter] == "") {
      return ingredientList;
    } else {
      ingredientList.push(item[ingredientCounter]);
    }
  }
}

function searchMore() {
  document.getElementById("recipe").style.display = "none";
  document.getElementById("dishes").style.display = "block";
  document.getElementById("search-bar").style.display = "block";
  const recipePage = document.getElementById("recipe");
  if (recipePage.hasChildNodes()) {
    recipePage.removeChild(recipePage.childNodes[0]);
  }
}

function childRemover(section) {
  const itemList = document.getElementById(section);
  for (let j = 0; itemList.hasChildNodes(); j++) {
    itemList.removeChild(itemList.childNodes[0]);
  }
}
