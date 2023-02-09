const express = require('express')
const app = express()

let path = require('path')
let ejs = require('ejs');



// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register view engine
app.set('view engine', 'ejs')
// setup static,css,js
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/assets/css'))
app.use('/images', express.static(__dirname + 'public/assets/images'))
app.use('/fontawesome', express.static(__dirname + 'public/assets/fontawesome'))

// define port 
const port = process.env.PORT || 4444;

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/post', (req, res) => {
  res.render('post')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

// app.get('/blank', (req, res) => {

//   res.render('')
// })

app.listen(port, (req, res) => {
  console.log(`Xtra BLOG listening at http://localhost:${port} pid is ${process.pid} `)
})

