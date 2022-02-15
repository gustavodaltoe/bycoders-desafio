import { InMemoryStoreOwnersRepository } from '@modules/cnab/repositories/in-memory/InMemoryStoreOwnersRepository';
import { CnabTextFactory } from '@test/factories/CnabTextFactory';
import { EmptyCnabContentError } from './errors/EmptyCnabContentError';
import { UploadCnab } from './UploadCnab';

let storeOwnersRepository: InMemoryStoreOwnersRepository;
let uploadCnab: UploadCnab;

describe('Upload CNAB file', () => {
  beforeEach(() => {
    storeOwnersRepository = new InMemoryStoreOwnersRepository();
    uploadCnab = new UploadCnab(storeOwnersRepository);
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
});
