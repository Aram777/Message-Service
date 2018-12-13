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

    // getcustomerMsg: function (idcustomers, callback) {
    //     return db.query('Select msg.msgsubject, msg.createdate, ' +
    //         'case snt.status ' +
    //         'when 0 then \'Sent\' ' +
    //         'when 1 then \'Answered\' ' +
    //         'end as statusdesc ' +
    //         'from messages msg inner join sendmessage snt on msg.idmessages=snt.idmessages ' +
    //         'where snt.idcustomers=?', [idcustomers], callback);
    // },
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
    deleteMessage: function (idmessages, callback) {
        return db.query('delete from messages where idmessages=?', [idmessages], callback);
    },

    updateMessage: function (idmessages, messages, callback) {
        return db.query(
            'update messages set ' +
            'message_text=?,' +
            'byemail=?,' +
            'bysms=?,' +
            'status=0,'+
            'msgsubject=?',
            [messages.message_text,
            messages.byemail,
            messages.bysms,
            messages.msgsubject,
                idmessages
            ],
            callback
        );
    }
};
module.exports = messages;