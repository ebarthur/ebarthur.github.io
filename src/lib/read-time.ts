function getReadTime(text: string | undefined, wpm = 200): number {
  if (!text) return 0;

  const words = text.trim().split(/\s+/).length;

  return Math.max(1, Math.round(words / wpm));
}

export { getReadTime };
