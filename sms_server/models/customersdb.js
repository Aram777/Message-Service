var db = require('../database');
var customers = {
  getAllcustomers: function (callback) {
    return db.query(
      'select ccc.*,  '+
      'case when ccc.cntallmsg>0 then round((ccc.cntansmsg *100)/ccc.cntallmsg ,2) else 0 end as Completed ' +
      'from( ' +
      'Select ' +
      'cus.idcustomers,' +
      'cus.first_name ,' +
      'cus.last_name ,' +
      'cus.name_prefix,' +
      'cus.email ,' +
      'cus.phone_default,' +
      'cus.emailallowed ,' +
      'cus.smsallowed ,' +
      'case when cus.emailallowed=1 then \'Yes\' else \'No\' end as emaildesc,' +
      'case when cus.smsallowed=1 then  \'Yes\' else \'No\' end as smsdesc,' +
      'cus.createdate,' +
      '(select count(idcustomers) as ccc from sendmessage msg where msg.idcustomers=cus.idcustomers) as cntallmsg,' +
      '(select count(idcustomers) as ccc from sendmessage msg where msg.idcustomers=cus.idcustomers and msg.status=1) as cntansmsg ' +
      'from customers cus) ccc;', callback);
  },
  getcustomerByid: function (idcustomers, callback) {
    return db.query('select * from customers where idcustomers=?', [idcustomers], callback);
  },
  getcustomerMsg: function (idcustomers, callback) {
    return db.query('Select msg.msgsubject, msg.createdate, ' +
      'case snt.status ' +
      'when 0 then \'Sent\' ' +
      'when 1 then \'Answered\' ' +
      'end as statusdesc ' +
      'from messages msg inner join sendmessage snt on msg.idmessages=snt.idmessages ' +
      'where snt.idcustomers=?', [idcustomers], callback);
  },
  addcustomer: function (customers, callback) {
    return db.query(
      'insert into customers (first_name, last_name,name_prefix,email,phone_default,emailallowed, smsallowed, createdate  )    values(?,?,?,?,?,?,?,?)',
      [customers.first_name,
      customers.last_name,
      customers.name_prefix,
      customers.email,
      customers.phone_default,
      customers.emailallowed,
      customers.smsallowed,
      customers.createdate],
      callback
    );
  },
  deletecustomer: function (idcustomers, callback) {
    return db.query('delete from customers where idcustomers=?', [idcustomers], callback);
  },
  updatecustomer: function (idcustomers, customers, callback) {
    return db.query(
      'update customers set ' +
      'first_name=?,' +
      'last_name=?,' +
      'name_prefix=?,' +
      'email=?,' +
      'phone_default=?,' +
      'emailallowed=?,' +
      'smsallowed=?  ' +
      ' where idcustomers=?',
      [customers.first_name,
      customers.last_name,
      customers.name_prefix,
      customers.email,
      customers.phone_default,
      customers.emailallowed,
      customers.smsallowed,
        idcustomers
      ],
      callback
    );
  }
};
module.exports = customers;