const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require("./routes/user");
const churchRoutes = require("./routes/church");
const messageRoutes = require("./routes/message");
const sermonRoutes = require("./routes/sermon");
const resourceRoutes =  require("./routes/resource");
const ministryRoutes = require("./routes/ministry");
const eventRoutes = require('./routes/event');
const donationRoutes = require("./routes/donation");

const app = express();

//set port
const PORT = process.env.PORT || 8090;
//Cross origin option
var corsOption = {
    origin: "https://localhost:8091"
};

app.use(cors(corsOption));

//parse request by content type --application/json and -application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));


//define routes
app.get("/", (req, res) =>{
    res.json({
        message: "Church web api/"
    });
});

app.use("/api/users", userRoutes);
app.use("/api/church", churchRoutes);
app.use("/api/sermons", sermonRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/ministries", ministryRoutes);
app.use("/api/events",eventRoutes);
app.use("/api/donations", donationRoutes);
// app.use("/api/pastors", pastorRoutes);
// app.use("/api/leaders", leaderRoutes);
// app.use("/api/sermons", sermonRoutes);
// app.use("/api/donations", donationRoutes);
// app.use("/api/pst-sessions", pstSessionRoutes);

//listen for requests
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
