import * as dotenv from 'dotenv';
import * as mysql from 'mysql2';
import * as fs from 'fs';
import * as child from 'child_process';

const dbCreatePath: string = 'src/database/scripts/master.sql';
const dummyInsertPath: string = 'src/database/scripts/dummy.sql';

dotenv.config();

const mysqlQuery = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString());
    });
  });
};

const execCommand = (command: string) => {
  return new Promise((resolve, reject) => {
    child.exec(command, (error) => {
      if (error) reject(error);
      else resolve(true);
    });
  });
};

(async (): Promise<void> => {
  try {
    const user: string = process.env.TYPEORM_USERNAME;
    const password: string = process.env.TYPEORM_PASSWORD;
    const host: string = process.env.TYPEORM_HOST;
    const port: number = Number(process.env.TYPEORM_PORT);
    const connection: mysql.Connection = mysql.createConnection({
      host,
      user,
      password,
      port,
      multipleStatements: true,
    });

    const dbCreateQuery: string = await mysqlQuery(dbCreatePath);
    const dummyQuery: string = await mysqlQuery(dummyInsertPath);

    connection.query(dbCreateQuery, (error) => {
      if (error) throw error;
    });

    await execCommand('npm run db:delete-migrations');
    await execCommand('npm run typeorm -- migrations:generate -n init');
    await execCommand('npm run typeorm -- migrations:run');

    connection.query(dummyQuery);

    connection.end();
    console.log('Database restarted successfully');
  } catch (error) {
    // console.log(error);
    process.exit(1);
  }
})();
