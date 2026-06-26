import { IThemeRGB } from '../types';

/**
 * Default light theme
 * RGB values extracted from the existing CSS variables
 */
export const defaultTheme: IThemeRGB = {
  // Text colors
  'rgb-text-primary': '33 33 33', // #212121 (gray-800)
  'rgb-text-secondary': '66 66 66', // #424242 (gray-600)
  'rgb-text-secondary-alt': '89 89 89', // #595959 (gray-500)
  'rgb-text-tertiary': '89 89 89', // #595959 (gray-500)
  'rgb-text-warning': '245 158 11', // #f59e0b (amber-500)

  // Ring colors
  'rgb-ring-primary': '176 28 58', // #B01C3A (Agribank primary)

  // Header colors
  'rgb-header-primary': '255 255 255', // #fff (white)
  'rgb-header-hover': '245 237 238', // #F5EDEE (Agribank primary light)
  'rgb-header-button-hover': '245 237 238', // #F5EDEE (Agribank primary light)

  // Surface colors
  'rgb-surface-active': '250 243 244', // #FAF3F4 (Agribank row hover)
  'rgb-surface-active-alt': '245 237 238', // #F5EDEE (Agribank primary light)
  'rgb-surface-hover': '245 237 238', // #F5EDEE (Agribank primary light)
  'rgb-surface-hover-alt': '250 243 244', // #FAF3F4 (Agribank row hover)
  'rgb-surface-primary': '255 255 255', // #fff (white)
  'rgb-surface-primary-alt': '248 248 248', // #F8F8F8 (Agribank background)
  'rgb-surface-primary-contrast': '245 237 238', // #F5EDEE (Agribank primary light)
  'rgb-surface-secondary': '248 248 248', // #F8F8F8 (Agribank background)
  'rgb-surface-secondary-alt': '250 243 244', // #FAF3F4 (Agribank row hover)
  'rgb-surface-tertiary': '245 237 238', // #F5EDEE (Agribank primary light)
  'rgb-surface-tertiary-alt': '255 255 255', // #fff (white)
  'rgb-surface-dialog': '255 255 255', // #fff (white)
  'rgb-surface-submit': '176 28 58', // #B01C3A (Agribank primary)
  'rgb-surface-submit-hover': '152 23 51', // #981733 (Agribank primary hover)
  'rgb-surface-destructive': '185 28 28', // #b91c1c (red-700)
  'rgb-surface-destructive-hover': '153 27 27', // #991b1b (red-800)
  'rgb-surface-chat': '255 255 255', // #fff (white)

  // Border colors
  'rgb-border-light': '231 183 192', // #E7B7C0 (Agribank border)
  'rgb-border-medium': '231 183 192', // #E7B7C0 (Agribank border)
  'rgb-border-medium-alt': '231 183 192', // #E7B7C0 (Agribank border)
  'rgb-border-heavy': '231 183 192', // #E7B7C0 (Agribank border)
  'rgb-border-xheavy': '176 28 58', // #B01C3A (Agribank primary)

  // Brand colors
  'rgb-brand-purple': '176 28 58', // #B01C3A (Agribank primary)

  // Presentation
  'rgb-presentation': '255 255 255', // #fff (white)

  // Utility colors (mapped to existing colors for backwards compatibility)
  'rgb-background': '255 255 255', // Same as surface-primary
  'rgb-foreground': '17 17 17', // Same as text-primary
  'rgb-primary': '235 235 235', // Same as surface-active
  'rgb-primary-foreground': '0 0 0', // Same as surface-primary-contrast
  'rgb-secondary': '247 247 248', // Same as surface-secondary
  'rgb-secondary-foreground': '66 66 66', // Same as text-secondary
  'rgb-muted': '250 250 250', // Same as surface-tertiary
  'rgb-muted-foreground': '120 120 120', // Same as text-tertiary
  'rgb-accent': '245 245 245', // Same as surface-active-alt
  'rgb-accent-foreground': '17 17 17', // Same as text-primary
  'rgb-destructive-foreground': '17 17 17', // Same as text-primary
  'rgb-border': '215 215 215', // Same as border-medium
  'rgb-input': '230 230 230', // Same as border-light
  'rgb-ring': '180 180 180', // Same as ring-primary
  'rgb-card': '247 247 248', // Same as surface-secondary
  'rgb-card-foreground': '17 17 17', // Same as text-primary
};
