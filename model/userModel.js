import db from "../config/db.js";

export const getAllUsers = (callback) => {
  //console.log("model");
  const dbquery = "SELECT * FROM users";
  //console.log(db.query(dbquery, callback));
  db.query(dbquery, callback);
};

export const createUser = (data, callback) => {
  const { userName, userEmail, hasPw, userPw } = data;
  const dbquery = `INSERT INTO users( name, email, password, password_text) VALUES (?,?,?,?) RETURNING *`;
  //console.log("callback", callback);
  db.query(dbquery, [userName, userEmail, hasPw, userPw], callback);
};

export const createUserTry = async (data) => {
  const { userName, userEmail, hasPw, userPw } = data;
  const dbquery = `INSERT INTO users( name, email, password, password_text) VALUES (?,?,?,?) `;
  const response = await db
    .promise()
    .query(dbquery, [userName, userEmail, hasPw, userPw]);
  const insertId = response[0].insertId;
  return await db
    .promise()
    .query(`SELECT * FROM users WHERE id=(?)`, [insertId]);
};

export const checkUser = async (email) => {
  const dbquery = `SELECT * FROM users where email = (?)`;
  return await db.promise().query(dbquery, [email]);
};
