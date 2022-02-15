import { InMemoryStoreOwnersRepository } from '@modules/cnab/repositories/in-memory/InMemoryStoreOwnersRepository';
import { InMemoryStoresRepository } from '@modules/cnab/repositories/in-memory/InMemoryStoresRepository';
import { InMemoryTransactionsRepository } from '@modules/cnab/repositories/in-memory/InMemoryTransactionsRepository';
import { CnabTextFactory } from '@test/factories/CnabTextFactory';
import { EmptyCnabContentError } from './errors/EmptyCnabContentError';
import { UploadCnab } from './UploadCnab';

let storeOwnersRepository: InMemoryStoreOwnersRepository;
let storesRepository: InMemoryStoresRepository;
let transactionsRepository: InMemoryTransactionsRepository;
let uploadCnab: UploadCnab;

describe('Upload CNAB file', () => {
  beforeEach(() => {
    storeOwnersRepository = new InMemoryStoreOwnersRepository();
    storesRepository = new InMemoryStoresRepository();
    transactionsRepository = new InMemoryTransactionsRepository();
    uploadCnab = new UploadCnab(
      storeOwnersRepository,
      storesRepository,
      transactionsRepository,
    );
  });

  it('Should return empty file error if the string is empty', async () => {
    const cnab = ' ';

    const response = await uploadCnab.execute(cnab);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(EmptyCnabContentError);
  });

  it('Should be able to upload the file', async () => {
    const cnab = CnabTextFactory.create();

    const result = await uploadCnab.execute(cnab.value);

    expect(result.isRight()).toBeTruthy();
  });

  it('Should create the store owner', async () => {
    const cpf = '12345678901';
    const cnab = CnabTextFactory.create({ cpf });

    await uploadCnab.execute(cnab.value);

    expect(await storeOwnersRepository.exists(cpf)).toBeTruthy();
  });

  it('Should not create a store owners if it already exists', async () => {
    const cpf = '12345678901';
    const cnab = CnabTextFactory.create({ cpf });

    await uploadCnab.execute(cnab.value);
    await uploadCnab.execute(cnab.value);

    expect(await storeOwnersRepository.exists(cpf)).toBeTruthy();
    expect(storeOwnersRepository.items.length).toBe(1);
  });

  it('Should create the store', async () => {
    const cpf = '12345678901';
    const store = 'Store';
    const cnab = CnabTextFactory.create({ cpf, store });

    await uploadCnab.execute(cnab.value);

    expect(await storesRepository.exists(cpf, store)).toBeTruthy();
  });

  it('Should not create a store if it already exists', async () => {
    const cpf = '12345678901';
    const store = 'Store';
    const cnab = CnabTextFactory.create({ cpf, store });

    await uploadCnab.execute(cnab.value);
    await uploadCnab.execute(cnab.value);

    expect(storesRepository.items.length).toBe(1);
  });

  it('Should sum the balance of the store foreach cnab line for it', async () => {
    const cpf = '12345678901';
    const store = 'Store';
    const amount1 = randomAmount();
    const amount2 = randomAmount();

    await uploadCnab.execute(
      CnabTextFactory.create({ cpf, store, amount: amount1 }).value,
    );
    await uploadCnab.execute(
      CnabTextFactory.create({ cpf, store, amount: amount2 }).value,
    );

    expect(await storesRepository.exists(cpf, store)).toBeTruthy();
    expect(storesRepository.items[0].balance).toBe(amount1 + amount2);
  });

  it('Should sum or subtract the balance based on the transaction type and amount', async () => {
    const amounts = [randomAmount(), randomAmount()];
    const cnab = CnabTextFactory.create({
      type: 1,
      amount: amounts[0],
    }).addLine({
      type: 2,
      amount: amounts[1],
    });

    await uploadCnab.execute(cnab.value);

    expect(storesRepository.items[0].balance).toBe(amounts[0] - amounts[1]);
  });

  it('Should store the transactions', async () => {
    const cpf = '12345678901';
    const store = 'Store';
    const cpf2 = '12345678902';
    const store2 = 'Store 2';
    const cnab = CnabTextFactory.create({ cpf, store })
      .addLine({ cpf, store })
      .addLine({ cpf: cpf2, store: store2 });

    await uploadCnab.execute(cnab.value);

    expect(transactionsRepository.items.length).toBe(3);
  });
});

function randomAmount() {
  return Math.floor(Math.random() * 1000) + 1;
}
