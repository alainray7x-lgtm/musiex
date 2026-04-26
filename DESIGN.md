# SoundWave — Music App Design Brief

**Direction**: Deep, immersive dark music platform. Vibrant cyan & purple accents signal interactivity and play states. Premium, energetic aesthetic inspired by modern music streaming but with stronger visual hierarchy and glowing accents.

**Tone**: Bold, modern, energetic. Music should feel alive — interactive elements glow, cards elevate on hover, typography breathes with hierarchy.

**Differentiation**: Glowing accent effects on UI (subtle cyan/purple shadows), elevated card layers, and sharp (0.5rem) vs rounded (1rem) shape contrast create visual movement without overdecoration.

## Color Palette

| Token | Light | Dark |
|-------|-------|------|
| background | 0.99 0 0 | 0.08 0 0 (#0A0E27) |
| foreground | 0.15 0 0 | 0.96 0 0 (#F5F5F5) |
| card | 1.0 0 0 | 0.13 0 0 (#1A1F3A) |
| primary | 0.35 0 0 | 0.70 0.15 262 (cyan) |
| accent | 0.35 0 0 | 0.72 0.17 296 (purple) |
| destructive | 0.55 0.22 25 | 0.65 0.19 22 (red) |

**Dark mode only.** Cyan + purple accents provide visual energy for music context; deep navy background reduces eye strain during long listening sessions.

## Typography

| Role | Font | Scale |
|------|------|-------|
| Display | Space Grotesk | 2rem–3.5rem |
| Body | General Sans | 0.875rem–1rem |
| Mono | Geist Mono | 0.75rem |

Space Grotesk display (bold) + General Sans body (regular) = strong geometric hierarchy. Mono for metadata (song duration, timestamps).

## Elevation & Depth

- **Flat**: Header, footer (0.2rem border-b/border-t, dark border)
- **Elevated**: Playlist cards, mini player, buttons (shadow-elevated: 0 20px 25px)
- **Interactive**: Accent glow on hover (shadow-glow-md: 0 0 30px accent@0.4)

Mini player sits on dark bg with 1px top border (accent color), album art casts subtle glow.

## Structural Zones

| Zone | Background | Border | Depth |
|------|------------|--------|-------|
| Header | card (0.13 0 0) | border-b (0.22 0 0) | flat |
| Main content | background (0.08 0 0) | none | base |
| Playlist cards | card (0.13 0 0) | subtle | elevated |
| Mini player | card (0.13 0 0) + 1px top (accent) | border-t (accent) | elevated |
| Footer | muted (0.20 0 0) | border-t (0.22 0 0) | flat |

## Spacing & Rhythm

- Container: 2rem padding
- Card gap: 1.5rem (grid)
- Component spacing: 0.5rem–1rem (tight hierarchy)
- Mini player height: 5rem (compact but informative)

## Component Patterns

- **Playlist Card**: Rounded (1rem), image + title + artist, hover shadow-glow-md
- **Song List**: Compact rows (play icon, title, artist, duration), hover bg-accent@0.1
- **Mini Player**: Album art (64px), progress bar (accent), controls (play/pause, skip, volume)
- **Premium Badge**: Small accent-colored pill top-right
- **Lyrics Modal**: Full viewport, dark bg, highlight current line in accent

## Motion

- **Transitions**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) (smooth)
- **Hover**: glow-md shadow + scale-102 (cards)
- **Active**: accent color + pulse-soft animation (2s)
- **Loading**: pulse animation on skeleton

## Constraints

- **No drag-to-reorder**: Songs display as static list
- **Stripe integration**: Checkout modal, upgrade prompt
- **Lyrics**: Teaser for free users, full for premium
- **6–8 demo songs** pre-loaded with metadata + cover art

## Signature Detail

**Glowing accent strip on mini player top border**: Connects visual energy of playing music to UI. Accent color (0.72 0.17 296 purple) creates brand recognition and signals active playback state.
