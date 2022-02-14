import { EmptyCnabContentError } from './errors/EmptyCnabContentError';
import { UploadCnab } from './UploadCnab';

describe('Upload CNAB file', () => {
  it('Should return empty file error if the string is empty', async () => {
    const uploadCnab = new UploadCnab();
    const cnab = ' ';

    const response = await uploadCnab.execute(cnab);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(EmptyCnabContentError);
  });
});
