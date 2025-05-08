export function formatUnixDate(ts: number) {
  return new Date(ts * 1_000).toLocaleDateString(undefined, {
    dateStyle: 'medium',
  })
}
