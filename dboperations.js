var config = require('./dbconfig');
const sql = require('mssql');

async function getUsers() {
  try {
    let pool = await new sql.connect(config);
    let users = await pool.request().query('SELECT * FROM Users');
    //console.log(users.recordsets);
    return users.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}


async function getUser(id) {
  try {
    let pool = await new sql.connect(config);
    let user = await pool.request().input('id',sql.Int,id).query('SELECT * FROM Users WHERE ID = @id');
    console.log(user.recordsets);
    return user.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function getChat(Name) {
  try {
    let pool = await new sql.connect(config);
    const queryst = 'SELECT * FROM Messages WHERE SenderID = (SELECT ID FROM Users WHERE Name LIKE @name) OR RecieverID = (SELECT ID FROM Users WHERE Name LIKE @name)'
    let users = await pool.request().input('name', sql.VarChar, Name+'%').query(queryst);
    //console.log(users.recordsets);
    return users.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function getMessage(id) {
  try {
    let pool = await new sql.connect(config);
    const queryst = 'SELECT * FROM Messages WHERE ID = @id';
    let msg = await pool.request()
    .input('id',sql.Int,id)
    .query(queryst);
    //console.log(users.recordsets);
    return msg.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function addMessage(order) {

  console.log(order)

  try {
    let pool = await sql.connect(config);
    let insertmsg = await pool.request()
      .input('Sender', sql.Int, order.sender)
      .input('Receiver', sql.Int, order.receiver)
      .input('type', sql.NVarChar, 'text')
      .input('content', sql.Text, order.Message)
      .execute('InsertMessage');
    return insertmsg.recordsets;
  }
  catch (err) {
    console.log(err);
  }

}

async function deleteMessage(id) {

  try {
    let pool = await sql.connect(config);
    console.log('before deleting')
    let deletemsg = await pool.request().input('id', sql.Int, id).query('DELETE FROM Messages WHERE ID = @id',(err,rows,field)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log('deleted successfully')
      }
    })
    return deletemsg.recordsets;
  }
  catch (err) {
    console.log(err)
  }
}


module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  getChat: getChat,
  addMessage: addMessage,
  getMessage: getMessage,
  deleteMessage: deleteMessage
}
