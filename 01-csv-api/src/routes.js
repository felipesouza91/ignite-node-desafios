import { buildRoutePath } from './utils/build-route-path.js';
import { TaskService } from './task-service.js';

const taskService = new TaskService();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const users = taskService.findAll();

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: async (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) {
        return res
          .statusCode(400)
          .end(JSON.stringify({ error: 'Title and description are required' }));
      }

      const data = await taskService.save({ title, description });

      return res.end(JSON.stringify(data));
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: async (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      if (!id) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Task Id is required' }));
      }
      if (!title || !description) {
        res.statusCode = 400;
        return res.end(
          JSON.stringify({ error: 'Title and description are required' })
        );
      }
      try {
        await taskService.update(id, { title, description });
        res.statusCode = 204;
      } catch (error) {
        res.statusCode = 400;
      } finally {
        return res.end();
      }
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: async (req, res) => {
      const { id } = req.params;
      if (!id) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Task Id is required' }));
      }
      try {
        await taskService.delete(id);
        res.statusCode = 204;
      } catch (error) {
        res.statusCode = 400;
      } finally {
        return res.end();
      }
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: async (req, res) => {
      const { id } = req.params;
      if (!id) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Task Id is required' }));
      }
      try {
        await taskService.completeTask(id);
        res.statusCode = 204;
      } catch (error) {
        res.statusCode = 400;
      } finally {
        return res.end();
      }
    },
  },
];
