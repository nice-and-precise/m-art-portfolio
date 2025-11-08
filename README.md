# M_ART - Art Portfolio & Gallery

A modern, performant art portfolio and gallery website built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 **Beautiful Gallery** - Showcase your artwork with optimized image loading
- ⚡ **Lightning Fast** - Built with Next.js 14 and Server Components
- 📱 **Fully Responsive** - Perfect on all devices and screen sizes
- 🔍 **SEO Optimized** - Great for visibility and discoverability
- 🎯 **TypeScript** - Type-safe code for reliability
- 💅 **Tailwind CSS** - Beautiful, customizable styling
- 📊 **Performance First** - Optimized images and Core Web Vitals

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 📖 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup guide
- **[CLAUDE.md](CLAUDE.md)** - Project context for Claude Code
- **[STANDARDS.md](STANDARDS.md)** - Code standards and conventions

## 🎯 Project Structure

```
M_ART/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── gallery/        # Gallery page
│   │   ├── about/          # About page
│   │   └── contact/        # Contact page
│   ├── components/          # React components
│   │   ├── ui/             # UI components
│   │   ├── gallery/        # Gallery components
│   │   └── layout/         # Layout components
│   ├── lib/                 # Utilities and helpers
│   └── types/               # TypeScript types
├── public/
│   └── images/              # Image assets
├── docs/                    # Additional documentation
├── tests/                   # Test files
└── .claude/                 # Claude Code configuration
```

## 🎨 Adding Your Artwork

1. **Prepare your images:**
   - Optimize for web (< 500KB recommended)
   - Format: WebP, AVIF, or JPG
   - Recommended max size: 2000x2000px

2. **Add to project:**
   - Place images in `public/images/gallery/`
   - Create thumbnails in `public/images/thumbnails/`

3. **Update gallery:**
   - Edit `src/app/gallery/page.tsx`
   - Add artwork data and components

See [SETUP.md](SETUP.md) for detailed instructions.

## 🛠️ Available Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
```

### Code Quality
```bash
npm run lint         # Check code quality
npm run lint:fix     # Fix lint issues
npm run format       # Format code
npm run type-check   # TypeScript check
npm run validate     # Run all checks
```

### Testing
```bash
npm test             # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

## 🎨 Customization

### Update Site Information

Edit `.env.local`:
```bash
NEXT_PUBLIC_SITE_NAME=Your Name
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### Change Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Your color palette
      }
    }
  }
}
```

### Update Metadata

Edit `src/app/layout.tsx` for SEO and social sharing.

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms
- **Netlify**: Build command `npm run build`, publish `.next`
- **Custom**: Build with `npm run build`, serve with `npm start`

See [SETUP.md](SETUP.md) for detailed deployment instructions.

## 📦 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/react)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)

## 🤖 Claude Code Integration

This project is optimized for development with Claude Code:

- Complete project context in [CLAUDE.md](CLAUDE.md)
- Skills system in `.claude/skills/`
- Automated code quality checks
- Comprehensive documentation

## 📝 Code Standards

All code follows the standards defined in [STANDARDS.md](STANDARDS.md):

- TypeScript strict mode
- Next.js best practices
- Tailwind CSS conventions
- 80%+ test coverage
- Accessibility standards

## 🔒 Environment Variables

Create `.env.local` from `.env.example`:

```bash
# Required
NEXT_PUBLIC_SITE_NAME=M_ART
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional (for future features)
# NEXT_PUBLIC_GA_ID=          # Google Analytics
# SMTP_HOST=                   # Contact form
# DATABASE_URL=                # If using database
```

## 🐛 Troubleshooting

See [SETUP.md](SETUP.md#troubleshooting) for common issues and solutions.

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🙏 Acknowledgments

Built with modern web technologies and best practices, structured for easy development with Claude Code.

---

**Ready to showcase your art?** 🎨

```bash
npm install && npm run dev
```

For detailed setup instructions, see [SETUP.md](SETUP.md).
