/*
 * Input: ID, Password
 * Output:
 * - 0 if success
 * - -2 if user ID already exists
 * - -3 if internal error
 */


var bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = function(id, pass) {


    var conn = require('./db_conn')();

    var record_num = 0;
    var hashed_pass;

    var sql1 = "SELECT * FROM UserPass WHERE UserID=? ;";
    conn.query(sql1, [id], function (err, result) {
        if (err) console.log(err.message);
        record_num = result.length
    });
    
    
    if (record_num > 1) return -3;
    if (record_num == 1) return -2;
    
  
    hashed_pass = bcrypt.hashSync(pass, saltRounds);

    var sql2 = "INSERT INTO UserPass (UserID, Password) VALUES (?, ?) ;";
    conn.query(sql2, [id, hashed_pass], function (err, result) {
        if (err) console.log(err.message);
    });

    conn.end();
    return 0;
};
