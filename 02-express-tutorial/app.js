const express = require('express');
const app = express();
const { products } = require('./data');

app.use(express.static('./public'));

app.get('/api/v1/test', (req, res) => {
  res.json({ message: 'It worked!' });
});

app.get('/api/v1/products', (req, res) => {
  res.json(products);
});

app.get('/api/v1/products/:productID', (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find(p => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: 'That product was not found' });
  }

  return res.json(product);
});

app.get('/api/v1/query', (req, res) => {
  const { search, limit, priceLimit } = req.query;
  let foundedProducts = [...products];

  if (search) {
    foundedProducts = foundedProducts.filter(product => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    foundedProducts = foundedProducts.slice(0, parseInt(limit));
  }

  if (priceLimit) {
    foundedProducts = foundedProducts.filter(product => {
      return product.price <= parseInt(priceLimit);
    });
  }

  if (foundedProducts.length < 1) {
    return res.status(200).json({ sucess: true, data: [] });
  }
  res.status(200).json(foundedProducts);
});

app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000....');
});
