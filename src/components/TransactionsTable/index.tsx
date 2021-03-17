import { useEffect, useState } from 'react';

import { api } from '../services/api';
import { Container } from './styles';

interface transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<transaction[]>([]);

  useEffect(() => {
    api.get('/transactions').then((response) => setTransactions(response.data));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {transaction.type === 'withdraw' && '- '}
                R$
                {transaction.amount}
              </td>
              <td>Development</td>
              <td>20/02/2022</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
