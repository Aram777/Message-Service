var express = require('express');
var router = express.Router();
router.get('/usr/:usr/pass/:pass', function (req, res, next) {
    if((req.params.usr.toUpperCase()==='ADMIN') && (req.params.pass=='1348')){
        res.send('Welcome');
    }
    else{
        res.send('You Are Not Admin');
    }
   

});

router.get('/', function (req, res, next) {
    res.send('Welcome');
    

});
module.exports = router;