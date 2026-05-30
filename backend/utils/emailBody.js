export function getCurrentDateString() {
  return new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  })
}
