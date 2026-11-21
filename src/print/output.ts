import { toPng } from 'html-to-image'

// Renders a print layout node to a PNG at its native 300 DPI pixel size.
export async function renderPng(node: HTMLElement, w: number, h: number) {
  // Run twice: the first pass warms the font and image cache (a known html-to-image quirk, mostly in Safari).
  await toPng(node, { width: w, height: h, pixelRatio: 1, cacheBust: true })
  return toPng(node, { width: w, height: h, pixelRatio: 1, cacheBust: true })
}

// Browser demo printing: one image filling an exact page size, no margins.
// In the kiosk build, Electron prints this same PNG silently to a named printer instead.
export function printImage(dataUrl: string, pageCss: string) {
  let style = document.getElementById('print-page-style') as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = 'print-page-style'
    document.head.appendChild(style)
  }
  style.textContent = `@page { size: ${pageCss}; margin: 0; }`
  const root = document.getElementById('print-root')!
  root.innerHTML = ''
  const img = new Image()
  img.src = dataUrl
  root.appendChild(img)
  img.onload = () => window.print()
}

export function downloadImage(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  a.click()
}
