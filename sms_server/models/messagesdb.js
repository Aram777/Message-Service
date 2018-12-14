var db = require('../database');
var messages = {
    getAllmessages: function (callback) {
        return db.query(

            'select ccc.*,  ' +
            'case when ccc.cntallmsg>0 then round((ccc.cntansmsg *100)/ccc.cntallmsg ,2) else 0 end as Completed  ' +
            'from( ' +
            'select msg.idmessages, msg.message_text, msg.byemail, ' +
            'msg.bysms, msg.status, msg.createdate, msg.msgsubject, ' +
            'case when  msg.status=0 then \'Created\' else \'Used\' end as statusdesc, ' +
            'case when  msg.bysms=0 then \'No\' else \'Yes\' end as bysmsdesc, ' +
            'case when  msg.byemail=0 then \'No\' else \'Yes\' end as byemaildesc, ' +
            '(select count(idcustomers) as ccc from sendmessage smsg where smsg.idmessages=msg.idmessages) as cntallmsg, ' +
            '(select count(idcustomers) as ccc from sendmessage smsg where smsg.idmessages=msg.idmessages and smsg.status=1 ) as cntansmsg  ' +
            'From messages msg ) ccc; '
            , callback);
    },

    getNewCustomerMsg: function (idmessages, callback) {
        return db.query('select ' +idmessages+' as msgID, cust.idcustomers as id, cust.first_name, cust.last_name ' +
            'from  customers cust where cust.idcustomers not in ' +
            '(select sntmsg.idcustomers from sendmessage sntmsg where sntmsg.idmessages=?); ', [idmessages], callback);
    },

   

    getCustomerMsg: function (idmessages, callback) {
        return db.query('SELECT sntmsg.idmessages, cust.first_name, cust.last_name, ' +
            'sntmsg.createdate, sntmsg.idcustomers ' +
            'from sendmessage sntmsg inner join customers cust on cust.idcustomers= sntmsg.idcustomers ' +
            'where sntmsg.idmessages=?;', [idmessages], callback);
    },
    addMessage: function (messages, callback) {
        return db.query(
            'insert into messages (message_text, byemail,bysms,status,createdate, msgsubject)    values(?,?,?,?,?,?)',
            [messages.message_text,
            messages.byemail,
            messages.bysms,
            messages.status,
            messages.createdate,
            messages.msgsubject],
            callback
        );
    },

    addMessageCust: function (idmessages, idcustomers, messages, callback) {
        return db.query(
            'insert into sendmessage (idcustomers, idmessages,createdate,status)    values(?,?,?,?) ',
            [idcustomers,
                idmessages,
            new Date(),
            0
            ],
            callback
        );
    },
    deleteMessage: function (idmessages, callback) {
        return db.query('delete from messages where idmessages=?', [idmessages], callback);
    },

    updateMessage: function (idmessages, messages, callback) {
        return db.query(
            'update messages set ' +
            'message_text=?,' +
            'byemail=?,' +
            'bysms=?,' +
            'msgsubject=?,'+
            'status=? '+
            ' where idmessages=?',
            [messages.message_text,
            messages.byemail,
            messages.bysms,
            messages.msgsubject,
            messages.status,
                idmessages
            ],
            callback
        );
    }
};
module.exports = messages;