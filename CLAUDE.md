# M_ART - Art Portfolio & Gallery

<!-- Last updated: 2025-11-08 - Initial project setup -->

## Purpose

M_ART is a modern art portfolio and gallery website designed to beautifully showcase artwork with optimal performance, SEO, and user experience. Built for artists to display their work professionally online.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Optimization**: Next/Image
- **Testing**: Jest with React Testing Library
- **Code Quality**: ESLint + Prettier + TypeScript strict mode
- **Infrastructure**: Vercel-ready, Docker-ready, CI/CD via GitHub Actions
- **MCP Servers**: GitHub, Brave Search (templates ready)

### Key Patterns & Conventions
- File organization: App Router structure in `/src/app` directory
- Component-based architecture in `/src/components`
- Feature-based structure in `/features` directory
- Living documentation: Code and docs evolve together
- **Code Standards**: All code must follow [STANDARDS.md](STANDARDS.md)
  - Next.js best practices, React patterns
  - Tailwind CSS conventions, responsive design
  - Image optimization, performance benchmarks
  - See `docs/standards/` for detailed guidelines

### File Structure
```
M_ART/
├── CLAUDE.md                    # This file - project overview
├── CLAUDE.local.md              # Personal preferences (gitignored)
├── .claude/
│   ├── settings.json            # Team settings (in git)
│   ├── settings.local.json      # Personal settings (gitignored)
│   ├── agents/                  # Custom subagents
│   └── skills/                  # Reusable techniques & patterns
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── gallery/            # Gallery pages
│   │   ├── about/              # About page
│   │   └── contact/            # Contact page
│   ├── components/              # React components
│   │   ├── ui/                 # UI components (buttons, cards, etc.)
│   │   ├── gallery/            # Gallery-specific components
│   │   └── layout/             # Layout components (header, footer)
│   ├── lib/                     # Utility functions
│   ├── types/                   # TypeScript types
│   └── styles/                  # Global styles
├── public/
│   ├── images/                  # Image assets
│   └── fonts/                   # Font files
├── features/                    # Feature modules
│   └── [feature-name]/
│       ├── CLAUDE.md           # Feature-specific context
│       ├── requirements.md     # Detailed specifications
│       └── components/         # Feature components
├── docs/                        # Supporting documentation
│   ├── knowledge-base/         # Domain documentation
│   └── standards/              # Detailed coding standards
├── tests/                       # Test suites
│   ├── unit/                   # Unit tests
│   └── integration/            # Integration tests
└── STANDARDS.md                 # Code standards quick reference
```

## Development Practices

### Testing
- Framework: Jest with React Testing Library
- Run tests: `npm test`
- Coverage target: 80%+ (statements, branches, functions, lines)
- Test location: `tests/unit/`, `tests/integration/`
- Watch mode: `npm run test:watch`
- Coverage report: `npm run test:coverage`

### Code Quality
- Linter: ESLint with Next.js and TypeScript plugins
- Formatter: Prettier (configured for Tailwind)
- Type checking: TypeScript strict mode
- Pre-commit hooks: Yes (Husky + lint-staged)
- Commands:
  - Lint: `npm run lint`
  - Format: `npm run format`
  - Type check: `npm run type-check`
  - Validate all: `npm run validate`

### Git Workflow
- Branching: Feature branches from main
- Commits: Enforced via pre-commit hooks
- PR process: CI must pass (linting, tests, type-check)
- Main branch: Protected, auto-deploy ready
- Pre-commit: Runs lint-staged, validates env
- Pre-push: Runs tests, linting, type-checking

### Environment Setup
- Local development: `npm run dev`
- Install dependencies: `npm install`
- Environment variables: Copy `.env.example` to `.env.local`
- Complete setup: See [SETUP.md](SETUP.md)

## Gallery & Image Guidelines

### Image Optimization
- Use Next/Image for all artwork images
- Recommended formats: WebP, AVIF (with fallbacks)
- Image sizes: Provide multiple sizes for responsive loading
- Lazy loading: Enabled by default with Next/Image
- Quality: 80-85 for web display

### Performance Targets
- **Lighthouse Score**: 90+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Image loading**: Lazy load below the fold

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Gallery grid: 1 col (mobile), 2 col (tablet), 3+ col (desktop)
- Touch-friendly: Minimum 44x44px tap targets

## Common Pitfalls & Gotchas

- Next.js Image component requires width/height or fill prop
- Tailwind classes need to be complete strings (no dynamic concatenation)
- App Router uses Server Components by default - add 'use client' for interactivity
- Images in public/ are served from root (e.g., `/images/photo.jpg`)
- Environment variables need `NEXT_PUBLIC_` prefix for client-side access

## Build & Deploy

### Local Development
```bash
npm run dev              # Start development server (localhost:3000)
npm run test:watch       # Run tests in watch mode
npm run lint             # Check code quality
```

### Build Process
```bash
npm run clean            # Clean previous builds
npm run build            # Next.js production build
npm start                # Run production build locally
```

### Deployment
- **Platform**: Vercel (recommended), Netlify, or custom
- **Process**: CI/CD via GitHub Actions (configured)
- **CI runs on**: Every push, every PR
- **Automated**: Linting, testing, type-checking, building
- **Preview**: Automatic preview deployments for PRs
- **Production**: Deploy from main branch

## Active Decisions & Standards

### Current Implementation Choices
- Next.js 14 with App Router (modern, performant)
- Tailwind CSS for styling (utility-first, responsive)
- TypeScript strict mode (type safety)
- Server Components first, Client Components when needed
- Image optimization with Next/Image

### Known Issues & TODOs
- [ ] Set up image CDN or optimization service
- [ ] Configure contact form handling
- [ ] Add gallery filtering/search
- [ ] Set up analytics

## Skills System

This project uses a **Skills system** for documenting reusable techniques, patterns, and tools using Test-Driven Development principles.

**Location**: See [.claude/skills/](.claude/skills/) for the complete skills repository.

**Quick Start**:
- Browse existing skills in [.claude/skills/](.claude/skills/)
- Read [.claude/skills/creating-skills/SKILL.md](.claude/skills/creating-skills/SKILL.md) to create new skills
- Follow the TDD approach: RED (test without) → GREEN (write skill) → REFACTOR (close loopholes)

## Claude Code Instructions

### When Making Changes
- Always update relevant CLAUDE.md files after significant changes
- Follow Next.js and React best practices
- Write tests for new components and features
- Update documentation atomically with code
- Optimize images and consider performance impact
- Ensure responsive design works on all breakpoints

### Permission Boundaries
- Sensitive files are listed in `.claude/settings.json`
- Always respect deny rules for secrets and environment files
- Use plan mode for architectural changes

### Project-Specific Context
- This is an art portfolio - prioritize visual quality and performance
- Images are the primary content - optimize aggressively
- SEO is important for artist visibility
- Responsive design is critical for galleries
- Keep UI clean and focused on the artwork

## Extending Claude's Capabilities

Claude's effectiveness can be enhanced with additional tools, access, and knowledge.

### Currently Enabled ✅
- File system access (working directory)
- Bash commands (with permission restrictions)
- Code execution (TypeScript, JavaScript, React)
- Git operations (status, diff, commit with hooks)
- Skills system with TDD approach
- **Testing Framework** (Jest + React Testing Library)
- **Development Environment** (ESLint, Prettier, TypeScript)
- **Next.js Framework** (App Router, Image optimization)

### Ready to Enable (Templates Created)
1. **GitHub MCP** - API key needed → See `.claude/mcp-servers/github-mcp.md`
2. **Brave Search MCP** - API key needed → See `.claude/mcp-servers/brave-search-mcp.md`
3. **Filesystem MCP** - Configure paths → See `.claude/mcp-servers/mcp-config.json`

### Setup Instructions
**Quick start:** See [SETUP.md](SETUP.md)
**API keys:** Copy `.env.example` to `.env.local` and fill in your keys

---

**Note**: This is a living document. Update it as the project evolves. Each feature in `/features` should have its own CLAUDE.md with feature-specific context.
