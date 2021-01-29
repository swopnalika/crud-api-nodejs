const productStore = require('../store/store')
const getProducts = (req, res, next) => {
    res.status(200).json({
        productStore
    })
}
const createProducts = (req, res, next) => {
    const { name, sid, price } = req.body;

    productStore.push({ name, sid, price })
    res.status(200).json(productStore);
}

const deleteProducts = (req, res, next) => {
    const { name, sid, price } = req.body;

    productStore.pop({ name, sid, price })
    res.status(200).json(productStore);
}

const updateProducts = (req, res, next) => {
    const { name, sid, price } = req.body;

    productStore.forEach(elements => {
        if (elements.sid == sid) {
            elements.name = name;
            elements.price = price;
        }
    })
    res.status(200).json(productStore);
}

module.exports = getProducts;
module.exports = createProducts;
module.exports = deleteProducts;
module.exports = updateProducts;