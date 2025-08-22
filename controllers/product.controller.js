const Product = require('../models/product.model.js');

const getProducts = async (req, res) => {
    try {

        let  {priceRange, search, sortOrder, sortBy, limit, page } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        let query = {};

        if (search) {
            query.name = {$regex: search, $options: "i"};
        }

        //Price Range Like 100-50
        if (priceRange) {
            const [min, max] = priceRange.split("-").map(Number);
            query.price = {};
            if (!isNaN(min)) query.price.$gte = min;
            if (!isNaN(max)) query.price.$lte = max;
        }

        //sorting
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
        } else {
            sortOptions = {createdAt: -1}
        }

        const products = await Product.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments(query);
        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            limit,
            products
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

const addProduct = async (req, res) => {
    try {

        const product = await Product.create(req.body);
        res.status(201).json(product)
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addProduct
};