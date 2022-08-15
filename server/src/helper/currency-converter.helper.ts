import * as UCC from 'uni-convert-currency';

export const CurrencyConverter = async (
  from?: string,
  to?: string,
  value?: number,
) => {
  const currencyConverter = new UCC();
  const convertAmount = await currencyConverter
    .from(from)
    .to(to)
    .amount(+value)
    .convert()
    .then((response) => {
      return response;
    });

  return parseFloat(convertAmount) > 0 ? parseFloat(convertAmount) : value;
};
