import { Entity } from '@core/domain/Entity';

interface StoreOwnerProps {
  cpf: string;
  name: string;
}

export class StoreOwner extends Entity<StoreOwnerProps> {
  private constructor(props: StoreOwnerProps, id?: string) {
    super(props, id);
  }

  get cpf(): string {
    return this.props.cpf;
  }

  get name(): string {
    return this.props.name;
  }

  static create(props: StoreOwnerProps, id?: string): StoreOwner {
    return new StoreOwner(props, id);
  }

  toPersistence() {
    return {
      cpf: this.cpf,
      name: this.name,
    };
  }
}
