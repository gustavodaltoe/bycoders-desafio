import { CNABDateTime } from '@modules/cnab/domain/cnab/CnabDateTime';
import { CNABLineData } from '@modules/cnab/dtos/CnabLineData';

type ParsedCNAB = Array<CNABLineData>;

export class CnabParser {
  static execute(cnab: string): ParsedCNAB {
    const cnabLines = cnab.split('\n');
    const parsedCNAB = cnabLines.map<CNABLineData>((line) => {
      const date = line.substring(1, 9);
      const hours = line.substring(42, 48);
      return {
        type: Number(line.substring(0, 1)),
        date: CNABDateTime.parse(date, hours),
        amount: Number(line.substring(9, 19)),
        cpf: line.substring(19, 30),
        card: line.substring(30, 42),
        storeOwner: line.substring(48, 62).trim(),
        store: line.substring(62, 81).trim(),
      };
    });
    return parsedCNAB;
  }
}
