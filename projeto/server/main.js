import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Tarefas } from '/imports/api/tarefas.js';

Meteor.publish('tarefas', function () {
  return Tarefas.find({}, { sort: { criadaEm: -1 } });
});

Meteor.methods({
  'tarefas.inserir'(titulo) {
    Tarefas.insert({
      titulo,
      criadaEm: new Date(),
      concluida: false,
    });
  },
  'tarefas.remover'(id) {
    Tarefas.remove(id);
  },
  'tarefas.marcarConcluida'(id) {
    const tarefa = Tarefas.findOne(id);
    if (tarefa) {
      Tarefas.update(id, { $set: { concluida: !tarefa.concluida } });
    }
  },
});

WebApp.connectHandlers.use('/adicionar', (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const titulo = params.get('titulo');
      if (titulo) {
        Meteor.call('tarefas.inserir', titulo);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<li>${titulo}</li>`);
      } else {
        res.writeHead(400);
        res.end('Título obrigatório.');
      }
    });
  } else {
    res.writeHead(405);
    res.end('Método não permitido.');
  }
});
