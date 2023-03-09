import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';

import fs from 'node:fs/promises';
const taskCsv = new URL('../../task.csv', import.meta.url);

export async function loadDatas() {
  const array = [];
  await fs
    .readFile(taskCsv)
    .then(async (data) => {
      const parser = parse(data, {
        columns: true,
        delimiter: '||',
        skip_empty_lines: true,
      });
      for await (const record of parser) {
        array.push(record);
      }
    })
    .catch(async () =>
      fs.writeFile(
        taskCsv,
        'id||title||description||completed_at||created_at||updated_at'
      )
    );

  return array;
}

export async function persistData(data) {
  const stringData = await stringify(
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
    data
  );
  await fs.writeFile(taskCsv, stringData);
}
