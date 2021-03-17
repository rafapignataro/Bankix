import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Website Freelance',
          amount: 6000,
          type: 'deposit',
          category: 'dev',
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Apartament rent',
          amount: 1000,
          type: 'withdraw',
          category: 'Fixed pays',
          createdAt: new Date(),
        },
        {
          id: 3,
          title: "Friend's Deposit",
          amount: 400,
          type: 'deposit',
          category: 'Other',
          createdAt: new Date(),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', { ...data, createdAt: new Date() });
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
