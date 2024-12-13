export function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  
  const units = ['K', 'M', 'B', 'T'];
  const order = Math.floor(Math.log10(num) / 3);
  const unitName = units[order - 1];
  const value = num / Math.pow(1000, order);
  
  return `${value.toFixed(1)}${unitName}`;
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
}

export function formatPercentage(num: number): string {
  return `${Math.round(num * 100)}%`;
}