const express = require("express");

const router = express.Router();

router.get("/:categoryId/products/:productsId", (request, response) => {
    const { categoryId, productsId } = request.params;
    response.json({
        categoryId,
        productsId,
        name: "Product 2",
        price: 2000
    })
})

module.exports = router;
