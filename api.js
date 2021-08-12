var Db  = require('./dboperations');
const dboperations = require('./dboperations');

var express = require('express');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
    console.log('middleware');
    next();
 })
 
 router.route('/users').get((request,response)=>{

    dboperations.getUsers().then(result => {
        response.json(result[0])
     })
 
 })

 router.route('/users/:id').get((request,response)=>{

    dboperations.getUser(request.params.id).then(result => {
        response.json(result[0])
     })
 
 })
 
 router.route('/users/chat/:nam').get((request,response)=>{

    dboperations.getChat(request.params.nam).then(result => {
       response.json(result[0]);
    })

})

router.route('/users/message/:id').get((request,response)=>{

    dboperations.getMessage(request.params.id).then(result => {
       response.json(result[0]);
    })

})

router.route('/users/message').post((request,response)=>{

    let message = {...request.body}

    dboperations.addMessage(message).then(result => {
       response.status(201).json(result);
    })

})

router.route('/users/message/:id').delete((request,response)=>{

    dboperations.deleteMessage(request.params.id).then(result => {
       response.send(result);
    })

})


var port = process.env.PORT || 8000;
app.listen(port);
console.log('Order API is runnning at ' + port);



