const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const timestamp = require('time-stamp');

const myConnection = require('express-myconnection');

const app = express();

const usuariosRoutes = require('./routes/usuarios');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'cuestionario'
}, 'single'))
app.use(express.urlencoded({extended: false}));

app.use('/', usuariosRoutes);

app.get('/nuevoUser', (req, res) => {
    res.render('nuevoUsuario');
});

app.get('/nuevoQuiz', (req, res) => {
    res.render('nuevoQuiz');
});

app.get('/logAlumno', (req, res) => {
    res.render('loginAlumno');
});

app.get('/verCal', (req, res) => {
    res.render('buscaAlumno');
});

//static files
app.use(express.static(path.join(__dirname,'public')));

//string the server
app.listen(app.get('port'), () => {
    console.log('server on port 3000');
});