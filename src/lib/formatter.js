const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  notation: "compact",
  compactDisplay: "short",
});

export const formatCurrency = (value) => {
  return CURRENCY_FORMATTER.format(value);
};

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatNumber = (value) => {
  return NUMBER_FORMATTER.format(value);
};
