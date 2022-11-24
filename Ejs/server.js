const express = require('express');
const Productos = require('./productos');

const app = express();
const productos = new Productos();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('form', {})
})

app.get('/productos', (req, res) => {
  const products = productos.getProducts();
  const hayProductos = products.length > 0 ? true : false;
  res.render('productos', { products, hayProductos })
})

app.post('/productos', (req, res) => {
  const newProduct = req.body;
  productos.setProduct(newProduct);
  res.redirect('/productos');
})

app.listen(8080, () => { console.log('Server ready'); });