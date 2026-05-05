# Liquid Glass theme and Program UI refactor

This branch implements a new Liquid Glass theme and a unified, modern Program UI so all program-related screens match visually and behaviorally.

What was added
- src/styles/theme.css — centralized tokens, normal and liquid-glass styles, and reusable classes.
- src/components/ThemeToggle.jsx — a settings toggle that persists the user's preference.
- src/components/ProgramCard.jsx — single program card used across all lists.
- src/components/ProgramList.jsx — reusable program list with search and optional normalizer.
- src/utils/theme.js — small JS helpers for non-React code paths to initialize and toggle theme.

How to integrate
1. Import the stylesheet globally in your app entry (e.g. index.js or App.jsx):

   import './styles/theme.css';

2. Initialize theme on startup (for non-React entry points):

   import { initThemeFromStorage } from './utils/theme';
   initThemeFromStorage();

   If your app bootstraps through React, ThemeToggle already applies the class and persists the preference.

3. Replace your three program screens (Windows Apps & Features, External Software, All Programs) with ProgramList and pass a `normalize` function that maps your existing data to this shape:

   { id, name, publisher, version, iconUrl, actions }

   Example usage:

   <ProgramList
     programs={windowsAppsArray}
     normalize={(item) => ({
       id: item.packageId || item.name,
       name: item.displayName || item.name,
       publisher: item.publisher || item.vendor,
       version: item.version || item.installedVersion,
       iconUrl: item.iconPath,
       actions: [ { label: 'Uninstall', onClick: () => uninstall(item) }, { label: 'Open', onClick: () => open(item), primary: true } ]
     })}
     onOpen={(p) => open(p)}
   />

4. Apply the .glass-surface class to menus, sidebars and dropdowns where you want the Liquid Glass effect applied when enabled. For example:

   <div className="side-menu glass-surface">...</div>

Guidelines
- Keep interactive controls (buttons, badges, icons) unchanged so accents remain the same in both themes.
- Use the CSS variables (`--accent`, `--accent-2`) for accent colors everywhere.
- If you need higher contrast for accessibility, reduce `--glass-opacity` or add a higher-contrast toggle.

Notes
- This branch focuses on styling and the shared program UI. It intentionally keeps behavioral changes minimal — actions and uninstall flows remain wired to your existing logic but should be passed into the new components via `actions` or `onOpen` callbacks.

If you'd like, I'll now:
- Update the actual screens to use ProgramList (I can search the repo and patch the views to call ProgramList and add the normalize mapping),
- Tweak more visual details (typography sizes, spacing tokens) to match your existing brand, or
- Add an in-app accent color picker and contrast toggle.

Tell me which of the three follow-ups you'd like next and I'll continue working on the feature branch and open a PR ready for review.
