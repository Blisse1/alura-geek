const div = document.querySelector(".products");
fetchProducts();

// Fetch the products
async function fetchProducts(){
    const sendButton = document.querySelector(".send"); 
    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();
    if(products.length === 0){
        div.innerHTML = "";
        div.innerHTML += `<p>Parece que no hay productos disponibles. Considera agregar alguno.</p>`;
    }else if(products.length === 6){
        renderProducts(products);
        sendButton.setAttribute("disabled", true);
        sendButton.setAttribute("class", "disabled-color");
        let para = document.createElement("p");
        para.innerHTML = "Has llegado al límite de productos, considera eliminar alguno.";
        document.querySelector(".form-container").appendChild(para);
    }else if(products.length < 6){
        renderProducts(products);
        let btn = document.querySelector(".disabled-color");
        btn.setAttribute("class", "send");
        btn.removeAttribute("disabled");
        let para = document.querySelector("p");
        para.remove();
    }
}

// Renders the products on screen
function renderProducts(products){
    div.innerHTML = "";
    for(let product of products){
        div.innerHTML += `
            <div class="card" data-id=${product.id}>
            <img src="${product.image}" alt="" width="150px" height="150px">
            <span>${product.name}</span>
            <span>$${product.price}</span>
            <button class="delete">Delete</button>
            </div>`;
    }
}

// Add new products
document.querySelector("form").addEventListener("submit", async () => {
    let name = document.querySelector("#name").value;
    let price = document.querySelector("#price").value;
    let image = document.querySelector("#image").value;
    let createProduct = await fetch("http://localhost:3000/products/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            price: price,
            image: image,
        })
    });
    let response = await createProduct.json();
    renderProducts(response);
})


// Delete product
div.addEventListener("click", async(e) => {
    e.preventDefault();
    let deleteProduct = await fetch(`http://localhost:3000/products/${e.target.parentElement.dataset.id}`, {
        method: "DELETE",
    });
    await deleteProduct.json();
    fetchProducts();
})
