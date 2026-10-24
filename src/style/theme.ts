// The app's theme: every color it uses, in one place.
//
// - ui: page chrome per color mode (dark sampled from the Claude Code app; light mirrors it)
// - accent: highlights shared by both modes
// - chart: neutral chart parts; mid-tones that read on light and dark backgrounds
// - categories, apps, status, palette: default data colors, kept muted (no neon)
//
// Stylesheets get every value as a SCSS variable named after its path, e.g.
// ui.dark.page -> $aw-ui-dark-page (injected by vite.config.ts). Charts and
// categories import this file directly. Colors that depend on the mode at runtime
// are also CSS variables (--aw-surface, --bs-body-color, ...; see style/bootstrap.scss).

export const ui = {
  dark: {
    page: '#151515',
    surface: '#20201f', // cards, menus, dialogs, inputs
    hover: '#2b2b2a',
    subtle: '#1a1a19',
    border: '#3a3a38',
    text: '#f0efec',
    textMuted: '#9b9a98',
    emphasis: '#ffffff',
    link: '#e6a23c',
    linkHover: '#f0bb66',
    code: '#e07a76',
    scrollbar: '#5a5957',
  },
  light: {
    page: '#fafaf9',
    surface: '#ffffff',
    hover: '#f0efec',
    subtle: '#f5f5f3',
    border: '#dad9d5',
    text: '#151515',
    textMuted: '#6e6d6a',
    emphasis: '#000000',
    link: '#8f5f00',
    linkHover: '#6e4900',
    code: '#b83b3b',
  },
};

// Thickness of borders around cards, panels, inputs and buttons
export const borderWidth = '2px';

export const accent = {
  primary: '#e6a23c', // amber: selected items, active tab, buttons (dark text on it)
  info: '#2a78d6',
  success: '#4e9a6b',
  danger: '#c9524c',
};

export const chart = {
  neutral: '#7d7b76', // bars and arcs without a category
  text: '#8e8c86', // axis and tick labels
  line: '#6b6a66', // ticks, grid lines, links
  selected: accent.primary,
  focused: '#6e9bd1',
  // Labels drawn on top of a bar: whichever contrasts better with the bar
  onBarDark: '#151515',
  onBarDarkMuted: '#3d3c39',
  onBarLight: '#ffffff',
  onBarLightMuted: '#e3e2df',
};

// Default category colors (categories without a color inherit their parent's)
export const categories = {
  work: '#64a57a',
  media: '#c9675f',
  games: '#cc8650',
  video: '#c9675f',
  socialMedia: '#c4a24c',
  music: '#94ab58',
  comms: '#5aa0ae',
  uncategorized: chart.neutral,
};

// Activity status (AFK watcher)
export const afkStatus = {
  afk: '#a3a19b',
  notAfk: '#64a57a',
  hibernating: '#c4a24c',
};

// Fallback colors for apps and sites without a category, picked by name hash
export const palette = ['#6e9bd1', '#c4a24c', '#c9675f', '#64a57a'];

// Known apps and sites
export const apps = {
  'google-chrome': '#6e9bd1',
  chromium: '#7fa9d6',
  firefox: '#cc8650',
  spotify: '#5aa883',
  alacritty: '#c4a24c',
  vue: '#5aa883',
  python: '#5a86b3',
  javascript: '#b9789b',
  localhost: chart.text,
  'github.com': '#9a85c8',
  'stackoverflow.com': '#cc8650',
  'google.com': '#5aa0ae',
  'google.se': '#5aa0ae',
  'messenger.com': '#6e86bf',
  'facebook.com': '#6e86bf',
};

/** Every value above as SCSS variable declarations, e.g. `$aw-ui-dark-page: #151515;`. */
export function scssVariables(): string {
  const lines: string[] = [];
  const walk = (value: unknown, path: string[]) => {
    if (typeof value === 'string') {
      const name = path.map(p => p.replace(/[A-Z]/g, c => '-' + c.toLowerCase())).join('-');
      lines.push(`$aw-${name.replace(/[^a-z0-9-]/g, '-')}: ${value};`);
    } else if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) walk(v, [...path, k]);
    }
  };
  walk({ ui, accent, chart, categories, afkStatus, apps, borderWidth }, []);
  return lines.join('\n') + '\n';
}
