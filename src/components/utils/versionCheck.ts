export const isVersionLower = (current: string, required: string) => {
  const currentParts = current.split('.').map(Number);
  const requiredParts = required.split('.').map(Number);

  const maxLength = Math.max(currentParts.length, requiredParts.length);

  for (let i = 0; i < maxLength; i++) {
    const currentPart = currentParts[i] ?? 0;
    const requiredPart = requiredParts[i] ?? 0;

    if (currentPart < requiredPart) return true;
    if (currentPart > requiredPart) return false;
  }

  return false;
};