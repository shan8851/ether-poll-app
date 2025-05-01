export const fetchJson = (cid: string) =>
  fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL!}${cid}`).then(r => r.json())
