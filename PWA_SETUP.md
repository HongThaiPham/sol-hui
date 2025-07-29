# Sontine PWA Setup Guide

## Overview

Sontine has been configured as a Progressive Web App (PWA) with custom Sontine logo icons and full offline functionality.

## Icon Assets Created

### 1. Favicon
- **favicon.svg** (32x32) - Main favicon with Sontine logo
- **favicon-simple.svg** (16x16) - Ultra-simple version for small sizes

### 2. PWA Icons
- **icon-192.svg** (192x192) - Standard PWA icon
- **icon-512.svg** (512x512) - Large PWA icon with enhanced details
- **apple-touch-icon.svg** (180x180) - iOS optimized icon

### 3. Configuration Files
- **manifest.json** - PWA manifest with app configuration
- **browserconfig.xml** - Windows tile configuration
- **sw.js** - Service worker for offline functionality

## Icon Design Features

### Visual Elements
- **Outer Circle**: Blockchain network representation
- **Inner Circle**: Tontine group members
- **Member Dots**: 8 participants around the circle
- **Connection Lines**: Blockchain connections
- **Center "S"**: Sontine brand mark
- **Background**: Gradient from mint to light teal

### Color Palette
- **Primary**: `#00B49F` to `#14F1B2` (teal gradient)
- **Secondary**: `#134158` to `#00B49F` (navy to teal)
- **Background**: `#C5FFF8` to `#8DFFF0` (mint gradient)
- **Connections**: `#8DFFF0` (mint accent)

## PWA Manifest Configuration

```json
{
  "name": "Sontine - Tontine Meets Blockchain",
  "short_name": "Sontine",
  "description": "Join the future of rotating savings with Sontine...",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#C5FFF8",
  "theme_color": "#00B49F",
  "orientation": "portrait-primary"
}
```

### Key Features
- **Standalone Display**: Full-screen app experience
- **Portrait Orientation**: Optimized for mobile use
- **Custom Theme**: Sontine brand colors
- **App Shortcuts**: Quick actions for Join/Create tontine
- **Screenshots**: Desktop and mobile previews

## Next.js Integration

### Layout Configuration
```tsx
// Viewport configuration (Next.js 15+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#00B49F",
  colorScheme: "light",
};

// Metadata configuration
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  // ... other metadata
};
```

### Icon References
- **Favicon**: Automatically loaded by browsers
- **Apple Touch Icon**: iOS home screen icon
- **PWA Icons**: Used by manifest for app installation
- **Windows Tiles**: Configured via browserconfig.xml

## Service Worker Features

### Caching Strategy
```javascript
const CACHE_NAME = 'sontine-v1';
const urlsToCache = [
  '/',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg',
  '/apple-touch-icon.svg',
  '/manifest.json'
];
```

### Functionality
- **Install Event**: Cache essential resources
- **Fetch Event**: Serve from cache when offline
- **Activate Event**: Clean up old caches
- **Offline Support**: Basic offline functionality

## PWA Installer Component

### Features
- **Auto-detection**: Shows when PWA can be installed
- **Native Prompt**: Uses browser's install prompt
- **Dismissible**: User can dismiss the banner
- **Responsive**: Works on desktop and mobile

### Usage
```tsx
import { PWAInstaller } from "./components/PWAInstaller";

// Automatically included in layout
<PWAInstaller />
```

## Installation Experience

### Desktop (Chrome/Edge)
1. Install button appears in address bar
2. Custom install banner shows (if supported)
3. App installs to desktop/start menu
4. Runs in standalone window

### Mobile (iOS Safari)
1. Share button → "Add to Home Screen"
2. Custom icon appears on home screen
3. Launches in full-screen mode
4. Behaves like native app

### Mobile (Android Chrome)
1. "Add to Home Screen" prompt
2. Custom install banner
3. App drawer integration
4. Native app experience

## Testing PWA Features

### Lighthouse Audit
- **Performance**: Optimized loading
- **Accessibility**: WCAG compliant
- **Best Practices**: Modern web standards
- **SEO**: Search engine optimized
- **PWA**: All PWA criteria met

### Browser DevTools
1. **Application Tab**: Check manifest, service worker
2. **Network Tab**: Verify caching behavior
3. **Lighthouse**: Run PWA audit
4. **Console**: Check for errors

## File Structure

```
apps/web/public/
├── favicon.svg              # Main favicon
├── favicon-simple.svg       # Simple 16x16 version
├── icon-192.svg            # PWA icon 192x192
├── icon-512.svg            # PWA icon 512x512
├── apple-touch-icon.svg    # iOS icon 180x180
├── manifest.json           # PWA manifest
├── browserconfig.xml       # Windows tiles
└── sw.js                   # Service worker

apps/web/app/
├── layout.tsx              # Metadata & viewport config
└── components/
    └── PWAInstaller.tsx    # Install prompt component
```

## Browser Support

### Full PWA Support
- **Chrome**: ✅ Desktop & Mobile
- **Edge**: ✅ Desktop & Mobile
- **Firefox**: ✅ Limited (no install prompt)
- **Safari**: ✅ iOS 11.3+ (Add to Home Screen)

### Fallback Behavior
- **Older Browsers**: Standard website experience
- **No Service Worker**: Online-only functionality
- **No Manifest**: Regular bookmarking

## Benefits

### User Experience
- **App-like Feel**: Standalone window, no browser UI
- **Fast Loading**: Cached resources load instantly
- **Offline Access**: Basic functionality without internet
- **Home Screen**: Easy access like native apps

### Technical Benefits
- **No App Store**: Direct installation from web
- **Automatic Updates**: Always latest version
- **Cross-platform**: Works on all devices
- **SEO Friendly**: Still indexable by search engines

## Maintenance

### Regular Tasks
- **Update Icons**: When brand changes
- **Cache Strategy**: Optimize for performance
- **Manifest Updates**: Add new features
- **Service Worker**: Update caching logic

### Monitoring
- **Install Rates**: Track PWA installations
- **Offline Usage**: Monitor offline functionality
- **Performance**: Regular Lighthouse audits
- **User Feedback**: Collect PWA experience feedback

## Future Enhancements

### Planned Features
- [ ] Push notifications for tontine updates
- [ ] Background sync for offline actions
- [ ] Advanced caching strategies
- [ ] Native app store distribution
- [ ] Biometric authentication integration

### Advanced PWA Features
- [ ] Web Share API integration
- [ ] File System Access API
- [ ] Payment Request API
- [ ] Web Bluetooth for hardware wallets
- [ ] Geolocation for local tontines
