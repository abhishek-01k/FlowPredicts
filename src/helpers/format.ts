export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatAmount(amount: bigint): string {
  return (Number(amount) / 1e6).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) * 1000).toLocaleString();
}

export function convertToSeconds(hours: number): number {
  const SECONDS_PER_HOUR = 3600;
  return Math.floor(hours * SECONDS_PER_HOUR);
}
