let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Shirt + Trousers model 1',
        tag: 'special1',
        price: 59.99,
        inCart: 0
    },
    {
        name: 'Green shirt',
        tag: 'special2',
        price: 49.99,
        inCart: 0
    },
    {
        name: 'Shirt + Trousers model 2',
        tag: 'special3',
        price: 39.99,
        inCart: 0
    },
    {
        name: 'Shirt + Trousers model 3',
        tag: 'special4',
        price: 29.99,
        inCart: 0
    },
    {
        name: 'Grey T-Shirt',
        tag: 'clothes1',
        price: 59.99,
        inCart: 0
    },
    {
        name: 'Black an White Shirt',
        tag: 'clothes2',
        price: 49.99,
        inCart: 0
    },
    {
        name: 'Grey Hoddie',
        tag: 'clothes3',
        price: 39.99,
        inCart: 0
    },
    {
        name: 'Black Hoddie',
        tag: 'clothes4',
        price: 29.99,
        inCart: 0
    },
    {
        name: 'Blue and White Hoddie',
        tag: 'clothes5',
        price: 59.99,
        inCart: 0
    },
    {
        name: 'Mushroom Shirt',
        tag: 'clothes6',
        price: 49.99,
        inCart: 0
    },
    {
        name: 'Cats Shirt',
        tag: 'clothes7',
        price: 39.99,
        inCart: 0
    },
    {
        name: 'Basic Shirt',
        tag: 'clothes8',
        price: 29.99,
        inCart: 0
    },
    {
        name: 'Duck Sweetshirt',
        tag: 'clothes9',
        price: 59.99,
        inCart: 0
    },
    {
        name: 'Black Shirt with details',
        tag: 'clothes10',
        price: 49.99,
        inCart: 0
    },
    {
        name: 'Light Blue Jacket',
        tag: 'clothes11',
        price: 39.99,
        inCart: 0
    },
    {
        name: 'Basic Jacket',
        tag: 'clothes12',
        price: 29.99,
        inCart: 0
    },

]


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {

        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);


    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }



    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function totalCost(product) {
    //console.log("the product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost)


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">                    
                <ion-icon class "CartRemove" name="close-circle-outline"></ion-icon>
                <img src="../images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
                <ion-icon name="caret-back-circle-outline"></ion-icon>      
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price}
            </div>


            `
        });
        /*Left to do remove button, + - button - no idea research*/

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Total
                 </h4>
                 <h4 class="basketTotal">
                    $${cartCost}
                 </h4>
`

    }
}




onLoadCartNumbers();
displayCart();