const express = require('express')
const createError = require('http-errors')
const path = require('path')
const logger = require('morgan')

const app = express()
const port = 3000

// ? Server Static
app.use(logger('dev'));
app.use('/', express.static(path.join(__dirname, 'public')))


// ? Template Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// * Dashboard
app.get('/', (req, res, next) => {
    res.status(200)
    res.render('index')
})

// ! Handling Error
app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {    
    res.status(err.status || 500)
    res.render('error')
})

app.listen(port, () => {
    console.log(`Forbear app listening on port ${port}`)
})

module.exports = app;