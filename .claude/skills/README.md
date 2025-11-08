# Skills System

## Overview

The **skills system** is a knowledge management approach for documenting reusable techniques, patterns, and tools using Test-Driven Development principles.

**Core concept:** Skills are living documentation that you test with AI agents before deploying, ensuring they actually work.

## What Are Skills?

**Skills are:**
- Reference guides for proven techniques
- Reusable patterns across projects
- Tool documentation and workflows
- Best practices worth preserving

**Skills are NOT:**
- One-off solutions
- Project-specific code (that goes in `/features`)
- Narratives about how you solved a problem once

## Quick Start

### Using Existing Skills

Skills are organized by category in this directory:

```
.claude/skills/
├── creating-skills/      # How to create new skills
│   └── SKILL.md
├── reference/            # Supporting documentation
│   ├── graphviz-conventions.dot
│   └── persuasion-principles.md
└── [other-categories]/   # Your skills organized by topic
```

**To use a skill:**
1. Browse the directory structure or search for keywords
2. Read the SKILL.md file in the relevant category
3. Check the `when_to_use` section to confirm relevance
4. Follow the patterns and examples provided

### Creating New Skills

**Start here:** Read [.claude/skills/creating-skills/SKILL.md](.claude/skills/creating-skills/SKILL.md)

**TL;DR:**
1. **RED**: Test without the skill - document what goes wrong
2. **GREEN**: Write skill addressing those specific issues
3. **REFACTOR**: Close loopholes, re-test until bulletproof

**The Iron Law:** NO SKILL WITHOUT A FAILING TEST FIRST

## Skill Structure

Every skill follows this format:

```markdown
---
name: Human-Readable Name
description: One-line summary
when_to_use: Symptoms and situations (critical for discovery!)
version: 1.0.0
languages: all | [typescript, python] | etc
---

# Skill Name

## Overview
Core principle in 1-2 sentences

## When to Use
Symptoms, use cases, when NOT to use

## Quick Reference
Tables/bullets for common operations

## Implementation
Code examples, patterns, workflows

## Common Mistakes
What goes wrong + fixes
```

## File Organization

### Self-Contained Skill
```
skill-name/
  SKILL.md    # Everything inline
```

### Skill with Tools
```
skill-name/
  SKILL.md       # Overview + patterns
  example.ts     # Reusable code
  reference.md   # Heavy documentation
```

## Categories

Organize skills by topic:

- **creating-skills/** - Meta-skills about the skills system
- **testing/** - Testing techniques and patterns
- **debugging/** - Debugging workflows and tools
- **reference/** - API docs, conventions, research
- **[your-categories]/** - Add as needed

## Discovery

**Future Claude finds skills by:**
1. Searching the skills directory
2. Matching keywords in `when_to_use`
3. Scanning overview sections
4. Matching symptoms and error messages

**Optimize for discovery:**
- Rich `when_to_use` with symptoms
- Keywords throughout (errors, tools, patterns)
- Descriptive naming (verb-first, gerunds)
- Cross-references to related skills

## Quality Standards

All skills must:
- [ ] Be tested before deployment (RED-GREEN-REFACTOR)
- [ ] Have rich `when_to_use` section
- [ ] Include working examples
- [ ] Document common mistakes
- [ ] Keep content concise (aim for <500 words)
- [ ] Use proper cross-references (no `@` links to avoid context burn)

## Workflow Integration

### With CLAUDE.md Files

- **CLAUDE.md**: Project-specific context and conventions
- **Skills**: Reusable techniques applicable across projects

If it's specific to THIS project → CLAUDE.md
If it's reusable across projects → Skill

### With Feature Documentation

- **features/[name]/CLAUDE.md**: Feature-specific context
- **Skills**: General patterns the feature uses

Reference skills from feature docs, don't duplicate them.

## Maintenance

### Updating Skills

**When updating an existing skill:**
1. Test current version first (ensure it works)
2. Identify what needs to change
3. Test without the change (RED - show the problem)
4. Make the change (GREEN)
5. Re-test to verify improvement (REFACTOR)

**The Iron Law applies to edits too.**

### Deprecating Skills

When a skill becomes obsolete:
1. Mark in frontmatter: `deprecated: true`
2. Add deprecation notice at top
3. Link to replacement if applicable
4. Keep file for historical reference

```markdown
---
name: Old Technique
deprecated: true
replacement: .claude/skills/category/new-technique
---

# Old Technique

**⚠️ DEPRECATED**: This skill is obsolete. Use `.claude/skills/category/new-technique` instead.
```

## Best Practices

### Do
- ✅ Test skills before deploying
- ✅ Use descriptive, verb-first names
- ✅ Include symptoms in `when_to_use`
- ✅ Provide one excellent example
- ✅ Keep content concise
- ✅ Update when you find improvements
- ✅ Cross-reference related skills

### Don't
- ❌ Deploy untested skills
- ❌ Write narrative stories
- ❌ Duplicate content across skills
- ❌ Use generic labels (step1, helper2)
- ❌ Put code in flowcharts
- ❌ Create multi-language examples
- ❌ Use `@` links (burns context)

## External Resources

**Quick Start:**
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - One-page skill authoring guide

**Official Documentation:**
- Anthropic Skills Docs: https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/
- Anthropic Skills Repository: https://github.com/anthropics/skills
- Best Practices Guide: [reference/anthropic-best-practices.md](reference/anthropic-best-practices.md)

**Community Resources:**
- Awesome Claude Skills: https://github.com/ComposioHQ/awesome-claude-skills

**Reference Materials:**
- [reference/graphviz-conventions.dot](reference/graphviz-conventions.dot) - Flowchart style guide
- [reference/persuasion-principles.md](reference/persuasion-principles.md) - Psychology of compliance

## Getting Help

**To learn more:**
- Start with [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for fast overview
- Read [creating-skills/SKILL.md](creating-skills/SKILL.md) for complete TDD approach
- Check existing skills for examples
- See [reference/](reference/) for supporting docs and best practices

**When to create a skill:**
- Technique wasn't intuitively obvious
- You'd reference this across projects
- Pattern applies broadly
- Others would benefit

**When NOT to create a skill:**
- One-off solution
- Well-documented elsewhere
- Project-specific (use CLAUDE.md instead)

## The Bottom Line

**Skills = TDD for documentation**

Same discipline, same cycle (RED-GREEN-REFACTOR), same benefits.

Write test (pressure scenario) → Watch it fail (baseline) → Write skill (documentation) → Watch it pass (compliance) → Refactor (close loopholes).

No skill without failing test first. No exceptions.
