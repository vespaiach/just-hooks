/**
 * Keep silent on production. Shout out on other environments.
 */
export function logError(...args: unknown[]) {
  if (process && process.env && process.env.NODE_ENV !== 'production') {
    console.error(...args);
  }
}
