const express = require("express");
const { faker } = require("@faker-js/faker");

const app = express();
const port = 3000;

app.get("/", (request, response) => {
    response.send("Hola mi server en express");
});

app.get("/nueva-ruta", (request, response) => {
    response.send("Hola soyy una nueva ruta o end-point");
});
app.get("/products", (request, response) => {
	const { size } = request.query;
	const limit = size || 10;

    const products = [];
    for (let i = 0; i < limit; i++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
        })

    }
    response.json(products);
});

app.get("/products/filter", (request, response) => {
	response.send("Yo soy un filter");
})

app.get("/products/:id", (request, response) => {
    const { id } = request.params;
    response.json({
        id,
        name: "Product 1",
        price: 1000
    });
});



app.get("/categories/:categoryId/products/:productsId", (request, response) => {
    const { categoryId, productsId } = request.params;
    response.json({
        categoryId,
        productsId,
        name: "Product 2",
        price: 2000
    })
})

app.get("/users", (request, response) => {
    const { limit, offset } = request.query;
    if ( limit && offset ) {
        response.json({
            limit,
            offset
        })
    }
    else {
        response.send("No hay parametros");
    }
})


app.listen(port, () => {
    console.log("Mi port es: " + port);
})
