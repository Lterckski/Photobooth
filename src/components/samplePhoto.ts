// Placeholder portrait used for theme previews and when no camera is available.
export function samplePhoto(hue = 200, label = '') {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'>
<rect width='800' height='600' fill='hsl(${hue},45%,82%)'/>
<circle cx='400' cy='250' r='110' fill='hsl(${hue},30%,55%)'/>
<rect x='230' y='380' width='340' height='260' rx='170' fill='hsl(${hue},30%,55%)'/>
<text x='30' y='60' font-family='monospace' font-size='36' fill='hsl(${hue},30%,40%)'>${label}</text>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
