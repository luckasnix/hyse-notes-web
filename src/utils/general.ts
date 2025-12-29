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
