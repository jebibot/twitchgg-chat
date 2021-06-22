function padNumber(num: number, length: number) {
  return num.toString().padStart(length, "0");
}

export function formatTimestamp(timestamp: number) {
  timestamp = Math.floor(timestamp);
  const h = Math.floor(timestamp / 3600);
  const m = Math.floor(timestamp / 60) % 60;
  const s = timestamp % 60;
  return h
    ? `${h}:${padNumber(m, 2)}:${padNumber(s, 2)}`
    : `${m}:${padNumber(s, 2)}`;
}
