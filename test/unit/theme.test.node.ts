import { scssVariables, ui, accent, borderWidth } from '~/style/theme';

test('exposes theme values as $aw-* SCSS variables', () => {
  const scss = scssVariables();
  expect(scss).toContain(`$aw-ui-dark-page: ${ui.dark.page};`);
  expect(scss).toContain(`$aw-ui-light-text-muted: ${ui.light.textMuted};`);
  expect(scss).toContain(`$aw-accent-primary: ${accent.primary};`);
  expect(scss).toContain(`$aw-border-width: ${borderWidth};`);
  // Keys with dots become valid SCSS names
  expect(scss).toMatch(/^\$aw-apps-github-com: #[0-9a-f]{6};$/m);
  // Every line is a plain declaration
  for (const line of scss.trim().split('\n')) {
    expect(line).toMatch(/^\$aw-[a-z0-9-]+: [^;]+;$/);
  }
});
