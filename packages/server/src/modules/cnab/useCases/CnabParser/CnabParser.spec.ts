import { CNABLineData } from '@modules/cnab/dtos/CnabLineData';
import { CnabTextFactory } from '@test/factories/CnabTextFactory';
import { CnabParser } from './CnabParser';

describe('Cnab Parser', () => {
  it('Should be able to parse the cnab data to ParsedCNAB type', () => {
    const cnabData: CNABLineData = {
      type: 3,
      date: new Date('2019-03-01T15:34:53-03:00'),
      amount: 14200,
      cpf: '09620676017',
      card: '4753****3153',
      storeOwner: 'JOÃO MACEDO',
      store: 'BAR DO JOÃO',
    };
    const cnab = CnabTextFactory.create(cnabData).addLine().value;

    const parsedCNAB = CnabParser.execute(cnab);

    expect(parsedCNAB).toHaveLength(2);
    expect(parsedCNAB[0].type).toBe(cnabData.type);
    expect(parsedCNAB[0].date.toString()).toBe(cnabData.date.toString());
    expect(parsedCNAB[0].amount).toBe(cnabData.amount);
    expect(parsedCNAB[0].cpf).toBe(cnabData.cpf);
    expect(parsedCNAB[0].card).toBe(cnabData.card);
    expect(parsedCNAB[0].storeOwner).toBe(cnabData.storeOwner);
    expect(parsedCNAB[0].store).toBe(cnabData.store);
  });
});
