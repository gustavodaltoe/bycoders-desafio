export type TransactionTypeKey = keyof typeof TransactionType;

export const TransactionType = {
  1: {
    type: 'Débito',
    signal: 1,
  },
  2: {
    type: 'Boleto',
    signal: -1,
  },
  3: {
    type: 'Financiamento',
    signal: -1,
  },
  4: {
    type: 'Crédito',
    signal: 1,
  },
  5: {
    type: 'Recebimento Empréstimo',
    signal: 1,
  },
  6: {
    type: 'Vendas',
    signal: 1,
  },
  7: {
    type: 'Recebimento TED',
    signal: 1,
  },
  8: {
    type: 'Recebimento DOC',
    signal: 1,
  },
  9: {
    type: 'Aluguel',
    signal: -1,
  },
};
