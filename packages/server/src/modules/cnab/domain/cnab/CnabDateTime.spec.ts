import { CNABDateTime } from './CnabDateTime';

describe('CNAB Date Time', () => {
  it('Should parse date and hours', () => {
    const date = '20191015';
    const hours = '132345';

    const dateTime = CNABDateTime.parse(date, hours);

    expect(dateTime.getFullYear()).toBe(2019);
    expect(dateTime.getMonth()).toBe(9);
    expect(dateTime.getDate()).toBe(15);
    expect(dateTime.getHours()).toBe(13);
    expect(dateTime.getMinutes()).toBe(23);
    expect(dateTime.getSeconds()).toBe(45);
  });
});
