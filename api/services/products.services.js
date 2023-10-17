const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");


class ProductsServices {
    constructor() {
        this.products = [];
        this.generate();
    }

    async generate() {
        for (let i = 0; i < 100; i++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.url(),
                isBLock: faker.datatype.boolean(),
            })
        }
    }

    async create(data) {
        const newProduct = {
            id: faker.string.uuid(),
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    }


    async find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products);
            }, 2000)
        });
    }


    async findOne(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw boom.notFound("Product not Found");
        }
        if (product.isBLock) {
            throw boom.conflict("Product is block");
        }
        else {
            return product;
        }
    }


    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("Product not found");
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index];

    }


    async delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("Product not Found");
        } else {
            this.products.splice(index, 1);
            return { id }
        }
    }
}

module.exports = ProductsServices;
