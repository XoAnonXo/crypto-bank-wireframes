# Figma MCP Server Setup for Cursor

## What is Figma MCP?

The Figma MCP (Model Context Protocol) server helps AI agents:
- Generate code from Figma designs
- Extract design context (variables, components)
- Keep design systems consistent

**Note:** The MCP server is primarily for **Figma → Code** direction, but we can explore using it to potentially help with our wireframes.

## Setup Instructions for Cursor

According to the [Figma MCP documentation](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server), you have two options:

### Option 1: Local MCP Server (via Figma Desktop App)

1. **Open Figma Desktop App** (download from figma.com if needed)
2. **Update to latest version**
3. **Open any Figma file**
4. **Enable MCP:**
   - Click Figma menu (top-left)
   - Go to **Preferences** → **Enable local MCP server**
5. **Server will run at:** `http://127.0.0.1:3845/mcp`

### Option 2: Remote MCP Server (Easier)

Connect directly to Figma's hosted endpoint at `https://mcp.figma.com/mcp`

## Configure Cursor

Add this to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@figma/mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "YOUR_FIGMA_TOKEN_HERE"
      }
    }
  }
}
```

### Get Your Figma Access Token

1. Go to https://www.figma.com/
2. Click your profile → Settings
3. Scroll to "Personal access tokens"
4. Click "Create new token"
5. Give it a name (e.g., "MCP Server")
6. Copy the token
7. Replace `YOUR_FIGMA_TOKEN_HERE` in the config above

## What You Can Do With MCP

Once connected:

1. **Import our wireframes to Figma first**
2. **Then use MCP to:**
   - Generate production code from the Figma designs
   - Extract design tokens
   - Keep components consistent
   - Generate code that matches the designs

## Important Note

The Figma MCP server works **Figma → Code**, not **HTML → Figma**. 

For our current task (getting wireframes INTO Figma), the best methods are still:
1. Import screenshots from `test-results/`
2. Use Figma plugins (html.to.design, Anima)
3. Recreate manually using HTML as reference

**After** you have designs in Figma, the MCP server will be incredibly useful for generating production-ready code!

## Resources

- [Figma MCP Server Guide](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [Developer Documentation](https://developers.figma.com/docs/figma-mcp-server/)
- [Cursor MCP Setup](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/#cursor)




