# 🎨 Tailwind CSS v4 Setup Guide

## ✅ Setup Completed

Tailwind CSS v4 has been successfully initialized for the React OAS Integration project.

---

## 📦 Installed Packages

- **tailwindcss**: ^4.1.18
- **@tailwindcss/postcss**: ^4.1.18
- **autoprefixer**: ^10.4.23
- **postcss**: ^8.5.6

---

## 📁 Configuration Files

### 1. `tailwind.config.js`

The main Tailwind configuration file with:

- Content paths for scanning React components
- Extended theme with custom colors
- Plugin configuration

### 2. `postcss.config.js`

PostCSS configuration with:

- @tailwindcss/postcss plugin
- Autoprefixer for browser compatibility
- cssnano for production optimization

### 3. `src/index.css`

Main CSS file with Tailwind import directive:

```css
@import "tailwindcss";
```

---

## 🚀 Usage Examples

### Basic Utility Classes

```jsx
// Typography
<h1 className="text-4xl font-bold text-gray-800">Title</h1>
<p className="text-lg text-gray-600">Paragraph</p>

// Layout
<div className="flex items-center justify-between">
  <div className="w-1/2">Left</div>
  <div className="w-1/2">Right</div>
</div>

// Spacing
<div className="p-8 m-4 mx-auto">Content</div>

// Colors & Background
<div className="bg-blue-500 text-white">Blue Box</div>

// Borders & Rounded Corners
<div className="border-2 border-gray-300 rounded-lg">Card</div>

// Shadows
<div className="shadow-lg hover:shadow-xl">Elevated Card</div>

// Responsive Design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  Responsive Grid
</div>
```

---

## 🎯 Test Component

A test component has been created at:

- **Path**: `src/components/TailwindTest.jsx`

To test Tailwind CSS, import and use this component:

```jsx
import TailwindTest from "./components/TailwindTest";

function App() {
  return (
    <div>
      <TailwindTest />
    </div>
  );
}
```

---

## 🎨 Custom Theme Configuration

The `tailwind.config.js` includes custom theme extensions:

### Custom Colors

```javascript
primary: {
  50: '#f0f9ff',
  100: '#e0f2fe',
  // ... more shades
  900: '#0c4a6e',
  950: '#082f49',
}
```

### Custom Fonts

```javascript
fontFamily: {
  sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', ...],
  mono: ['source-code-pro', 'Menlo', 'Monaco', ...],
}
```

---

## 🔧 Common Commands

### Development

```bash
npm start
```

The development server will automatically compile Tailwind classes.

### Build for Production

```bash
npm run build
```

Creates an optimized production build with purged unused CSS.

---

## 📚 Useful Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Playground](https://play.tailwindcss.com/)
- [Tailwind CSS Components](https://tailwindui.com/)
- [Awesome Tailwind CSS](https://github.com/aniftyco/awesome-tailwindcss)

---

## 💡 Best Practices

### 1. Use Utility Classes

Instead of writing custom CSS, use Tailwind's utility classes:

```jsx
// ✅ Good
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>

// ❌ Avoid
<button className="custom-button">Click me</button>
```

### 2. Responsive Design

Use responsive prefixes for different screen sizes:

```jsx
<div className="text-sm md:text-base lg:text-lg">Responsive Text</div>
```

### 3. Component Extraction

For repeated patterns, create React components:

```jsx
const Button = ({ children, variant = "primary" }) => {
  const baseClasses = "px-4 py-2 rounded font-semibold";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return <button className={`${baseClasses} ${variantClasses[variant]}`}>{children}</button>;
};
```

### 4. Use @apply for Complex Components

In your CSS files, use @apply for component-specific styles:

```css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}
```

---

## 🐛 Troubleshooting

### Styles Not Applying

1. Make sure `src/index.css` is imported in `src/index.js`
2. Check that your components are within the content paths in `tailwind.config.js`
3. Clear the build cache: `rm -rf node_modules/.cache`

### Development Server Issues

1. Restart the development server: `npm start`
2. Clear browser cache
3. Check for PostCSS errors in the terminal

### Production Build Issues

1. Ensure all file paths in `tailwind.config.js` are correct
2. Check for any missing dependencies
3. Run `npm run build` to see detailed error messages

---

## ✨ Next Steps

1. **Test the setup**: Import and render the `TailwindTest` component
2. **Customize theme**: Edit `tailwind.config.js` to match your design system
3. **Build components**: Start creating UI components with Tailwind classes
4. **Explore plugins**: Consider adding Tailwind plugins for forms, typography, etc.

---

**Setup Date**: January 22, 2026
**Tailwind Version**: 4.1.18
**Status**: ✅ Ready to use
