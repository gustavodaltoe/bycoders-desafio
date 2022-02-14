import { CnabParser } from './CnabParser';

describe('Cnab Parser', () => {
  it('Should be able to parse the cnab data to ParsedCNAB type', () => {
    const parser = new CnabParser();
    const cnab = `3201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO       \n5201903010000013200556418150633123****7687145607MARIA JOSEFINALOJA DO Ó - MATRIZ`;

    const parsedCNAB = parser.execute(cnab);

    expect(parsedCNAB).toHaveLength(2);
    expect(parsedCNAB[0].type).toBe(3);
    expect(parsedCNAB[0].date.toString()).toBe(
      new Date('2019-03-01T15:34:53-03:00').toString(),
    );
    expect(parsedCNAB[0].amount).toBe(14200);
    expect(parsedCNAB[0].cpf).toBe('09620676017');
    expect(parsedCNAB[0].card).toBe('4753****3153');
    expect(parsedCNAB[0].storeOwner).toBe('JOÃO MACEDO');
    expect(parsedCNAB[0].store).toBe('BAR DO JOÃO');
  });
});
