# GitHub MCP Server Setup

## What It Enables

With GitHub MCP, Claude can:
- Search code across repositories
- Read issues, pull requests, and discussions
- Create and update issues
- Create pull requests
- List repositories and branches
- Read file contents from any public or accessible private repo

## Setup Instructions

### Step 1: Get GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "Claude MCP Access"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `read:org` (Read org and team membership)
   - ✅ `read:user` (Read user profile data)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

### Step 2: Add to Environment

```bash
# In your .env file
GITHUB_TOKEN=ghp_your_token_here
```

### Step 3: Enable in MCP Config

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      },
      "disabled": false
    }
  }
}
```

### Step 4: Restart Claude Code

Close and reopen Claude Code for changes to take effect.

## Usage Examples

### Search for code patterns
```
"Search GitHub for examples of React authentication implementations"
```

### Research implementations
```
"Find how popular Next.js projects structure their API routes"
```

### Create issues
```
"Create a GitHub issue for the bug we just found"
```

### Create pull requests
```
"Create a PR with these changes to fix the authentication bug"
```

## Available Tools

When enabled, Claude can use:

- `GitHub:search_repositories` - Search for repos
- `GitHub:search_code` - Search code across repos
- `GitHub:get_file_contents` - Read file contents
- `GitHub:create_issue` - Create issues
- `GitHub:create_pull_request` - Create PRs
- `GitHub:list_commits` - View commit history
- `GitHub:get_issue` - Read issue details

## Troubleshooting

**Token not working:**
- Verify token has correct scopes
- Check token hasn't expired
- Ensure no typos in .env file

**Permission denied:**
- Token may need additional scopes
- Check repository access permissions

**Server not starting:**
- Run `npx -y @modelcontextprotocol/server-github` manually to check for errors
- Verify Node.js is installed

## Security Notes

- Never commit your token to git
- Use minimal required scopes
- Rotate tokens periodically
- Consider using fine-grained tokens for better security
