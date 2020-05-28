//PORT
process.env.PORT = process.env.PORT || 3000;

//NODE_ENV lo asigna heroku

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/restaurante';
} else {
    urlDB = 'mongodb+srv://vasquez:vasquez@restaurante-r8ni4.mongodb.net/test?retryWrites=true&w=majority';
}

//usar el urlDB.... crear cual enviroments
process.env.URLDB = urlDB;