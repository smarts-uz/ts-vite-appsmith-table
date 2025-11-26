export function formatDate(input: string | number | Date): string {
  const d = new Date(input);
  if (isNaN(d.getTime())) return String(input);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}

export function formatDateTime(input: string | number | Date): string {
  const d = new Date(input);
  if (isNaN(d.getTime())) return String(input);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function normalizePhone(input: string): string {
  let digits = input.replace(/\D/g, "");

  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  return digits.slice(0, 9);
}

export function formatUzPhone(digits: string): string {
  const d = normalizePhone(digits);

  if (d.length === 0) return "";

  return [
    d.slice(0, 2), // 99
    d.slice(2, 5), // 999
    d.slice(5, 7), // 99
    d.slice(7, 9), // 99
  ]
    .filter(Boolean)
    .join(" ");
}
