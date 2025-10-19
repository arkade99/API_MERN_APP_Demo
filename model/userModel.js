import db from "../config/db.js";

export const getAllUsers = (callback) => {
  console.log("model");
  const dbquery = "SELECT * FROM users";
  //console.log(db.query(dbquery, callback));
  db.query(dbquery, callback);
};

export const createUser = (data, callback) => {
  const { userName, userEmail, hasPw, userPw } = data;
  console.log("Model", data);
  const dbquery = `INSERT INTO users( name, email, password, password_text) VALUES (?,?,?,?)`;
  db.query(dbquery, [userName, userEmail, hasPw, userPw], callback);
};

// export const createUserTry = async (data) => {
//   const { userName, userEmail, userPw } = data;
//   const dbquery = `INSERT INTO users( name, email, password) VALUES (?,?,?)`;
//   return await db.query(dbquery, [userName, userEmail, userPw]);
// };

export const checkUser = async (email) => {
  const dbquery = `SELECT * FROM users where email = (?)`;
  return await db.promise().query(dbquery, [email]);
};
