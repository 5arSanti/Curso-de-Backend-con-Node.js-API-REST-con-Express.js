const express = require("express");
const ProductsServices = require("../services/products.services")

const router = express.Router();
const service = new ProductsServices();

router.get("/", async (request, response) => {
    const products = await service.find()
    response.json(products);
});


router.get("/filter", (request, response) => {
	response.send("Yo soy un filter");
})


router.get("/:id", async (request, response, next) => {
    try {
        const { id } = request.params;
        const product = await service.findOne(id);
        response.status(200).json(product)
    }
    catch (err) {
        next(err);
    }

});


router.post("/", async (request, response) => {
    const body = request.body;
    const newProduct = await service.create(body)
    response.status(201).json(newProduct);
})

router.patch("/:id", async (request, response, next) => {
    try {
        const body = request.body;
        const { id } = request.params;
        const product = await service.update(id, body);

        response.json(product)
    }
    catch (err) {
        next(err);
    }
})


router.delete("/:id", async (request, response) => {
    const { id } = request.params;
    const rta = await service.delete(id);

    response.json(rta);
})

module.exports = router;
