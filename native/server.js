import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      todo: Model,  
    },

    seeds(server) {
      server.create('todo', {
        text: 'Nulla sit amet', 
        key: '1',
      });
      server.create('todo', {
        text: 'Curabitur suscipit suscipit',
        key: '2',
      });
      server.create('todo', {
        text: 'Donec id justo',
        key: '3',
      });
    },

    routes() {
      this.namespace = 'api/todos';

      this.get('/', (schema) => {
        return schema.todos.all();  
      });

      this.get('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.todos.find(id);
      });

      this.post('/', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.todos.create(attrs);
      });

      this.patch('/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let todo = schema.todos.find(id);
        return todo.update(newAttrs);
      });

      this.delete('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.todos.find(id).destroy();
      });
    },
  });

  return server;
}
