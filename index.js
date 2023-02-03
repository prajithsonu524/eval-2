const express = require('express');
const app = express();
const port = 3000;
const router = require('./src/routes/company');
app.use(express.json());
app.use(router);
app.listen(port, () => {
    console.log(`port listening on ${port}`);

});