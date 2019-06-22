const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors')



const app = express();


/** API path that will upload the files */

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))



// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//routes
 app.use("/keycloak",require('./populate/router'))
// app.use("/api/category",require('./server/category/categoryRouter'))
// app.use("/api/quiz",require('./server/question/questionRouter'))
// app.use("/api/user",require('./server/user/userRouter'))






app.listen(5000, () => console.log('Server started on http://localhost:5000'));
