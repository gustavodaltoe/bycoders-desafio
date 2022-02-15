import { Entity } from '@core/domain/Entity';

interface TransactionProps {
  type: number;
  dateTime: Date;
  amount: number;
  card: string;
  storeId: string;
}

export class Transaction extends Entity<TransactionProps> {
  private constructor(props: TransactionProps, id?: string) {
    super(props, id);
  }

  get type() {
    return this.props.type;
  }

  get dateTime() {
    return this.props.dateTime;
  }

  get amount() {
    return this.props.amount;
  }

  get card() {
    return this.props.card;
  }

  get storeId() {
    return this.props.storeId;
  }

  static create(props: TransactionProps, id?: string): Transaction {
    return new Transaction(props, id);
  }

  toPersistence() {
    return {
      id: this.id,
      type: this.type,
      dateTime: this.dateTime,
      amount: this.amount,
      card: this.card,
      storeId: this.storeId,
    };
  }
}
