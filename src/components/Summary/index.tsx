import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { formatCurrency } from '../../utils/formatCurrency';
import { Container } from './styles';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (summary, transaction) => {
      if (transaction.type === 'deposit') {
        summary.incomes += transaction.amount;
        summary.total += transaction.amount;
      } else {
        summary.outcomes += transaction.amount;
        summary.total -= transaction.amount;
      }

      return summary;
    },
    { incomes: 0, outcomes: 0, total: 0 },
  );

  return (
    <Container>
      <div>
        <header>
          <p>Incomes</p>
          <img src={incomeImg} alt="Incomes" />
        </header>
        <strong>{formatCurrency(summary.incomes)}</strong>
      </div>
      <div>
        <header>
          <p>Outcomes</p>
          <img src={outcomeImg} alt="Outcomes" />
        </header>
        <strong>- {formatCurrency(summary.outcomes)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {summary.total < 0 && '-'}
          {formatCurrency(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
