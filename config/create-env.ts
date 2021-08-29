import * as fs from 'fs';

const src: string = '.env.example';
const dest: string = '.env';

fs.copyFile(src, dest, (err) => {
  if (err) throw err;
  console.log('File .env copied successfully');
});
