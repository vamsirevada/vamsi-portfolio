function round2(n) {
  return Math.round(n * 100) / 100;
}

export function computeTotals(lineItems, taxPercent) {
  const normalized = (Array.isArray(lineItems) ? lineItems : []).map((item) => {
    const quantity = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    return {
      description: typeof item.description === "string" ? item.description.slice(0, 500) : "",
      quantity,
      rate,
      amount: round2(quantity * rate),
    };
  });

  const subtotal = round2(normalized.reduce((sum, item) => sum + item.amount, 0));
  const tax = Number(taxPercent) || 0;
  const taxAmount = round2(subtotal * (tax / 100));
  const total = round2(subtotal + taxAmount);

  return { lineItems: normalized, subtotal, taxAmount, total };
}
