# MCP Server Configuration

This directory contains MCP (Model Context Protocol) server configurations that extend Claude's capabilities.

## Available MCP Servers

### 1. GitHub MCP ⭐⭐⭐⭐⭐
**Status**: Template ready - needs API key
**What it does**: Search repos, create issues/PRs, browse code
**Setup**: See [github-mcp.md](github-mcp.md)

### 2. Filesystem MCP ⭐⭐⭐⭐
**Status**: Template ready - configure paths
**What it does**: Access files outside working directory
**Setup**: See [filesystem-mcp.md](filesystem-mcp.md)

### 3. PostgreSQL MCP ⭐⭐⭐⭐⭐
**Status**: Template ready - needs database URL
**What it does**: Query databases, inspect schemas
**Setup**: See [postgres-mcp.md](postgres-mcp.md)

### 4. Brave Search MCP ⭐⭐⭐⭐
**Status**: Template ready - needs API key
**What it does**: Web search for current information
**Setup**: See [brave-search-mcp.md](brave-search-mcp.md)

## Quick Setup

### For Claude.ai Users

1. Open Claude Code settings
2. Navigate to MCP Servers section
3. Add configurations from the files in this directory
4. Restart Claude Code

### For API/SDK Users

Use the configuration templates in your client initialization.

## Configuration Files

- `mcp-config.json` - Complete configuration template
- Individual `*-mcp.md` files for each server
- `.env.example` - Required environment variables

## Next Steps

1. Copy `.env.example` to `.env`
2. Fill in your API keys and credentials
3. Choose which MCP servers to enable
4. Follow individual setup guides
5. Test each server after configuration
