# Android 15 Material Design 3 Compliance

This document outlines how the mobile UI implementation follows Android 15 Material Design 3 standards.

## Typography Scale

The implementation uses the official Material Design 3 typography scale:

### Display Styles
- **Display Large**: 56px (3.5rem) - 400 weight, -0.25px letter-spacing
- **Display Medium**: 45px (2.8rem) - 400 weight, 0px letter-spacing  
- **Display Small**: 36px (2.25rem) - 400 weight, 0px letter-spacing

### Headline Styles
- **Headline Large**: 32px (2rem) - 400 weight, 0px letter-spacing
- **Headline Medium**: 28px (1.75rem) - 400 weight, 0px letter-spacing
- **Headline Small**: 24px (1.5rem) - 400 weight, 0px letter-spacing

### Title Styles
- **Title Large**: 22px (1.375rem) - 400 weight, 0px letter-spacing
- **Title Medium**: 16px (1rem) - 500 weight, 0.15px letter-spacing
- **Title Small**: 14px (0.875rem) - 500 weight, 0.1px letter-spacing

### Body Styles
- **Body Large**: 16px (1rem) - 400 weight, 0.5px letter-spacing
- **Body Medium**: 14px (0.875rem) - 400 weight, 0.25px letter-spacing
- **Body Small**: 12px (0.75rem) - 400 weight, 0.4px letter-spacing

### Label Styles
- **Label Large**: 14px (0.875rem) - 500 weight, 0.1px letter-spacing
- **Label Medium**: 12px (0.75rem) - 500 weight, 0.5px letter-spacing
- **Label Small**: 11px (0.6875rem) - 500 weight, 0.5px letter-spacing

## Color System

### Primary Colors
- **Primary**: #6750A4 (Material 3 primary)
- **On Primary**: #FFFFFF
- **Primary Container**: #EADDFF
- **On Primary Container**: #21005D

### Secondary Colors
- **Secondary**: #625B71
- **On Secondary**: #FFFFFF
- **Secondary Container**: #E8DEF8
- **On Secondary Container**: #1D192B

### Surface Colors
- **Surface**: #FFFBFE
- **On Surface**: #1C1B1F
- **Surface Variant**: #E7E0EC
- **On Surface Variant**: #49454F

### Outline Colors
- **Outline**: #79747E
- **Outline Variant**: #CAC4D0

## Spacing System

Material Design 3 uses a 4px base spacing unit:
- **0**: 0px
- **1**: 4px
- **2**: 8px
- **3**: 12px
- **4**: 16px
- **5**: 20px
- **6**: 24px
- **7**: 28px
- **8**: 32px
- **9**: 36px
- **10**: 40px
- **11**: 44px
- **12**: 48px
- **13**: 52px
- **14**: 56px
- **15**: 60px
- **16**: 64px

## Corner Radius

Material Design 3 corner radius system:
- **None**: 0px
- **Extra Small**: 4px
- **Small**: 8px
- **Medium**: 12px
- **Large**: 16px
- **Extra Large**: 28px
- **Full**: 9999px (pill shape)

## Component Standards

### App Bar
- **Height**: 64px minimum
- **Background**: Surface color with backdrop blur
- **Border**: 1px outline variant at bottom
- **Elevation**: Level 1 shadow

### Buttons
- **Height**: 40px minimum
- **Width**: 64px minimum (touch target)
- **Border Radius**: Full (pill shape)
- **Typography**: Label Large (14px, 500 weight)
- **Padding**: 10px 24px

### Input Fields
- **Height**: 56px minimum
- **Border Radius**: 4px (extra small)
- **Border**: 1px outline variant
- **Focus State**: 2px primary color border

### Cards
- **Border Radius**: 28px (extra large)
- **Border**: 1px outline variant
- **Elevation**: Level 1 shadow
- **Padding**: 24px (spacing 6)

### Sliders
- **Track Height**: 4px
- **Thumb Size**: 20px × 20px
- **Thumb Border**: 2px surface color

### Navigation Drawer
- **Width**: 280px
- **Background**: Surface color
- **Border**: 1px outline variant on right
- **Elevation**: Level 3 shadow

### Floating Action Button (FAB)
- **Size**: 56px × 56px
- **Border Radius**: 50%
- **Elevation**: Level 3 shadow
- **Hover Effect**: Scale 1.05

### Bottom Navigation
- **Height**: 80px minimum
- **Background**: Surface color
- **Border**: 1px outline variant at top
- **Elevation**: Level 2 shadow

## Touch Targets

All interactive elements follow Material Design 3 touch target guidelines:
- **Minimum Size**: 48px × 48px
- **Button Minimum**: 64px width
- **Input Minimum**: 56px height

## Elevation System

Material Design 3 elevation shadows:
- **Level 1**: 0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)
- **Level 2**: 0 2px 6px 2px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)
- **Level 3**: 0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.30)
- **Level 4**: 0 6px 10px 4px rgba(0, 0, 0, 0.15), 0 2px 4px 0 rgba(0, 0, 0, 0.30)
- **Level 5**: 0 8px 12px 6px rgba(0, 0, 0, 0.15), 0 4px 6px 0 rgba(0, 0, 0, 0.30)

## Animation Standards

### Duration
- **Standard**: 200ms
- **Complex**: 300ms

### Easing
- **Standard**: cubic-bezier(0.4, 0, 0.2, 1)
- **Enter**: cubic-bezier(0, 0, 0.2, 1)
- **Exit**: cubic-bezier(0.4, 0, 1, 1)

## Responsive Behavior

### Breakpoints
- **Mobile**: max-width: 899px
- **Small Mobile**: max-width: 600px

### Typography Scaling
On smaller screens, typography scales down appropriately:
- Display Large: 56px → 45px
- Display Medium: 45px → 36px
- Display Small: 36px → 28px
- Headline Large: 32px → 28px
- Headline Medium: 28px → 24px
- Headline Small: 24px → 22px

## Implementation Files

### Core Files
- `src/theme/mobileTheme.ts` - Material Design 3 theme configuration
- `src/styles/mobile.css` - Mobile-specific CSS with Material Design 3 variables
- `src/components/MobileHeader.tsx` - Mobile app bar with navigation drawer
- `src/components/MobileCalculatorWrapper.tsx` - Mobile calculator layout wrapper

### Key Features
- ✅ Proper typography scale implementation
- ✅ Material Design 3 color system
- ✅ Consistent spacing using 4px base unit
- ✅ Material Design 3 corner radius system
- ✅ Proper touch target sizes (48px minimum)
- ✅ Material Design 3 elevation shadows
- ✅ Responsive typography scaling
- ✅ Material Design 3 animation curves
- ✅ Safe area handling for notched devices
- ✅ Backdrop blur effects
- ✅ Ripple effects for touch interactions

## Browser Support

The implementation includes:
- WebKit backdrop-filter for iOS Safari
- CSS custom properties for theming
- Fallback fonts for cross-platform consistency
- Touch-friendly interactions
- Accessibility features (focus states, ARIA labels)

This implementation provides a native Android 15-like experience on mobile devices while maintaining the existing desktop functionality. 