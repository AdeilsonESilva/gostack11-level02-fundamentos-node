import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw Error('Operation not permited');
    }

    try {
      const transaction = this.transactionsRepository.create({
        title,
        type,
        value,
      });

      return transaction;
    } catch (error) {
      throw Error('Error on create transaction');
    }
  }
}

export default CreateTransactionService;
