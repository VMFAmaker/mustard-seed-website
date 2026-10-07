// Line pictograms drawn on a 24px grid. Parts with class "ac" are drawn in the accent (gold).
const ICONS = {
  gear: '<circle cx="12" cy="12" r="6.3"/><circle class="ac" cx="12" cy="12" r="2.6"/><path stroke-width="2.3" d="M12 2.6v2.7M12 18.7v2.7M2.6 12h2.7M18.7 12h2.7M5.4 5.4l1.9 1.9M16.7 16.7l1.9 1.9M5.4 18.6l1.9-1.9M16.7 7.3l1.9-1.9"/>',
  megaphone: '<path d="M3.5 10v4a1 1 0 0 0 1 1H7l7 4V5L7 9H4.5a1 1 0 0 0-1 1z"/><path d="M7 15l1.4 4.5h2.4L9.6 15.6"/><path class="ac" d="M17.3 9.3a3.8 3.8 0 0 1 0 5.4M19.7 6.9a7.2 7.2 0 0 1 0 10.2"/>',
  chart: '<path d="M3 20.5h18M5.5 20.5v-5M10 20.5v-8M14.5 20.5v-4.5M19 20.5v-10"/><path class="ac" d="M4 11.5l5-4.5 4 3 6.5-6M16 4h3.5v3.5"/>',
  scales: '<path d="M12 3.5v16.5M8 20.5h8M4.5 7h15"/><circle class="ac" cx="12" cy="4" r="1.2"/><path class="ac" d="M4.5 7L2 13M4.5 7L7 13M19.5 7L17 13M19.5 7L22 13"/><path d="M1.8 13h5.4a2.7 2.7 0 0 1-5.4 0zM16.8 13h5.4a2.7 2.7 0 0 1-5.4 0z"/>',
  seed: '<path d="M3 19.5h18"/><ellipse class="ac" cx="12" cy="13.8" rx="5.6" ry="4.6"/><path d="M9.2 12.6a3 3 0 0 1 2.6-2"/>',
  sprout: '<path d="M3 20h18M12 20v-7.5"/><path class="ac" d="M12 14c-3.9 0-6-2.3-6-5.8 3.9 0 6 2.3 6 5.8zM12 12.5c0-3.5 2.1-5.8 6-5.8 0 3.5-2.1 5.8-6 5.8z"/>',
  plant: '<path d="M3 20.5h18M12 20.5V6"/><path class="ac" d="M12 16.5c-3.2 0-5-1.8-5-4.6 3.2 0 5 1.8 5 4.6zM12 12.5c3.2 0 5-1.8 5-4.6-3.2 0-5 1.8-5 4.6zM12 8.2c-2.3 0-3.6-1.3-3.6-3.3 2.3 0 3.6 1.3 3.6 3.3z"/>',
  tree: '<path d="M5 21h14M12 21v-8.5M12 16.2l-2.6-2.1M12 14.6l2.4-1.9"/><path class="ac" d="M8.3 15.5A4.3 4.3 0 0 1 6.6 8a5.5 5.5 0 0 1 10.8 0 4.3 4.3 0 0 1-1.7 7.5z"/>',
  network: '<path d="M12 12.5V6.5M12 12.5l-5.3 4.2M12 12.5l5.3 4.2"/><circle cx="12" cy="4.5" r="2"/><circle cx="5.2" cy="18" r="2"/><circle cx="18.8" cy="18" r="2"/><circle class="ac" cx="12" cy="12.5" r="2.2"/>',
  people: '<circle cx="8" cy="7.5" r="2.7"/><path d="M3 19.5c0-3.1 2.2-5.3 5-5.3s5 2.2 5 5.3"/><g class="ac"><circle cx="16.5" cy="8.5" r="2.4"/><path d="M13.8 14.6a4.6 4.6 0 0 1 2.7-.9c2.6 0 4.5 2 4.5 4.9"/></g>',
  hands: '<path d="M2.5 14.5c2 0 3.2.8 4.6 1.5h5.4a1.5 1.5 0 0 1 0 3H8.6"/><path d="M12.5 19l5.6-2.6a1.5 1.5 0 0 1 1.9 2.2L14.6 22H7.3L2.5 20"/><path class="ac" d="M12 13.5V8.3M12 10c-2.4 0-3.8-1.4-3.8-3.6 2.4 0 3.8 1.4 3.8 3.6zM12 8.6c0-2.2 1.4-3.6 3.8-3.6 0 2.2-1.4 3.6-3.8 3.6z"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/><path class="ac" d="M8.5 12h2l1-2 1.5 4 1-2h1.5"/>',
  shield: '<path d="M12 3l7 2.8v5.3c0 4.4-2.9 7.9-7 9.9-4.1-2-7-5.5-7-9.9V5.8z"/><path class="ac" d="M8.8 12.2l2.2 2.2 4.3-4.4"/>',
  community: '<circle cx="12" cy="7" r="2.6"/><path d="M7.5 19.5c0-3 2-5.2 4.5-5.2s4.5 2.2 4.5 5.2"/><g class="ac"><circle cx="5" cy="9.3" r="2"/><circle cx="19" cy="9.3" r="2"/><path d="M1.8 18.2c0-2.3 1.4-3.9 3.2-3.9M22.2 18.2c0-2.3-1.4-3.9-3.2-3.9"/></g>',
  star: '<path d="M12 3.2l2.6 5.5 6 .8-4.4 4.1 1.1 6L12 16.7l-5.3 2.9 1.1-6L3.4 9.5l6-.8z"/><circle class="ac" cx="12" cy="12" r="1.4"/>',
  nodebt: '<circle cx="12" cy="12" r="8.5"/><text x="12" y="15.6" text-anchor="middle">£</text><path class="ac" d="M5.8 5.8l12.4 12.4"/>',
  tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  percent: '<path d="M18.5 5.5l-13 13"/><circle class="ac" cx="7" cy="7" r="2.5"/><circle class="ac" cx="17" cy="17" r="2.5"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect class="ac" x="13" y="13" width="7" height="7" rx="1.5"/>',
  sunrise: '<path d="M2.5 17.5h19M6 20.5h12"/><path d="M5.5 17.5a6.5 6.5 0 0 1 13 0"/><path class="ac" d="M12 5v2.6M4.9 8.9l1.8 1.5M19.1 8.9l-1.8 1.5M2.6 13.6h2M19.4 13.6h2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/><path class="ac" d="M8 10.5a2.5 2.5 0 0 1 2.5-2.5"/>',
  key: '<circle cx="7.5" cy="16" r="4"/><path d="M10.4 13.1L20 3.5M16.2 7.3l2.8 2.8M18.3 5.2l2 2"/><circle class="ac" cx="7.5" cy="16" r="1.2"/>',
  flow: '<rect x="3" y="3.5" width="7" height="5" rx="1.2"/><rect x="14" y="3.5" width="7" height="5" rx="1.2"/><rect x="8.5" y="15.5" width="7" height="5" rx="1.2"/><path class="ac" d="M10 6h4M17.5 8.5V12H12v3.5"/>',
  box: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path class="ac" d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
  gauge: '<path d="M3.5 17a8.5 8.5 0 1 1 17 0"/><path d="M6.4 11.4l1.2.9M12 8.4v1.4M17.6 11.4l-1.2.9M3.5 20h17"/><path class="ac" d="M12 17l3.8-4.8"/><circle class="ac" cx="12" cy="17" r="1.3"/>',
  cap: '<path d="M2 9.5l10-5 10 5-10 5z"/><path d="M6 11.5v4.8c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.8"/><path class="ac" d="M22 9.5V15"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle class="ac" cx="12" cy="12" r="1.4"/>',
  map: '<path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/><path class="ac" stroke-dasharray="1.4 1.8" d="M5 15c2.5-3 4.5-1 7-4s4-2.8 7-3.5"/>',
  magnet: '<path d="M6 3.5h4V11a2 2 0 0 0 4 0V3.5h4V11a6 6 0 0 1-12 0z"/><path class="ac" d="M6 7.5h4M14 7.5h4"/>',
  pencil: '<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/><path d="M14.5 6.5l3 3"/><path class="ac" d="M13 20h7"/>',
  chartsearch: '<path d="M3 20.5h8M5 20.5v-5M8.5 20.5v-8"/><circle class="ac" cx="15.5" cy="10.5" r="4"/><path class="ac" d="M18.4 13.4l3 3"/>',
  cycle: '<path d="M19.5 12a7.5 7.5 0 0 1-13.2 4.9M4.5 12a7.5 7.5 0 0 1 13.2-4.9"/><path d="M18 3.5v3.7h-3.7M6 20.5v-3.7h3.7"/><text class="acf" x="12" y="15.4" text-anchor="middle">£</text>',
  book: '<path d="M5 4.5h11a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/><path class="ac" d="M9 7.5h6M9 10.5h4"/>',
  pie: '<path d="M20.5 13.5A8.5 8.5 0 1 1 10.5 3.5v10z"/><path class="ac" d="M13.5 2.8a8.5 8.5 0 0 1 7.7 7.7h-7.7z"/>',
  report: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path class="ac" d="M9.5 17.5v-3M12.5 17.5V12M15.5 17.5v-2"/>',
  bulb: '<path d="M9 17.5h6M10 20.5h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"/><path class="ac" d="M10.3 9.3A2 2 0 0 1 12 7.8"/>',
  columns: '<path d="M3 9l9-5 9 5z"/><path d="M5.5 9.5v7M9.8 9.5v7M14.2 9.5v7M18.5 9.5v7M4 17h16M3 20.5h18"/><circle class="ac" cx="12" cy="6.8" r="1"/>',
  contract: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 9.5h6M9 12.5h6"/><path class="ac" d="M8.8 17.6c1-1.6 1.8-1.6 2.3 0 .5 1.5 1.3 1.5 2.2 0 .7-1.1 1.5-1 2.5-.3"/>',
  clipboard: '<rect x="9" y="3" width="6" height="3.5" rx="1"/><path d="M9 4.8H6.5A1.5 1.5 0 0 0 5 6.3v13.2A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V6.3a1.5 1.5 0 0 0-1.5-1.5H15"/><path class="ac" d="M8.5 13.5l2.5 2.5 4.5-4.8"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><path class="ac" d="M12 14.5V17"/><circle class="ac" cx="12" cy="14.3" r=".9"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path class="ac" d="M3.6 6.2l8.4 6.8 8.4-6.8"/>',
  chat: '<path d="M4 5h16v11H9.5L5 19.5V16H4z"/><path class="ac" stroke-width="2.2" d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path class="ac" d="M10.8 18.3h2.4"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle class="ac" cx="12" cy="9.5" r="2.5"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path class="ac" d="M9 11h6M9 14h6M9 17h4"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  coins: '<ellipse cx="12" cy="6.5" rx="7.5" ry="2.7"/><path d="M4.5 6.5v5c0 1.5 3.4 2.7 7.5 2.7s7.5-1.2 7.5-2.7v-5"/><path class="ac" d="M4.5 11.5v5c0 1.5 3.4 2.7 7.5 2.7s7.5-1.2 7.5-2.7v-5"/>',
  trenddown: '<path d="M3 20.5h18"/><path class="ac" d="M3.5 5.5L9 11l3.5-3.5 7.5 7.5M20 10v5h-5"/>',
  shop: '<path d="M4.5 10.5v10h15v-10"/><path d="M3 10.5L5 4h14l2 6.5z"/><path class="ac" d="M9.5 20.5v-5h5v5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path class="ac" d="M12 7v5l3.5 2"/>',
  exit: '<path d="M14 4h4.5a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5H14"/><path class="ac" d="M4 12h10.5M10 7.5l4.5 4.5-4.5 4.5"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  cross: '<path d="M7 7l10 10M17 7L7 17"/>',
  arrow: '<path d="M4 12h15M13.5 6.5L19 12l-5.5 5.5"/>',
  arrowLeft: '<path d="M20 12H5M10.5 6.5L5 12l5.5 5.5"/>',
  arrowUpRight: '<path d="M7 17L17 7M8.5 7H17v8.5"/>',
  copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h3.5"/>',
} as const;

export type IconName = keyof typeof ICONS;

export default function Icon({ name, className = "", title }: { name: IconName; className?: string; title?: string }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}
