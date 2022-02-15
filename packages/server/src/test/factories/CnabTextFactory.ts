import { CNABLineData } from '@modules/cnab/dtos/CnabLineData';
import dayjs from 'dayjs';

type CNABDataOverrides = Partial<CNABLineData>;

export class CnabTextFactory {
  private text: string;

  private constructor(text: string) {
    this.text = text;
  }

  get value(): string {
    return this.text;
  }

  static create(overrides?: CNABDataOverrides) {
    const data: CNABLineData = {
      type: 1,
      date: new Date(),
      amount: 100,
      cpf: '12345678901',
      card: '4753****3153',
      storeOwner: 'RICK SANCHEZ',
      store: "SANCHEZ'S BURGUER",
      ...overrides,
    };
    const [date, hours] = dayjs(data.date).format('YYYYMMDD HHmmss').split(' ');
    const amount = data.amount.toString().padStart(10, '0');
    const owner = data.storeOwner.padEnd(14, ' ');
    const store = data.store.padEnd(19, ' ');

    const line = `${data.type}${date}${amount}${data.cpf}${data.card}${hours}${owner}${store}`;
    return new CnabTextFactory(line);
  }

  addLine(overrides?: CNABDataOverrides) {
    const line = CnabTextFactory.create(overrides).value;
    this.text += `\n${line}`;
    return this;
  }
}
