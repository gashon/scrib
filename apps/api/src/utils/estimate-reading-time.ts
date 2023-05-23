// https://speechify.com/blog/average-reading-speed-pages/?landing_url=https%3A%2F%2Fspeechify.com%2Fvoiceover%2F
const AVERAGE_READING_SPEED_IN_WORDS_PER_MINUTE = 200;

export function estimateReadingTimeInSecs(article: string): number {
  const words = article.split(/\s+/);
  const minutes = words.length / AVERAGE_READING_SPEED_IN_WORDS_PER_MINUTE;

  const seconds = Math.round(minutes * 60 * 100) / 100;
  return seconds;
}
