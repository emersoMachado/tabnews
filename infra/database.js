import { Client } from 'pg';

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: !(process.env.NODE_ENV == 'development')
  });
  
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  }
  catch(ex) {
    console.log(ex);
    throw ex;
  }
  finally {
    await client.end();
  }
}

export {
  query
}