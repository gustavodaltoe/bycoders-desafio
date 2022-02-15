import { InMemoryStoreOwnersRepository } from '@modules/cnab/repositories/in-memory/InMemoryStoreOwnersRepository';
import { InMemoryStoresRepository } from '@modules/cnab/repositories/in-memory/InMemoryStoresRepository';
import { CnabTextFactory } from '@test/factories/CnabTextFactory';
import { EmptyCnabContentError } from './errors/EmptyCnabContentError';
import { UploadCnab } from './UploadCnab';

let storeOwnersRepository: InMemoryStoreOwnersRepository;
let storesRepository: InMemoryStoresRepository;
let uploadCnab: UploadCnab;

describe('Upload CNAB file', () => {
  beforeEach(() => {
    storeOwnersRepository = new InMemoryStoreOwnersRepository();
    storesRepository = new InMemoryStoresRepository();
    uploadCnab = new UploadCnab(storeOwnersRepository, storesRepository);
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

    expect(await storesRepository.exists(cpf, store)).toBeTruthy();
    expect(storesRepository.items.length).toBe(1);
  });
});
