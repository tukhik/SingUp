const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const UsersCollection = require("./mongodb")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const templatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.static(publicPath))


app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/home', (req, res) => {
    res.render('home')
})
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/profile', (req, res) => {
    res.render('profile')
})



app.post('/signup', async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password
  }
  const checking = await UsersCollection.findOne({ name: req.body.name })
   try{
    console.log(checking, 'checking');
    console.log(req.body, 'req.body');
    if (checking) {
      res.send("user details already exists")
    }
    else{
      await UsersCollection.insertMany([data])
    }
   }
   catch(e) {
    res.send("wrong inputs")
   }
  res.status(201).render("profile", {
    naming: req.body.name
  })
})


app.post('/login', async (req, res) => {
  try {
    const check = await UsersCollection.findOne({ name: req.body.name })
    if (check.password === req.body.password) {
      res.status(201).render("profile", { naming: req.body.name })
    }
    else {
      res.send("incorrect password")
    }
  }
  catch (e) {
    res.send("wrong details")
  }
})

app.listen(port, () => {
    console.log('port connected');
})