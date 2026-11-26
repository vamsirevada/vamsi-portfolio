function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export const INVOICE_CURRENCIES = ["INR", "USD", "EUR", "GBP"];

export function isNonnegativeAmount(value) {
  if (typeof value !== "number" && typeof value !== "string") return false;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0;
}

export function computeTotals(lineItems, taxPercent) {
  const items = Array.isArray(lineItems) ? lineItems : [];
  const amounts = items.map((item) => {
    if (!isNonnegativeAmount(item?.quantity) || !isNonnegativeAmount(item?.rate)) return 0;
    return round2(Number(item.quantity) * Number(item.rate));
  });
  const normalized = items.flatMap((item, index) => {
    const description = typeof item?.description === "string" ? item.description.trim().slice(0, 500) : "";
    if (!description) return [];
    const quantity = isNonnegativeAmount(item.quantity) ? Number(item.quantity) : 0;
    const rate = isNonnegativeAmount(item.rate) ? Number(item.rate) : 0;
    return [{
      description,
      quantity,
      rate,
      amount: amounts[index],
    }];
  });

  const subtotal = round2(normalized.reduce((sum, item) => sum + item.amount, 0));
  const tax = isNonnegativeAmount(taxPercent) ? Number(taxPercent) : 0;
  const taxAmount = round2(subtotal * (tax / 100));
  const total = round2(subtotal + taxAmount);

  return { lineItems: normalized, amounts, subtotal, taxAmount, total };
}
