const express = require('express');
const cors = require('cors');

const receiptRoute = require('./api/send-invoice');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api',receiptRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Nexcentauri Backend Runing on port ${PORT}`);
});

module.exports = app;