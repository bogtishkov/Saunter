export const formatDistance = (length: number) => {
  if (length < 1) {
    return `${Math.round(length * 1000)} m`;
  }

  const rounded = +length.toFixed(2);
  return `${rounded} km`;
};
