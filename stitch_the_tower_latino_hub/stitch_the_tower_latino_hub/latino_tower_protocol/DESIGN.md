---
name: Protocol Neon
colors:
  surface: '#121316'
  surface-dim: '#121316'
  surface-bright: '#38393c'
  surface-container-lowest: '#0d0e10'
  surface-container-low: '#1b1c1e'
  surface-container: '#1f2022'
  surface-container-high: '#292a2c'
  surface-container-highest: '#343537'
  on-surface: '#e3e2e5'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e3e2e5'
  inverse-on-surface: '#2f3033'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dce6'
  primary: '#e0fdff'
  on-primary: '#00373a'
  primary-container: '#00f2fe'
  on-primary-container: '#006a70'
  inverse-primary: '#00696f'
  secondary: '#ffc640'
  on-secondary: '#402d00'
  secondary-container: '#e3aa00'
  on-secondary-container: '#5a4100'
  tertiary: '#fff6e4'
  on-tertiary: '#3b2f00'
  tertiary-container: '#fed83a'
  on-tertiary-container: '#725e00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#00dce6'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#ffdf9f'
  secondary-fixed-dim: '#f9bd22'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#ffe173'
  tertiary-fixed-dim: '#e8c423'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#554500'
  background: '#121316'
  on-background: '#e3e2e5'
  surface-variant: '#343537'
  streak-red: '#FF0844'
  text-silver: '#E2E8F0'
  surface-gray: '#1A1C20'
  bronze-rank: '#CD7F32'
  glass-border: rgba(226, 232, 240, 0.1)
  neon-glow: rgba(0, 242, 254, 0.3)
typography:
  headline-xl:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Sora
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  stat-value:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 24px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-desktop: 64px
  margin-mobile: 16px
  container-max: 1280px
---

## Brand & Style

Protocol Neon is a high-octane, "Cyber-Tactical" design system tailored for performance-oriented gaming hubs and technical command centers. It blends **Glassmorphism** with **Retro-Futurism**, utilizing deep obsidian surfaces, vibrant neon cyan accents, and intentional data-density.

The aesthetic evokes a sense of "authorized access only" through:
- **Neon Underglows:** Subtle cyan shadows that simulate light emission on dark surfaces.
- **Data Grids:** Persistent background patterns that reinforce the technical, simulated environment.
- **Glossy Overlays:** Strategic use of backdrop blurs (16px+) to create depth without losing focus.
- **Urgent Accents:** High-contrast warnings in vivid reds and trophy golds to signify racy performance or elite status.

## Colors

The palette is anchored by a "Pure Black Floor" (#07080A), providing the necessary contrast for neon elements to pop.

- **Primary (Neon Cyan):** Used for interactive states, status indicators, and tactical highlights. It is the "energy source" of the UI.
- **Secondary (Trophy Gold):** Reserved for elite status, high-tier rankings, and "legendary" moments.
- **Neutral (Obsidian & Silver):** Deep grays form the container layers, while silver-white text provides high readability without the harshness of pure white.
- **Functional Red:** A high-saturation "Streak Red" is used exclusively for combat modes, heat-maps, or active rages.

## Typography

Typography is a hierarchy of technical precision. 

- **Display & Headlines:** Use **Sora** for its geometric, futuristic weight. Titles should often be set to `uppercase` to mimic military or terminal interfaces.
- **Body Content:** **Hanken Grotesk** provides a clean, modern contrast that remains legible against dark, blurred backgrounds.
- **Technical Metadata:** **JetBrains Mono** is mandatory for all labels, IDs, and secondary navigational elements, providing the "code-base" feel critical to the brand.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy within a centered 1280px container.

- **Grid:** Use a standard 12-column system for desktop, collapsing to a single-column stack on mobile.
- **Rhythm:** An 8px/4px base unit system ensures technical alignment.
- **Gutter & Margins:** Generous outer margins (64px) on desktop create a sense of focused "canvas" in the center of the screen.
- **Safe Areas:** Cards and glass panels use a standard 32px (8-unit) internal padding to maintain breathing room amidst high-density data.

## Elevation & Depth

Depth is not communicated via shadows alone, but through **translucency and luminosity**:

- **Floor Layer:** Pure black background with a 32px cyan grid (3% opacity).
- **Glass Layer:** `rgba(0, 0, 0, 0.6)` panels with 16px backdrop blur.
- **Interaction Layer:** Items being hovered or active gain a `0 0 15px rgba(0, 242, 254, 0.3)` outer glow.
- **Borders:** Thin (1px) borders using `rgba(226, 232, 240, 0.1)` define edges without creating heavy visual weight.

## Shapes

The shape language is primarily **Soft-Industrial**. 

- **Base Radius:** 4px (Soft) for most interactive elements like buttons and chips.
- **Container Radius:** 12px to 16px for large glass panels and hero sections.
- **Circle Elements:** Avatars and "Mode" toggles use full circles to contrast against the otherwise rigid grid.

## Components

### Buttons
- **Primary:** Solid Cyan (#00F2FE) background with black text. Sharp corners or minimal 4px radius.
- **Secondary/Ghost:** 1px Cyan border with JetBrains Mono text. Hover state fills the background with Cyan.

### Cards (Glass Panels)
- Must include `backdrop-filter: blur(16px)` and a subtle `0.1` opacity white border. 
- On hover, borders should brighten to Cyan.

### Inputs
- Bottom-border only for tactical search fields. 
- Include a `>` prefix in JetBrains Mono to reinforce the terminal aesthetic.

### Ranking Rows
- Zebra-striped with `rgba(255, 255, 255, 0.02)`.
- Rank numbers must use **Sora 800** with a color-matched drop shadow glow (Gold, Silver, or Bronze).

### Floating Action Button (FAB)
- Reserved for "Battle" or "Action" modes. Uses the high-contrast `streak-red` with a heavy outer pulse animation.