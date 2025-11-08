# Anthropic Skills Best Practices Reference

This document synthesizes best practices from Anthropic's official skills documentation. For complete details, see: https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/best-practices

## Core Principles

### 1. Concise is Key

**Context window is a public good** - your skill shares space with system prompt, conversation history, and other skills.

**Default assumption: Claude is already smart**
- Only add context Claude doesn't have
- Challenge each piece of information
- Avoid explaining what Claude already knows

**Example - Good (50 tokens):**
```markdown
## Extract PDF text

Use pdfplumber for text extraction:

\`\`\`python
import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
\`\`\`
```

**Example - Bad (150 tokens):**
```markdown
## Extract PDF text

PDF (Portable Document Format) files are a common file format...
[extensive explanation of PDFs and libraries]
```

### 2. Set Appropriate Degrees of Freedom

Match specificity to task fragility:

**High Freedom** (text instructions):
- Multiple valid approaches
- Context-dependent decisions
- Example: Code review checklist

**Medium Freedom** (pseudocode with parameters):
- Preferred pattern exists
- Some variation acceptable
- Example: Report generation template

**Low Freedom** (specific scripts, no parameters):
- Operations are fragile
- Consistency critical
- Example: Database migrations

**Analogy:**
- Narrow bridge with cliffs = Low freedom (one safe path)
- Open field = High freedom (many paths work)

### 3. Test With All Target Models

Skills act as additions to models. Test with all models you plan to use:

- **Haiku**: Does it provide enough guidance?
- **Sonnet**: Is it clear and efficient?
- **Opus**: Does it avoid over-explaining?

## YAML Frontmatter Requirements

### Name Field
- Maximum 64 characters
- Lowercase letters, numbers, hyphens only
- No XML tags
- No reserved words: "anthropic", "claude"

### Description Field
- Non-empty, maximum 1024 characters
- No XML tags
- **Must include:**
  - What the skill does
  - When to use it
  - Key terms for discovery

**Always write in third person** (description goes in system prompt):
- ✅ Good: "Processes Excel files and generates reports"
- ❌ Avoid: "I can help you process Excel files"
- ❌ Avoid: "You can use this to process Excel files"

## Naming Conventions

**Recommended: Gerund form (verb + -ing)**
- `processing-pdfs`
- `analyzing-spreadsheets`
- `managing-databases`
- `testing-code`

**Acceptable alternatives:**
- Noun phrases: `pdf-processing`
- Action-oriented: `process-pdfs`

**Avoid:**
- Vague: `helper`, `utils`, `tools`
- Generic: `documents`, `data`, `files`
- Reserved words: `anthropic-helper`, `claude-tools`

## Writing Effective Descriptions

Include both what AND when:

**Good:**
```yaml
description: Extract text and tables from PDF files, fill forms, merge documents.
  Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

**Good:**
```yaml
description: Analyze Excel spreadsheets, create pivot tables, generate charts.
  Use when analyzing Excel files, spreadsheets, tabular data, or .xlsx files.
```

**Bad:**
```yaml
description: Helps with documents
```

## Progressive Disclosure Patterns

SKILL.md = overview + table of contents. Details go in separate files.

**Keep SKILL.md body under 500 lines**

### Pattern 1: High-Level Guide with References

````markdown
---
name: pdf-processing
description: Extracts text and tables from PDF files, fills forms.
  Use when working with PDFs or document extraction.
---

# PDF Processing

## Quick start
[Basic usage here]

## Advanced features
**Form filling**: See [FORMS.md](FORMS.md)
**API reference**: See [REFERENCE.md](REFERENCE.md)
````

### Pattern 2: Domain-Specific Organization

```
bigquery-skill/
├── SKILL.md (overview)
└── reference/
    ├── finance.md
    ├── sales.md
    └── product.md
```

Claude loads only the relevant domain file.

### Pattern 3: Conditional Details

```markdown
# DOCX Processing

## Creating documents
Use docx-js. See [DOCX-JS.md](DOCX-JS.md).

## Editing documents
For simple edits, modify XML directly.

**For tracked changes**: See [REDLINING.md](REDLINING.md)
```

## File Organization Best Practices

### Keep References One Level Deep

**Claude may partially read nested files.** Keep all references one level from SKILL.md.

**Bad (too deep):**
```
SKILL.md → advanced.md → details.md → actual info
```

**Good (one level):**
```
SKILL.md → advanced.md (complete info)
SKILL.md → reference.md (complete info)
```

### Structure Long Files with Table of Contents

For files >100 lines, add TOC at top:

```markdown
# API Reference

## Contents
- Authentication and setup
- Core methods
- Advanced features
- Error handling
- Examples

[Full sections follow...]
```

## Workflows and Feedback Loops

### Use Checklists for Complex Tasks

Provide copyable checklists:

````markdown
## PDF form filling workflow

Copy this checklist:

\`\`\`
Task Progress:
- [ ] Step 1: Analyze form (run analyze_form.py)
- [ ] Step 2: Create mapping (edit fields.json)
- [ ] Step 3: Validate (run validate_fields.py)
- [ ] Step 4: Fill form (run fill_form.py)
- [ ] Step 5: Verify (run verify_output.py)
\`\`\`
````

### Implement Feedback Loops

**Pattern:** validate → fix → repeat

**Example:**
```markdown
## Document editing process

1. Make edits to `word/document.xml`
2. **Validate immediately**: `python validate.py unpacked_dir/`
3. If fails:
   - Review error message
   - Fix issues
   - Validate again
4. **Only proceed when validation passes**
5. Rebuild document
```

## Content Guidelines

### Avoid Time-Sensitive Information

**Bad:**
```markdown
If you're doing this before August 2025, use old API.
```

**Good:**
```markdown
## Current method
Use v2 API: `api.example.com/v2/messages`

## Old patterns
<details>
<summary>Legacy v1 API (deprecated 2025-08)</summary>
No longer supported.
</details>
```

### Use Consistent Terminology

**Good:** Always "API endpoint", "field", "extract"
**Bad:** Mix "endpoint/URL/route", "field/box/element", "extract/pull/get"

## Common Patterns

### Template Pattern

**For strict requirements:**
````markdown
## Report structure

ALWAYS use this exact template:

\`\`\`markdown
# [Analysis Title]
## Executive summary
## Key findings
## Recommendations
\`\`\`
````

**For flexible guidance:**
````markdown
## Report structure

Sensible default, adapt as needed:

\`\`\`markdown
# [Analysis Title]
[Adapt sections based on analysis]
\`\`\`
````

### Examples Pattern

Provide input/output pairs:

````markdown
## Commit message format

**Example 1:**
Input: Added user authentication with JWT
Output:
\`\`\`
feat(auth): implement JWT-based authentication

Add login endpoint and token validation middleware
\`\`\`
````

### Conditional Workflow Pattern

```markdown
## Document modification

1. Determine type:
   **Creating?** → Creation workflow
   **Editing?** → Editing workflow

2. Creation workflow: [steps]
3. Editing workflow: [steps]
```

## Evaluation and Iteration

### Build Evaluations First

1. **Identify gaps**: Run Claude without skill, document failures
2. **Create evaluations**: Build 3 scenarios testing gaps
3. **Establish baseline**: Measure without skill
4. **Write minimal instructions**: Just enough to pass evals
5. **Iterate**: Execute, compare, refine

**Example evaluation:**
```json
{
  "skills": ["pdf-processing"],
  "query": "Extract all text from PDF and save to output.txt",
  "files": ["test-files/document.pdf"],
  "expected_behavior": [
    "Reads PDF using appropriate library",
    "Extracts text from all pages",
    "Saves to output.txt"
  ]
}
```

### Develop Skills Iteratively with Claude

**Creating new skill:**
1. Complete task without skill (Claude A helps)
2. Identify reusable pattern
3. Ask Claude A to create skill
4. Review for conciseness
5. Test with Claude B (fresh instance)
6. Iterate based on observations

**Iterating existing skills:**
1. Use skill in real workflows (Claude B)
2. Observe behavior
3. Return to Claude A with observations
4. Apply refinements
5. Test with Claude B again

## Anti-Patterns to Avoid

### Avoid Windows-Style Paths
- ✅ Good: `scripts/helper.py`
- ❌ Bad: `scripts\helper.py`

### Avoid Too Many Options
**Bad:** "You can use pypdf, or pdfplumber, or PyMuPDF..."
**Good:** "Use pdfplumber for text extraction. For OCR, use pdf2image."

## Advanced: Skills with Executable Code

### Solve, Don't Punt

Handle errors explicitly in scripts:

```python
def process_file(path):
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        # Create file instead of failing
        with open(path, 'w') as f:
            f.write('')
        return ''
```

### Provide Utility Scripts

Pre-made scripts offer:
- More reliability
- Token savings
- Time savings
- Consistency

### Create Verifiable Intermediate Outputs

**Pattern:** plan → validate → execute

Example: Create `changes.json` → validate → apply changes

This catches errors before they cause damage.

### MCP Tool References

Use fully qualified names:

```markdown
Use BigQuery:bigquery_schema tool
Use GitHub:create_issue tool
```

Format: `ServerName:tool_name`

## Checklist for Effective Skills

### Core Quality
- [ ] Description includes what AND when
- [ ] SKILL.md under 500 lines
- [ ] No time-sensitive info
- [ ] Consistent terminology
- [ ] Concrete examples
- [ ] One-level deep references
- [ ] Clear workflows

### Code and Scripts
- [ ] Error handling explicit
- [ ] No magic numbers
- [ ] Packages listed and verified
- [ ] Forward slashes in paths
- [ ] Validation for critical ops

### Testing
- [ ] 3+ evaluations created
- [ ] Tested with all target models
- [ ] Real usage tested
- [ ] Team feedback incorporated

## Token Budgets

- SKILL.md body: < 500 lines
- Getting-started workflows: < 150 words
- Frequently-loaded skills: < 200 words
- Other skills: < 500 words

## Runtime Environment

Skills run in code execution environment with:
- Filesystem access
- Bash commands
- Code execution

**How it works:**
1. Metadata pre-loaded at startup
2. Files read on-demand
3. Scripts executed efficiently
4. No context penalty until accessed

## External Resources

- **Anthropic Docs**: https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/
- **Anthropic Skills Repo**: https://github.com/anthropics/skills
- **Awesome Claude Skills**: https://github.com/ComposioHQ/awesome-claude-skills

## The Bottom Line

**Best skills are:**
1. Concise (assume Claude is smart)
2. Well-structured (progressive disclosure)
3. Tested (evaluations first)
4. Practical (solve real problems)

**Remember:**
- Context window is shared resource
- Test with target models
- Iterate based on real usage
- Keep it simple and focused
