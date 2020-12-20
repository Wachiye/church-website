const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
const responseHandler = require('./utils/responseHandler');

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const churchRoutes = require("./routes/church");
const messageRoutes = require("./routes/message");
const sermonRoutes = require("./routes/sermon");
const resourceRoutes =  require("./routes/resource");
const ministryRoutes = require("./routes/ministry");
const eventRoutes = require('./routes/event');
const donationRoutes = require("./routes/donation");
const uploadRoutes = require("./routes/uploader");
const moment = require('moment');
const app = express();

//set port
const PORT = process.env.PORT || 8090;
//Cross origin option
var corsOption= {
    allowed: "*"
}
app.use(cors(corsOption));

app.use(morgan('dev'));

//tabbed json responses
app.set("json spaces", 4);

//parse request by content type --application/json and -application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));


//define routes
app.get("/api", (req, res) =>{
    return responseHandler.sendSuccess(res,{
        message:'church api root accessed. welcome'
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/church", churchRoutes);
app.use("/api/sermons", sermonRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/ministries", ministryRoutes);
app.use("/api/events",eventRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/sermons", sermonRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/upload", uploadRoutes);

//error handling
app.use( (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err)
    return responseHandler.sendFailure(res,{
        code: 404,
        name: "resource_not_found",
        message: "the resource you are trying to access does not exits."
    });
});
//listen for requests
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
