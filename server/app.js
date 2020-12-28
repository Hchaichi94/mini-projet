var express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
var path = require('path');
require('./db/db')

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());


app.use('/uploads', express.static(path.join('uploads')));

//routes
app.use('/file', require('./routes/fileRoute'));



const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server started on port ${port}`))

module.exports = app;