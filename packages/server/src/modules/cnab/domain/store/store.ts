import { Entity } from '@core/domain/Entity';

interface StoreProps {
  name: string;
  ownerCpf: string;
  balance?: number;
}

export class Store extends Entity<StoreProps> {
  private constructor(props: StoreProps, id?: string) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get ownerCpf() {
    return this.props.ownerCpf;
  }

  get balance() {
    return this.props.balance ?? 0;
  }

  static create(props: StoreProps, id?: string): Store {
    return new Store(
      {
        ...props,
        balance: props.balance ?? 0,
      },
      id,
    );
  }

  addBalance(value: number) {
    this.props.balance = this.balance + value;
  }

  toPersistence() {
    return {
      id: this.id,
      name: this.name,
      ownerCpf: this.ownerCpf,
      balance: this.balance,
    };
  }
}
