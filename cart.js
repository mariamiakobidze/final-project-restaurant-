function Cart() {
    window.location.href = "./cart.html"
}
function Home() {
    window.location.href = "./index.html"
}
function burgerMenu() {
    window.location.href = "./menu.html"
}


let plius = document.querySelector(".plius")
let minus = document.querySelector(".minus")
let product = document.querySelector(".cardd")
fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
.then(pasuxi => pasuxi.json())
.then(data => {
    console.log(data);
    
    data.forEach(item => product.innerHTML += card(item))})


function card(item){
    let num = item.quantity
    function mimateba(item){
        num ++
    }
    function gamokleba(){
        if(num > 0){
            num--
        }
    }
    return  `<div class="card">
                <div class="cardleft">
                    <div class="x">
                        <i class="fa-solid fa-xmark"></i>
                        <i class="fa-solid fa-pencil"></i>
                    </div>
                    <div class="namim">
                        <img class="cardphoto" src="${item.product.image}" alt="">
                        <h1 class="cardh">${item.product.name}</h1>
                    </div>
                </div>
                <div class="cardright">
                    <div class="amount">
                        <button onclick="mimateba()" class="plus">+</button>
                        <h1 class="tith">${num}</h1>
                        <button onclick="gamokleba()" class="minus">-</button>
                    </div>
                    <h1 class="pricecart tith">$${item.price}</h1>
                    <h1 class="totalprice tith">$10</h1>
                </div>
            </div>`
}