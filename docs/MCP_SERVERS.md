# MCP Servers Documentation

**Last Updated**: 2025-11-09

## Available MCP Servers

This document tracks Model Context Protocol (MCP) servers available for use with this project and Claude Code.

### What is MCP?

Model Context Protocol is a standardized way for Large Language Models (LLMs) to communicate with external tools and data sources. It allows AI assistants like Claude to interact with databases, APIs, and services.

---

## Installed & Available

### 1. Vercel MCP Server (via Claude Code IDE extension)

**Status**: ✅ Available (built-in)
**Tools Available**:
- `search_documentation` - Search Vercel docs
- `list_projects` - List all Vercel projects
- `get_project` - Get project details
- `list_deployments` - View deployment history
- `get_deployment_build_logs` - Debug deployment failures
- `deploy_to_vercel` - Deploy current project
- `use_vercel_cli` - Execute Vercel CLI commands

**Configuration**: Pre-configured in Claude Code IDE
**Documentation**: https://vercel.com/docs/mcp

---

### 2. Supabase MCP Server (Documented for Future Use)

**Status**: 📋 Documented (not currently needed)
**Repository**: https://github.com/supabase-community/supabase-mcp
**Hosted At**: https://mcp.supabase.com/mcp

**Recommended Setup** (when using Supabase):
```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?read_only=true&project_ref=<PROJECT_REF>"
    }
  }
}
```

**Security Options**:
- `read_only=true` - Restrict to read-only queries (recommended)
- `project_ref=<ref>` - Scope to specific project
- `features=database,docs` - Enable only specific tool groups

**Available Tool Groups**:
- `account` - Project and org management
- `docs` - Search Supabase documentation
- `database` - Table management, SQL execution, migrations
- `debugging` - Logs and advisors
- `development` - TypeScript types generation
- `functions` - Edge Functions deployment
- `storage` - Bucket management
- `branching` - Development branches (paid plan)

**Why not using it?**:
- M_ART uses Vercel Postgres, not Supabase
- Documented for future reference if switching databases

---

## Database Management

### Current: Vercel Postgres

**Database**: Vercel Postgres (native Vercel integration)
**SDK**: `@vercel/postgres` npm package
**Management**: Via Vercel Dashboard → Storage → Postgres → Query tab

**No MCP needed** because:
- Direct SQL access via Vercel dashboard
- Environment variables auto-injected
- Claude Code can execute SQL via Vercel CLI

---

## Adding New MCP Servers

To add a new MCP server to Claude Code:

1. Check if server is available in Claude MCP marketplace
2. For HTTP servers (like Supabase):
   - Add to VS Code `mcp.json` or Cursor settings
   - Restart Claude Code IDE
3. For stdio servers:
   - Install npm package globally
   - Configure in MCP settings with command path

**Configuration File Locations**:
- VS Code: `~/.vscode/mcp.json`
- Cursor: Settings → MCP → Add new server
- Claude Code: (Check documentation at https://docs.claude.com/claude-code)

---

## Security Best Practices

When using MCP servers with databases:

1. **Read-only by default**: Always use `read_only=true` unless mutations required
2. **Project scoping**: Limit access to single project when possible
3. **Feature limiting**: Only enable tool groups you need
4. **Never in production**: Use with development/staging environments only
5. **Review tool calls**: Always review MCP tool calls before execution
6. **Prompt injection awareness**: Be cautious of commands in user content

---

## Resources

- **MCP Official Docs**: https://modelcontextprotocol.io/introduction
- **Vercel MCP Docs**: https://vercel.com/docs/mcp
- **Supabase MCP Docs**: https://supabase.com/docs/guides/getting-started/mcp
- **Claude Code MCP Guide**: https://docs.claude.com/claude-code

---

**Note**: This is a living document. Update when adding/removing MCP servers.
