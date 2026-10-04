const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000
const mongoDB = require("./db")

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require("./Routes/CreateUser.js"));
app.use('/api', require("./Routes/DisplayData.js"));
app.use('/api', require("./Routes/OrderData.js"));
const startServer = async () => {
  await mongoDB();

  app.get('/', (req, res) => {
    res.send('Hello World!')
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
};
startServer();




