function Cart() {
    window.location.href = "./cart.html"
}
function Home() {
    window.location.href = "./index.html"
}
function burgerMenu() {
    window.location.href = "./burgermenu.html"
}


let allProducts = document.querySelector("section")
let ul = document.querySelector("ul")
let sicxare = document.querySelector("#sicxare");
let nuts = document.querySelector("#nuts");
let vegan = document.querySelector("#vegan");

function GetAll() {
    allProducts.innerHTML = ""
    fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
    .then(pasuxi => pasuxi.json())
    .then(data => {
        console.log(data);
        
        data.forEach(item => allProducts.innerHTML += card(item))})
    .catch(()=> allProducts.innerHTML = '')
}

GetAll()

fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
.then(pasuxi => pasuxi.json())
.then(data => data.forEach(item => ul.innerHTML += `<button class="li" onclick="getFoods(${item.id})"> ${item.name} </button>`))


function getFoods(id) {
    allProducts.innerHTML = ""
    fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
        .then(pasuxi => pasuxi.json())
        .then(data => data.products.forEach(item => allProducts.innerHTML += card(item)))
}


function noreload(e) {
    e.preventDefault()
}
function filter() {
    let spicines;
    if (sicxare.value == "-1") {
      spicines = "";
    } else {
      spicines = sicxare.value;
    }
  
    fetch(
      `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegan.checked}&nuts=${nuts.checked}&spiciness=${spicines}`
    )
      .then((pasuxi) => pasuxi.json())
      .then((finalData) => {
          allProducts.innerHTML = ""
          if( finalData.length == 0 ) {
              section.innerHTML = ` ` 
          }
          else {
              finalData.forEach((food) => (allProducts.innerHTML += card(food)));
          }
        
      });
  }

function card(item) {
    let nut
    let veg
    if(item.nuts){
        nut = 'checked'
    }
    else{
        nut = ''
    }
    if(item.vegeterian){
        veg = 'checked'
    }
    else{
        veg = ''
    }
    return `<div class="card">
        <img 
          src="${item.image}"/>
        <div class="card-content">
          <h3>${item.name}</h3>
          <p>Spiciness: 2</p>
          <div class="badges">
            <span class="badge">Nuts <i class="fa-solid fa-${item.nuts ?'check' : 'x'}"></i></span>
            <span class="badge">Vegetarian <i class="fa-solid fa-${item.vegeterian ?'check' : 'x'}"></i></span>
          </div>
          <div class="card-footer">
            <span class="price">${item.price}$</span>
            <button class="add-to-cart">Add to cart</button>
          </div>
        </div>
      </div>
      `;
    }
    
function addto(event, id) {
    
    event.preventDefault()
    
    let formData = new FormData(event.target)
    let finalForm = Object.fromEntries(formData)

    finalForm.id = id

    fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
        method: "POST",
        headers: {
            accept: "*/*",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(finalForm)
    }).then( pasuxi =>  pasuxi.text(finalForm))
    .then( data => console.log(data) )
}