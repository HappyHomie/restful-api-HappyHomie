const ProductRef = require("../models/product.model");
// Async
const { log } = require("../middleware/logger");

// Get all products
/* exports.getAllProducts = function(req, res) {
  ProductRef.get().then(docs => {
    const results = [];
    docs.forEach(doc => results.push(doc.data()));
    res.json(results);
  });
}; */

// Get all products ASYNC
exports.getAllProducts = async function(req, res) {
  try {
    const results = [];
    const docs = await ProductRef.get();
    docs.forEach(doc => results.push(doc.data()));
    res.json(results);
  } catch (error) {
    res.status(500).end();
    log.error(error.stack);
  }
};

// Get product
/* exports.getSingleProduct = function(req, res) {
  ProductRef.where("sku", "==", req.params.sku)
    .get()
    .then(docs => {
      docs.forEach(doc => res.json(doc.data()));
    });
}; */

// Get product ASYNC
exports.getSingleProductAsync = async function(req, res) {
  try {
    const docs = await ProductRef.where("sku", "==", req.params.sku)
      .limit(1)
      .get();
    docs.forEach(doc => res.json(doc.data()));
  } catch (error) {
    res.status(500).end();
    log.error(error.stack);
  }
};

// Delete
/* exports.deleteProduct = function(req, res) {
  ProductRef.where("sku", "==", req.params.sku)
    .get()
    .then(docs => {
      docs.forEach(doc => doc.ref.delete());
    })
    .catch(err => res.status(500).json({ message: err }));
  res.status(204).end();
}; */

// Delete ASYNC
exports.deleteProduct = async function(req, res) {
  try {
    const docs = await ProductRef.where("sku", "==", req.params.sku).get();
    docs.forEach(doc => doc.ref.delete());
  } catch (error) {
    res.status(500).json({ message: error });
    log.error(error.stack);
  }
  res.status(204).end();
};

// Update
exports.updateProduct = function(req, res) {
  if (req.fields.price) {
    req.fields.price = parseFloat(req.fields.price);
  }
  if (req.fields.weight) {
    req.fields.weight = parseFloat(req.fields.weight);
  }
  ProductRef.where("sku", "==", req.params.sku)
    .get()
    .then(docs => {
      docs.forEach(doc =>
        doc.ref
          .update({ ...req.fields })
          .get()
          .then(doc => res.status(202).json(doc.data()))
      );
    });
};

// Update Async
/* exports.updateProduct = async function(req, res) {
  try {
    if (req.fields.price) {
      req.fields.price = parseFloat(req.fields.price);
    }
    if (req.fields.weight) {
      req.fields.weight = parseFloat(req.fields.weight);
    }
    try {
      const docs = await ProductRef.where("sku", "==", req.params.sku).get();
      docs.forEach(async doc => {
        doc.ref.update({ ...req.fields });
        const result = await doc.ref.get();
        res.json(result.data());
      } catch (error) {
        log.error(error.stack);
        res.status(500).end();
      }
      
  } catch (error) {
    log.error(error.stack);
    res.status(500).end();
  }
}; */

// Add/Create
/* exports.createProduct = function(req, res) {
  req.fields.price = parseFloat(req.fields.price);
  req.fields.weight = parseFloat(req.fields.weight);
  ProductRef.add({ ...req.fields })
    .then(ref => {
      ref.get().then(doc => res.status(201).json(doc.data()));
    })
    .catch(error => res.json(error));
}; */
// ASYNC Create
exports.createProduct = async function(req, res) {
  try {
    req.fields.price = parseFloat(req.fields.price);
    req.fields.weight = parseFloat(req.fields.weight);
    const ref = await ProductRef.add({ ...req.fields });
    const doc = await ref.get();
    res.status(201).json(doc.data());
  } catch (error) {
    log.error(error.stack);
    res.status(500).end();
  }
};
