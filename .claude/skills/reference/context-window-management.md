# Context Window Management

## Overview

Claude 4.5 models can track their remaining context window (token budget) throughout a conversation. This enables Claude to execute tasks and manage context more effectively by understanding how much space it has to work.

**Key benefit**: Claude is natively trained to use this context precisely to persist in the task until the very end, rather than having to guess how many tokens are remaining.

**Analogy**: Lacking context awareness is like competing in a cooking show without a clock. Claude 4.5 models change this by explicitly informing the model about its remaining context.

## How It Works

### Initial Budget

At the start of a conversation, Claude receives information about its total context window:

```xml
<budget:token_budget>200000</budget:token_budget>
```

**Available budgets:**
- **200K tokens** - Standard
- **500K tokens** - Claude.ai Enterprise
- **1M tokens** - Beta (for eligible organizations)

### Ongoing Updates

After each tool call, Claude receives an update on remaining capacity:

```xml
<system_warning>Token usage: 35000/200000; 165000 remaining</system_warning>
```

**What this tells Claude:**
- **35000/200000** - Used 35K out of 200K total
- **165000 remaining** - 165K tokens still available

### Image Tokens

Image tokens are included in these budgets. When you attach images, they consume tokens based on their resolution and complexity.

## Benefits

Context awareness is particularly valuable for:

### Long-Running Agent Sessions
- Sustained focus on complex tasks
- Multi-step workflows
- Iterative refinement processes

### Multi-Context-Window Workflows
- State transitions matter
- Task completion across sessions
- Continuity of work

### Complex Tasks
- Careful token management
- Strategic use of remaining space
- Prioritization of critical information

## Context Window Management (Claude Sonnet 3.7+)

### Validation Errors Instead of Truncation

In newer Claude models (starting with Claude Sonnet 3.7), if the sum of prompt tokens and output tokens exceeds the model's context window, the system will return a **validation error** rather than silently truncating the context.

**Why this matters:**
- More predictable behavior
- No silent data loss
- Clear feedback when limits are reached

**Tradeoff:**
- Requires more careful token management
- Must plan token usage in advance

### Token Counting API

To plan your token usage and ensure you stay within context window limits, you can use the **token counting API** to estimate how many tokens your messages will use before sending them to Claude.

**Use cases:**
- Pre-flight checks before large operations
- Planning multi-turn conversations
- Optimizing prompt design
- Managing batch operations

## Practical Applications

### 1. Long Document Processing

**Scenario**: Processing a 100-page document with analysis

**Without context awareness**: Claude might struggle to complete or truncate output prematurely

**With context awareness**: Claude can:
- Gauge how much space is available
- Allocate tokens appropriately across sections
- Complete the full task within budget
- Notify you if more space is needed

### 2. Multi-Step Agent Tasks

**Scenario**: Research → Analysis → Report generation workflow

**Without context awareness**: Might run out of space mid-task

**With context awareness**: Claude can:
- Reserve space for final output
- Prioritize critical intermediate steps
- Request context reset if needed
- Complete all steps efficiently

### 3. Iterative Refinement

**Scenario**: Code generation with multiple revision cycles

**Without context awareness**: May lose important context in later iterations

**With context awareness**: Claude can:
- Track conversation history size
- Decide when to summarize earlier work
- Maintain critical context throughout
- Complete refinement cycles successfully

## Best Practices for Token Management

### 1. Monitor Budget Updates

Pay attention to budget warnings:
```xml
<system_warning>Token usage: 180000/200000; 20000 remaining</system_warning>
```

When remaining tokens are low (<20%), consider:
- Summarizing earlier work
- Focusing on essential output
- Requesting a new session if needed

### 2. Plan Large Operations

For big tasks:
1. Estimate token requirements
2. Check available budget
3. Break into smaller chunks if needed
4. Use progressive disclosure patterns

### 3. Optimize Prompts

Reduce unnecessary token usage:
- Remove redundant instructions
- Use concise language
- Reference files instead of pasting content
- Leverage skills for reusable patterns

### 4. Use Progressive Disclosure

**For skills:**
- Keep SKILL.md under 500 lines
- Split large content into separate files
- Load only what's needed
- Reference rather than duplicate

**For projects:**
- Use CLAUDE.md hierarchy
- Feature-specific context files
- Just-in-time loading

### 5. Strategic File Reading

Instead of:
```bash
cat large-file.txt  # Loads entire file
```

Use targeted reads:
```bash
head -100 large-file.txt  # Preview first 100 lines
grep "specific pattern" large-file.txt  # Find relevant content
```

## Token Budget Strategies

### Strategy 1: Front-Load Critical Context

Load essential information early:
1. Project structure and patterns
2. Critical constraints
3. Key requirements
4. Reference materials

Then work within remaining budget.

### Strategy 2: Just-In-Time Loading

Load information only when needed:
1. Start with minimal context
2. Load specific files as required
3. Avoid speculative loading
4. Clean up unused context

### Strategy 3: Checkpoint and Reset

For very long tasks:
1. Work until budget is low
2. Summarize progress
3. Start new session with summary
4. Continue from checkpoint

## Integration with Skills

Skills benefit from context awareness:

### Skill Design Implications

**Keep skills concise** because:
- Skills share the context window
- Multiple skills may be loaded
- Each token counts toward budget

**Use progressive disclosure** because:
- SKILL.md metadata always loaded
- Body loaded when triggered
- Additional files loaded on-demand
- Minimizes budget impact

**Example:**
```
pdf-skill/
├── SKILL.md (200 tokens - always loaded)
└── reference/
    ├── api.md (2000 tokens - loaded if needed)
    └── examples.md (1000 tokens - loaded if needed)
```

Only 200 tokens consumed until reference materials are actually needed.

### Skill Usage Patterns

**Pattern 1: Light skill usage**
- Multiple skills available (metadata loaded)
- One or two triggered per conversation
- Minimal budget impact
- Most budget available for work

**Pattern 2: Heavy skill usage**
- Many skills triggered
- Large reference files loaded
- Significant budget usage
- Less space for conversation

**Recommendation**: Design skills to minimize baseline token usage while maximizing utility.

## Troubleshooting

### Problem: Context Window Exceeded

**Symptoms:**
- Validation error from API
- Task incomplete
- Response truncated

**Solutions:**
1. Check token budget before large operations
2. Use token counting API to estimate usage
3. Break task into smaller chunks
4. Start new session with summary

### Problem: Running Out of Space

**Symptoms:**
- Budget warnings appear
- Limited remaining tokens
- Can't complete intended work

**Solutions:**
1. Summarize earlier conversation
2. Remove unnecessary context
3. Use more concise language
4. Reference files instead of loading
5. Start fresh session if needed

### Problem: Inefficient Token Usage

**Symptoms:**
- Budget depletes quickly
- Lots of redundant content
- Large files fully loaded

**Solutions:**
1. Use progressive disclosure
2. Load files selectively
3. Grep instead of cat
4. Reference instead of duplicate
5. Optimize prompts

## Monitoring and Debugging

### Reading Budget Warnings

```xml
<system_warning>Token usage: 150000/200000; 50000 remaining</system_warning>
```

**Interpretation:**
- **75% used** (150K / 200K)
- **25% remaining** (50K / 200K)
- **Status**: Approaching capacity, be mindful

**Action thresholds:**
- **<80% used**: Normal operation
- **80-90% used**: Monitor closely, avoid large loads
- **90-95% used**: Focus on essentials, consider summarizing
- **>95% used**: Wrap up, prepare for session end

### Estimating Remaining Work

Rule of thumb approximations:
- **Simple response**: ~500 tokens
- **Code example**: ~200-500 tokens
- **Detailed explanation**: ~1000 tokens
- **File read (medium)**: ~2000 tokens
- **Complete analysis**: ~5000+ tokens

Use these to gauge if remaining budget is sufficient.

## Advanced: Multi-Session Workflows

For tasks exceeding single context window:

### Pattern 1: Checkpoint-Resume

**Session 1:**
1. Complete first phase
2. Generate summary
3. Save state to file

**Session 2:**
1. Load summary (small)
2. Continue from checkpoint
3. Access full context via files

### Pattern 2: Divide and Conquer

**Session 1**: Process part A
**Session 2**: Process part B
**Session 3**: Synthesize A + B

Each session stays within budget.

### Pattern 3: Progressive Refinement

**Session 1**: Draft (use most tokens)
**Session 2**: Refine (use less)
**Session 3**: Polish (use minimal)

Later sessions reference earlier work via files.

## The Bottom Line

**Context awareness enables:**
- Strategic token management
- Task completion within budget
- Better long-running agent performance
- Informed decisions about space allocation

**Best practices:**
1. Monitor budget updates
2. Plan large operations
3. Use progressive disclosure
4. Optimize prompts and file access
5. Leverage skills efficiently

**Remember**: Token budget is shared resource. Every skill, file, and message competes for space. Design for efficiency.

## Resources

- Anthropic API Documentation: https://docs.anthropic.com/
- Claude 4 Best Practices: https://docs.anthropic.com/en/docs/about-claude/models
- Token Counting: Use the Messages API count_tokens parameter
