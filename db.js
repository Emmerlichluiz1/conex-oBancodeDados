// const { Pool } = require("pg");

async function connect() {  
    const { Pool } = require("pg");

    if(global.connection)
        return global.connection.connect();

    const pool = new Pool({
      user: process.env.USER_NAME,
      host: process.env.HOST_NAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
      port: process.env.PORT_NUMBER
    });
    
    const client = await pool.connect();
    console.log("O Pool de conexão foi criado com sucesso!")
    client.release();

    global.connection = pool;
    
    return pool.connect();
  }

  connect();
  async function insertCustomers(customers) {
  
    // estabelecer conexao
    const client = await connect()
  
    // querry
    const sql = "INSERT INTO CLIENT (cpf, nome, email, idade, profissao) values ($1, $2, $3, $4, $5);";
  
    // parametros injetados na consulta
    const values = [customers.cpf, customers.nome, customers.email, customers.idade, customers.profissao];
  
    await client.query(sql, values);
  }
  