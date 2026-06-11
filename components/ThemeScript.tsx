// Runs before first paint to restore saved theme and avoid flash.
export default function ThemeScript() {
  const script = `
    try {
      var t = JSON.parse(localStorage.getItem('anna-tweaks'));
      if (t) {
        if (t.theme) document.documentElement.dataset.theme = t.theme;
        if (t.photos === 'mono') document.documentElement.dataset.bw = '1';
        if (t.gutter) document.documentElement.style.setProperty('--gutter', t.gutter + 'px');
      }
    } catch(e) {}
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
