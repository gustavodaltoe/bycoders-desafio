export class EmptyCnabContentError extends Error {
  constructor() {
    super('The CNAB content is empty.');
    this.name = 'EmptyCnabContentError';
  }
}
