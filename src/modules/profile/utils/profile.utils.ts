//
// ======================
// Profile Utilities
// ======================
//

/**
 * Extract initials from full name
 * E.g., "Ical Pratama" -> "IP"
 */
export const getInitials = (fullName: string): string => {
  if (!fullName) return "U";
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
};

/**
 * Format rupiah currency
 * E.g., 1250000 -> "Rp 1.250.000"
 */
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to Indonesian locale
 * E.g., "2025-01-15" -> "15 Januari 2025"
 */
export const formatDateIndonesian = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate name (not empty, min 2 chars)
 */
export const validateName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return "Nama tidak boleh kosong";
  }
  if (name.trim().length < 2) {
    return "Nama minimal 2 karakter";
  }
  return null;
};

/**
 * Validate email field
 */
export const validateEmailField = (email: string): string | null => {
  if (!email || email.trim().length === 0) {
    return "Email tidak boleh kosong";
  }
  if (!validateEmail(email)) {
    return "Format email tidak valid";
  }
  return null;
};

/**
 * Format large numbers with suffix (M, K, etc)
 * E.g., 1250000 -> "1.2M", 5000 -> "5K"
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

/**
 * Format stats for display
 * E.g., { totalSpent: 1250000 } -> { totalSpent: "1.2M" }
 */
export const formatStats = (stats: {
  totalTransactions?: number;
  totalSpent?: number;
}): Record<string, string> => {
  return {
    transactions: stats.totalTransactions?.toString() || "0",
    spent: formatNumber(stats.totalSpent || 0),
  };
};
