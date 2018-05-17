const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hey builders!');
});

// example to get data from a json file
app.get('/contacts', (req, res) => {
    fs.readFile('contacts.json', (err, data) => {
        if (err) { return console.log(err) }
        res.send(JSON.parse(data));
    })
})

// example to get specific # of data 
app.get('/contact/:id', (req, res) => {
    fs.readFile('contacts.json', (err, data) => {
        if (err) { return console.log(err) }

        const id = req.params.id; 

        const result = JSON.parse(data).filter((entry) => {
            return entry.id == id
        });
        res.send(result);
    })
})


// exmaple of middleware 
// in postman - post > body > url encoded > add keys + values 
app.post('/new', (req, res) => {
    fs.readFile('contacts.json', (err, data) => {
        // read from the file 
        if (err) { return console.log(err) }
        let contacts = JSON.parse(data);
        let newId = contacts.length + 1; 
        let newContact = {
            id: newId,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        };
        contacts.push(newContact);
        // write line 45 - 49 to a file
        // takes file name, data from contacts & callback
        // stringify: 'replacer' left as null bc nothing wanted to replace
        // stringify: 'space' is ' ' to create spaces between the lines
        fs.writeFile('contacts.json', JSON.stringify(contacts, null, ' '), () => {
            res.send(newContact);
        });
    });
})

app.listen(3000, () => {
    console.log('Running on port 3000...');
})