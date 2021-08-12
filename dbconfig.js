const config = {
    authentication: {
      options: {
        userName: "chat_server", // update me
        password: "Maryam98" // update me
      },
      type: "default"
    },
    database: "chatdatabase",
    server: "mychatserver.database.windows.net", // update me
    options: {
      encrypt: true
    }
  };

module.exports = config;