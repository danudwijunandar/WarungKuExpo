//
// Format price value to Indonesian rupiah format with thousand separator (.)
// Convert 20000 → "20.000" or 1500000 → "1.500.000"
//
export const formatPrice = (value: string | number | undefined | null): string => {
  if (!value || value === "" || value === null || value === undefined) return "";

  const numValue = typeof value === "string" ? value.replace(/\D/g, "") : String(value);

  if (!numValue) return "";

  // Use Intl.NumberFormat untuk format dengan locale id-ID
  // minimumFractionDigits: 0 because we only want thousand separators, not decimal points
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(numValue));
};

//
// Convert formatted price back to number
// Convert "20.000" → 20000 or "1.500.000" → 1500000
//
export const unformatPrice = (formattedStr: string | undefined | null): number => {
  if (!formattedStr || formattedStr === "") return 0;

  const unformatted = formattedStr.replace(/\D/g, "");
  const numValue = Number(unformatted);

  return isNaN(numValue) ? 0 : numValue;
};
