import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tarefas } from '/imports/api/tarefas.js';

import './main.html';

Meteor.subscribe('tarefas');

Template.tarefas.onCreated(function () {
  this.tarefas = new ReactiveVar([]);
  this.autorun(() => {
    this.tarefas.set(Tarefas.find().fetch());
  });

  this.marcar = (id) => {
    Meteor.call('tarefas.marcarConcluida', id);
  };

  this.remover = (id) => {
    Meteor.call('tarefas.remover', id);
  };
});
