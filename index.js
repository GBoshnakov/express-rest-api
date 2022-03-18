const express = require('express');
const mongoose = require('mongoose');
const catalogController = require('./controllers/furniture');
const userController = require('./controllers/users');
const cors = require('./middlewares/cors');


start();

async function start() {
    try{
        await mongoose.connect('mongodb://localhost:27017/furnitures', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected');
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use('/data/catalog', catalogController);
    app.use('/users', userController);


    app.get('/', (req, res) => {
        res.send('Some info about this rest api');
    })

    app.listen(3030, () => console.log('Server listening on port 3030'));
}


