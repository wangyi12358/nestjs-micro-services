export function getSkip(current: number, pageSize: number) {
  return (current - 1) * pageSize;
}
