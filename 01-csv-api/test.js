import { generate } from 'csv-generate';
import { parse } from 'csv-parse';
import fs from 'node:fs/promises';
import { transform } from 'stream-transform/sync';
import { stringify } from 'csv-stringify';


(async () => {
  const array = [];
  // Initialise the parser by generating random records
 
  // Report end
  array.push({
    id: 'tes',
    title: 'descirt',
    description: 'dest',
    completed_at: 'q',
    created_at: 'q',
    updated_at: 'q',
  });
  process.stdout.write('...done\n');

  console.log(array);
  stringify(
    {
      delimiter: '||',
      header: true,
      columns: {
        id: 'id',
        title: 'title',
        description: 'description',
        completed_at: 'completed_at',
        created_at: 'created_at',
        updated_at: 'updated_at',
      },
    },
    array
  ).pipe(process.stdout);
})();
