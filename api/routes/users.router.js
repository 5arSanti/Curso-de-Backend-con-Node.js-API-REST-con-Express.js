const express = require("express");
const ProductsServices = require("../services/products.services");

const router = express.Router();
const service = new ProductsServices;

router.get("/", (request, response) => {
    const users = service.find();
    response.json(users);
})

router.get("/:id", (request, response) => {
    const { id } = request.params;
    const user = service.findOne(id);
    response.status(200).json(user);
});

router.post("/", (request, response) => {
    const body = request.body;
    const newProduct = service.create(body)
    response.status(201).json(newProduct);
})

router.patch("/:id", (request, response) => {
    const body = request.body;
    const { id } = request.params;
    const product = service.update(id, body);

    response.json(product)
})


router.delete("/:id", (request, response) => {
    const { id } = request.params;
    const rta = service.delete(id);

    response.json(rta);
})

module.exports = router;
