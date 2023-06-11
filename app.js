//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const https = require('node:https');
const port = 3000;

const app = express();
app.use(express.static("public")); //html file eo path gula relative to public folder er moto dite hobe.
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsnonData = JSON.stringify(data);
    const url = `https://us21.api.mailchimp.com/3.0/lists/0b9b2ea730`;
    const options = {
        method: 'POST',
        auth: "tanvir:aa7d99498aeb516708da29aa661c7919-us21"
    };
    const request = https.request(url, options, (response)=>{
        if( response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on('data', (data)=>{
        //     console.log(JSON.parse(data));
        // })
    });
    request.write(jsnonData);
    request.end();
});

app.post('/failure', (req,res)=>{
    res.redirect('/');
});


// aa7d99498aeb516708da29aa661c7919-us21
// aduience id = 0b9b2ea730
    // in order to send data to the api we eneed to save the request in a constant
    // then, write consName.write(data);





app.listen(process.env.PORT || port, ()=>console.log(`Server is listening to port at ${port}`));
