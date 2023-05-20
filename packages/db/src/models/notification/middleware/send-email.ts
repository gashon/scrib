import Handlebars from 'handlebars';
import util from 'util';
import sendgrid from '@scrib/api/lib/sendgrid';
import Template from '@scrib/api/templates/types/template';
import templates from '../templates';
import { INotification } from '../types';

util.inspect.defaultOptions.depth = null;

export default async function send(this: INotification) {
  const template: Template = templates[this.type];

  if (!template) return;

  const render = (prop: 'from' | 'subject' | 'content') => {
    return Handlebars.compile(template[prop])(this.data);
  };

  await sendgrid.sendMultiple({
    to: this.emails,
    from: {
      email: template.from,
      name: 'Scrib',
    },
    replyTo: {
      email: 'gashon@ghussein.org', // TODO: Set up emails
      name: 'Gashon Hussein',
    },
    subject: render('subject'),
    html: render('content'),
  });
}
