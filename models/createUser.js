const db = require("../server");
const bcrypt = require("bcrypt");

const createUser = (userData, callback) => {
  const { f_name, l_name, email, password } = userData;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    const query =
      "INSERT INTO User(f_name,l_name,email,hashedPassword) VALUES (?,?,?,?)";
    db.query(query, [f_name, l_name, email, hashedPassword]);
    if (err) return callback(err);
    callback(null, result);
  });
};

const getUserByEmail = (email, callback) => {
  const query = " SELECT Id,f_name,l_name,email FROM User WHERE email = '?'";

  db.query(query, [email], (err, result) => {
    if (err) return callback(err);
    if (result.length == 0) {
      return callback(null, null);
    }
    callback(null, result[0]);
  });
};
module.exports.createUser = createUser;
module.exports.getUserByEmail = getUserByEmail;
