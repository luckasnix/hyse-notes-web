export const BASE62_CHARS =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const getTimestampInSeconds = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const convertTimestampToDate = (timestampInSeconds: number): string => {
  const date = new Date(timestampInSeconds * 1000);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export const generateBase62Id = (length: number): string => {
  const base = BASE62_CHARS.length;
  const limit = 256 - (256 % base);
  const bytes = new Uint8Array(length * 2);
  globalThis.crypto.getRandomValues(bytes);
  let id = "";
  let i = 0;
  while (id.length < length) {
    if (i >= bytes.length) {
      globalThis.crypto.getRandomValues(bytes);
      i = 0;
    }
    if (bytes[i] < limit) {
      id += BASE62_CHARS[bytes[i] % base];
    }
    i++;
  }

  return id;
};
