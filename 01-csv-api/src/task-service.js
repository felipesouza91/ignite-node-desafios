import { loadDatas, persistData } from './utils/csv-utils.js';
import { randomUUID } from 'node:crypto';

export class TaskService {
  #database = [];

  constructor() {
    loadDatas()
      .then((data) => (this.#database = data))
      .catch((error) => console.error(error));
  }

  async save({ title, description }) {
    const data = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.#database.push(data);
    await persistData(this.#database);
    return data;
  }

  findAll() {
    return this.#database;
  }

  async update(id, { title, description }) {
    const taskIndex = this.#database.findIndex((task) => task.id === id);
    if (taskIndex < 0) {
      throw Error('Task not found');
    }

    this.#database[taskIndex].title = title;
    this.#database[taskIndex].description = description;
    this.#database[taskIndex].updated_at = new Date();

    await persistData(this.#database);
  }

  async delete(id) {
    const taskIndex = this.#database.findIndex((task) => task.id === id);
    if (taskIndex < 0) {
      throw Error('Task not found');
    }
    this.#database.splice(taskIndex, 1);

    await persistData(this.#database);
  }
  async completeTask(id) {
    const taskIndex = this.#database.findIndex((task) => task.id === id);
    if (taskIndex < 0) {
      throw Error('Task not found');
    }
    this.#database[taskIndex].completed_at = new Date();

    await persistData(this.#database);
  }
}
