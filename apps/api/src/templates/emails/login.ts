import Template from '../types/template';

const template: Template = {
  from: 'gashon@ghussein.org',
  subject: 'Log into Scrib',
  content: `
    <div>
      Your login link for Scrib
      <br /><br />
      <a href="{{{ login_link }}}">Continue to Scrib</a>
      <br /><br />
      This link and code will only be valid for the next 5 minutes. If the link
      does not work, contact support at @ Scrib.
    </div>
  `,
};

export default template;
