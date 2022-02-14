export class CNABDateTime {
  static parse(date: string, hours: string): Date {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const hour = hours.substring(0, 2);
    const minute = hours.substring(2, 4);
    const second = hours.substring(4, 6);

    return new Date(
      `${year}-${month}-${day}T${hour}:${minute}:${second}-03:00`,
    );
  }
}
