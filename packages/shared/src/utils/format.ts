/**
 * Formatea un número como precio con símbolo de moneda.
 *
 * Usado en el carrito (web), en el listado de productos (mobile)
 * y en la generación de facturas (api).
 *
 * @example formatPrice(1999.9)            → "1.999,90 €"
 * @example formatPrice(49.99, "USD", "en") → "$49.99"
 */
export function formatPrice(
  amount: number,
  currency = "EUR",
  locale = "es-ES",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Formatea una fecha de forma legible.
 *
 * @example formatDate(new Date("2025-01-15")) → "15 de enero de 2025"
 */
export function formatDate(
  date: Date,
  locale = "es-ES",
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Trunca un string largo añadiendo "…" al final.
 *
 * @example truncate("Título muy largo", 10) → "Título muy…"
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}
