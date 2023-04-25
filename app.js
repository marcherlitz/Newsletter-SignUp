//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//includes public static folder to server
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("Connected to Server!");
});


app.post("/", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_adress: email,
                status: "subscribed",
                merge_fields: {
                                FNAME: firstname,
                                LNAME: lastname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/myListId";
    const options = {
        method: POST,
        auth: "marc1: 7e61036262aa900de34a40a6a935a6f5-us13"
    }

    const request = https.request(url, options, () => {
        response.on("data", () => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});


//Mailchimp API Key
