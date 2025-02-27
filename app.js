
let mobileNav = document.querySelector(".mobileNav");
function showHide() {
  mobileNav.classList.toggle("showHide");
}

let section = document.querySelector("section");
let sicxare = document.querySelector("#sicxare");
let nuts = document.querySelector("#nuts");
let vegan = document.querySelector("#vegan");
let categoriesList = document.querySelector("#categoriesList");

function card(item) {
  return `
<div class="card">
    <img 
      src="${item.image}"/>
    <div class="card-content">
      <h3>${item.name}</h3>
      <p>Spiciness: 2</p>
      <div class="badges">
        <span class="badge">${item.nuts}</span>
        <span class="badge">${item.vegetarian}</span>
      </div>
      <div class="card-footer">
        <span class="price">${item.price}$</span>
        <button class="add-to-cart">Add to cart</button>
      </div>
    </div>
  </div>
  `;
}


function getAll() {
  section.innerHTML = "";
  fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        section.innerHTML += card(item);
      });
    })
    .catch(() => (section.innerHTML = "კავშირის პრობლემა"));
}


function filter() {
  let spicines = sicxare.value === "-1" ? "" : sicxare.value;

  fetch(
    `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegan.checked}&nuts=${nuts.checked}&spiciness=${spicines}`
  )
    .then((response) => response.json())
    .then((finalData) => {
      section.innerHTML = "";
      if (finalData.length === 0) {
        section.innerHTML = "";
      } else {
        finalData.forEach((item) => {
          section.innerHTML += card(item);
        });
      }
    })
    .catch(() => (section.innerHTML = "Error fetching data"));
}

function Reset() {
  section.innerHTML = "";
  fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        section.innerHTML += card(item);
      });
    })
    .catch(() => (section.innerHTML = "კავშირის პრობლემა"));
}

function getFoods(id) {
  section.innerHTML = "";
  fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
    .then((response) => response.json())
    .then((data) => {
      data.products.forEach((item) => {
        section.innerHTML += card(item);
      });
    })
    .catch(() => (section.innerHTML = "Error fetching category data"));
}


getAll();


fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      categoriesList.innerHTML += `<li onclick="getFoods(${item.id})">${item.name}</li>`;
    });
  })
  .catch(() => console.log("Error fetching categories"));
