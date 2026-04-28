export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MMK",
    minimumFractionDigits: 0,
  }).format(amount);
};
