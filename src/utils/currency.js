export const formatMMK = (amount) =>
  new Intl.NumberFormat('en-US').format(amount) + ' MMK';

export const formatMMKShort = (amount) => {
  if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(1) + 'M MMK';
  if (amount >= 1_000) return (amount / 1_000).toFixed(0) + 'K MMK';
  return amount + ' MMK';
};
