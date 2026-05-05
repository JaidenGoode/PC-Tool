// Small helper to initialize and control the Liquid Glass theme from non-React code paths
const THEME_KEY = 'pc_tool_liquid_glass';

export function initThemeFromStorage() {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === 'true') document.body.classList.add('liquid-glass');
    else document.body.classList.remove('liquid-glass');
  } catch {}
}

export function setLiquidGlass(enabled) {
  try {
    if (enabled) document.body.classList.add('liquid-glass');
    else document.body.classList.remove('liquid-glass');
    localStorage.setItem(THEME_KEY, enabled ? 'true' : 'false');
  } catch {}
}

export function isLiquidGlassEnabled(){
  try { return localStorage.getItem(THEME_KEY) === 'true'; } catch { return false; }
}
