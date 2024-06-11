let div = document.querySelector(".products");

// Fetch the products
async function fetchProducts(){
    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();
    if(products.length === 0){
        div.innerHTML = "";
        div.innerHTML += `<p>Parece que no hay productos disponibles. Considera agregar alguno.</p>`;
    }else {
        renderProducts(products);
    }
}
fetchProducts();

// Renders the products on screen
function renderProducts(products){
    div.innerHTML = "";
    for(let product of products){
        if(product.id === 6){
            div.innerHTML += `
                <div class="card" data-id=${product.id}>
                <img src="${product.image}" alt="" width="100px" height="100px">
                <span>${product.name}</span>
                <span>${product.price}</span>
                <button>Delete</button>
                </div>`;
            document.querySelector(".send").setAttribute("disabled", true);
            let para = document.createElement("p");
            para.innerHTML = "Has llegado al límite de productos, considera eliminar y refrescar"
            document.querySelector(".form-container").appendChild(para);
        }else {
            div.innerHTML += `
                <div class="card" data-id=${product.id}>
                <img src="${product.image}" alt="" width="100px" height="100px">
                <span>${product.name}</span>
                <span>${product.price}</span>
                <button>Delete</button>
                </div>`
        }
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
    let deleteProduct = await fetch(`http://localhost:3000/products/${e.target.parentElement.dataset.id}`, {
        method: "DELETE",
    });
    await deleteProduct.json();
    fetchProducts();
})
