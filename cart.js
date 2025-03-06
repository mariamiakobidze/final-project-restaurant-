function Cart() { 
    window.location.href = "./cart.html";
}
function Home() {
    window.location.href = "./index.html";
}
function burgerMenu() {
    window.location.href = "./burgermenu.html";
}


let productTableBody = document.querySelector(".cart-body");
let totalPriceSpan = document.querySelector(".pricespan");

function getAllCart() {
    fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then(response => response.json())
    .then(data => {
        let prices = data.map(item => item.product.price * item.quantity);
        
        if (prices.length > 0) {
            let total = prices.reduce((prev, current) => prev + current);
            totalPriceSpan.innerHTML = "$" + total.toFixed(2);
        } else {
            totalPriceSpan.innerHTML = "$0";
        }

        productTableBody.innerHTML = data.map(item => cartRow(item)).join('');
    });
}

getAllCart();

function cartRow(item) {
    return `
    <tr>
        <td>
            <img src="${item.product.image}" alt="${item.product.name}">
        </td>
        <td>${item.product.name}</td>
        <td>
            <div class="qty-box">
                <button onclick="updateQuantity(${item.product.id}, ${item.product.price}, 1)">+</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.product.id}, ${item.product.price}, -1)">-</button>
            </div>
        </td>
        <td>$${item.product.price.toFixed(2)}</td>
        <td>$${(item.product.price * item.quantity).toFixed(2)}</td>
        <td>
            <button class="remove-btn" onclick="removeItem(${item.product.id})">Remove</button>
        </td>
    </tr>`;
}

function updateQuantity(productId, price, change) {
    fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then(response => response.json())
    .then(data => {
        let item = data.find(item => item.product.id === productId);
        let newQuantity = item.quantity + change;

        if (newQuantity <= 0) {
            removeItem(productId);
        } else {
            let cartinfo = {
                "quantity": newQuantity,
                "price": price,
                "productId": productId
            };

            fetch('https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket', {
                method: 'PUT',
                headers: {
                    accept: '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartinfo)
            })
            .then(response => response.text())
            .then(() => {
                getAllCart();
            });
        }
    });
}

function removeItem(id) {
    fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
            accept: '*/*'
        }
    })
    .then(response => response.text())
    .then(() => {
        getAllCart();
    });
}