export function formatPhone(phone: string): string {
  return `+92${String(phone).substring(1)}`;
}
