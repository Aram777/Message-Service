var express = require('express');
var router = express.Router();
var customersdb = require('../models/customersdb');


router.get('/:idcustomers?', function (req, res, next) {
    req.session.myuser['userid']=110
    if (req.params.idcustomers) {
        customersdb.getcustomerByid(req.params.idcustomers, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        customersdb.getAllcustomers(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});
router.get('/msgs/:idcustomers?', function (req, res, next) {
    if (req.session.myuser['userid']==110){
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
    customersdb.addcustomer(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    });
});
router.delete('/:idcustomers', function (req, res, next) {
    customersdb.deletecustomer(req.params.idcustomers, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});
router.put('/:idcustomers', function (req, res, next) {
    customersdb.updatecustomer(req.params.idcustomers, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;