var express = require('express');
var router = express.Router();
var messagesdb = require('../models/messagesdb');
var nodemailer = require('nodemailer');
function sendmai(){
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'tikkomaria@gmail.com',
            pass: '!1asdfgh'
          }
        });
        
        var mailOptions = {
          from: 'tikkomaria@gmail.com',
          to: 'aramabbasi@yahoo.com',
          subject: 'Sending Email using Node.js',
          text: 'That was easy!'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    }
router.get('/', function (req, res, next) {
    req.session.myuser['userid'] = 110

    sendmai();



    messagesdb.getAllmessages(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });

});
router.get('/msgs/:idcustomers?', function (req, res, next) {
    if (req.session.myuser['userid'] == 110) {
        customersdb.getAllcustomers(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });


    }
    if (req.params.idcustomers) {
        customersdb.getcustomerMsg(req.params.idcustomers, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });

    }
});
// router.get('/users/:userId/books/:bookId', function (req, res) {
//     res.send(req.params)
//   });
router.post('/', function (req, res, next) {
    messagesdb.addMessage(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    });
});
// router.delete('/:idcustomers', function (req, res, next) {
//     customersdb.deletecustomer(req.params.idcustomers, function (err, count) {
//         if (err) {
//             res.json(err);
//         } else {
//             res.json(count);
//         }
//     });
// });
router.put('/:idmessages', function (req, res, next) {
    messagesdb.updateMessage(req.params.idmessages, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;