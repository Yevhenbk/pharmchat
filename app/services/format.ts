export class FormatService {
  static currency(value: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  static currencyWhole(value: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  static compactCurrency(value: number): string {
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}M`;
    }

    if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(1)}K`;
    }

    return FormatService.currency(value);
  }
}
