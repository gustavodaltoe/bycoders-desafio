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
}
