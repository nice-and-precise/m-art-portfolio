# Skills Quick Reference

One-page guide to creating effective skills. For complete details, see [creating-skills/SKILL.md](creating-skills/SKILL.md) and [reference/anthropic-best-practices.md](reference/anthropic-best-practices.md).

## The 30-Second Summary

**Skills = TDD for documentation**
1. RED: Test without skill (document failures)
2. GREEN: Write skill (address failures)
3. REFACTOR: Close loopholes (re-test)

**Iron Law**: No skill without failing test first.

## Skill Structure Template

````markdown
---
name: action-oriented-name
description: What it does + when to use it. Include key terms for discovery.
version: 1.0.0
languages: all
---

# Skill Name

## Overview
Core principle in 1-2 sentences.

## When to Use
- Symptoms and specific situations
- When NOT to use

## Quick Reference
| Operation | How To |
|-----------|--------|
| Common task | Brief instruction |

## Implementation
[Code/instructions - inline if <50 lines]
See [reference.md](reference.md) for details

## Common Mistakes
- What goes wrong + fix
````

## Naming Conventions

**Use gerund form (verb + -ing):**
- ✅ `creating-skills`, `processing-pdfs`, `analyzing-data`
- ❌ `helper`, `utils`, `pdf-stuff`

**Requirements:**
- Lowercase letters, numbers, hyphens only
- Max 64 characters
- No reserved words (anthropic, claude)

## Description Best Practices

**Include WHAT + WHEN + KEY TERMS:**

✅ **Good:**
```yaml
description: Extract text and tables from PDF files, fill forms, merge documents.
  Use when working with PDF files, PDFs, forms, document extraction, or .pdf files.
```

❌ **Bad:**
```yaml
description: Helps with documents
```

**Always third person:**
- ✅ "Processes Excel files"
- ❌ "I can help you process files"

## File Organization

### Simple Skill (everything fits)
```
skill-name/
  SKILL.md
```

### Skill with References
```
skill-name/
  SKILL.md          # Overview, < 500 lines
  reference.md      # Detailed docs
  examples.md       # Usage examples
```

### Skill with Tools
```
skill-name/
  SKILL.md
  scripts/
    analyze.py
    validate.py
```

## Key Principles Checklist

**Conciseness:**
- [ ] Assume Claude is smart
- [ ] Only add context Claude doesn't have
- [ ] SKILL.md < 500 lines
- [ ] Challenge each paragraph

**Degrees of Freedom:**
- High freedom = text instructions (many valid approaches)
- Medium freedom = pseudocode (preferred pattern, some flexibility)
- Low freedom = specific scripts (fragile, one right way)

**Progressive Disclosure:**
- [ ] SKILL.md = overview
- [ ] Details in separate files
- [ ] References one level deep (not nested)
- [ ] Files >100 lines have table of contents

**Workflows:**
- [ ] Complex tasks use checklists
- [ ] Validation loops for quality-critical work
- [ ] Clear step-by-step instructions

## Common Patterns

### Checklist Pattern
````markdown
Copy this checklist:

\`\`\`
Task Progress:
- [ ] Step 1: Action
- [ ] Step 2: Action
- [ ] Step 3: Validate
\`\`\`
````

### Validation Loop Pattern
```markdown
1. Make changes
2. Validate: `python validate.py`
3. If fails: fix and validate again
4. Only proceed when passes
```

### Progressive Disclosure Pattern
```markdown
## Quick Start
[Basic usage here]

## Advanced
**Feature A**: See [feature-a.md](feature-a.md)
**Feature B**: See [feature-b.md](feature-b.md)
```

## Testing Requirements

**Before writing:**
- [ ] Create 3+ pressure scenarios
- [ ] Run without skill (document baseline)
- [ ] Identify specific failures/rationalizations

**After writing:**
- [ ] Run same scenarios with skill
- [ ] Verify compliance
- [ ] Find new rationalizations → add counters → re-test

**Quality gates:**
- [ ] Tested with all target models (Haiku/Sonnet/Opus)
- [ ] Tested in real usage scenarios
- [ ] Team feedback incorporated

## Claude Search Optimization (CSO)

**Make skills discoverable:**

1. **Rich when_to_use** - symptoms, not abstractions
   ```yaml
   when_to_use: When tests are flaky, timing-dependent, fail in CI,
     use setTimeout/sleep, or timeout when run in parallel
   ```

2. **Keywords everywhere** - errors, symptoms, tools
   - Error messages: "ENOTEMPTY", "timeout", "race condition"
   - Symptoms: "flaky", "hanging", "zombie"
   - Tools: actual command names, libraries

3. **Descriptive names** - verb-first, gerunds
   - ✅ `condition-based-waiting` > `async-helpers`

4. **Content repetition** - mention key concepts in:
   - description
   - when_to_use
   - overview
   - section headers

## Anti-Patterns to Avoid

❌ **Narrative storytelling** - "In session 2025-10-03, we found..."
❌ **Multiple language examples** - example-js.js, example-py.py
❌ **Windows paths** - `scripts\helper.py`
❌ **Too many options** - "Use pypdf, or pdfplumber, or..."
❌ **Magic numbers** - `TIMEOUT = 47` without explanation
❌ **Time-sensitive info** - "Before August 2025..."
❌ **Nested references** - SKILL.md → file1.md → file2.md
❌ **Generic labels** - helper1, step2, pattern3

## For Skills with Code

**Scripts should:**
- [ ] Handle errors explicitly (don't punt to Claude)
- [ ] Document all parameters (no "voodoo constants")
- [ ] Use forward slashes in paths
- [ ] List required packages
- [ ] Provide clear error messages

**Validation pattern:**
```markdown
1. Create plan file (e.g., changes.json)
2. Validate plan: `python validate.py plan.json`
3. Fix errors if any
4. Execute plan
5. Verify results
```

## TDD for Skills Mapping

| TDD Concept | Skill Creation |
|-------------|----------------|
| Test case | Pressure scenario with subagent |
| Test fails (RED) | Agent violates rule without skill |
| Write code (GREEN) | Write skill addressing violations |
| Test passes | Agent complies with skill |
| Refactor | Close loopholes, re-verify |

## 5-Minute Skill Creation

1. **RED (2 min)**: Run scenario without skill, note failures
2. **GREEN (2 min)**: Write minimal skill addressing those failures
3. **REFACTOR (1 min)**: Add one explicit counter for rationalization

Then iterate based on usage.

## Common Questions

**Q: How long should SKILL.md be?**
A: Under 500 lines. Use progressive disclosure for more.

**Q: When should I create a skill?**
A: When technique wasn't obvious, applies broadly, you'd reference again.

**Q: What's the difference between CLAUDE.md and skills?**
A: CLAUDE.md = project-specific. Skills = reusable across projects.

**Q: How do I know if my skill works?**
A: Test it. Watch an agent fail without it, succeed with it.

## Resources

**In this repository:**
- [creating-skills/SKILL.md](creating-skills/SKILL.md) - Complete TDD approach
- [reference/anthropic-best-practices.md](reference/anthropic-best-practices.md) - Anthropic's official guidance
- [reference/graphviz-conventions.dot](reference/graphviz-conventions.dot) - Flowchart style guide
- [reference/persuasion-principles.md](reference/persuasion-principles.md) - Psychology of compliance

**External:**
- Anthropic Docs: https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/
- Anthropic Skills Repo: https://github.com/anthropics/skills
- Awesome Claude Skills: https://github.com/ComposioHQ/awesome-claude-skills

## The Bottom Line

1. **Test first** - No skill without failing test
2. **Be concise** - Assume Claude is smart
3. **Progressive disclosure** - SKILL.md = overview
4. **Make discoverable** - Rich descriptions, keywords
5. **Iterate** - Real usage reveals gaps

**Remember**: Skills are living documentation. Test them like code.
