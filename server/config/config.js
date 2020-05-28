//PORT
process.env.PORT = process.env.PORT || 3000;

//====== venvimiento de TOKEN==========
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//======SEED de authentication=========
process.env.SEED = process.env.SEED || 'seed-de-desarrollo';



//NODE_ENV lo asigna heroku

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/restaurante';
} else {
    urlDB = process.env.MONGO_URL;
}

//usar el urlDB.... crear cual enviroments
process.env.URLDB = urlDB;


//GOOGLE CLIENT_ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '972133091454-6mun421hg1ci3lq3o6fc7auatrtj91up.apps.googleusercontent.com';