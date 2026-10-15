# Claude Code primitives

What a plugin can contain, where each piece lives, and what it costs in context. Based on the official [plugin reference](https://code.claude.com/docs/en/plugins-reference).

| Primitive | Location in a pack | Context cost while idle | Use it for |
|---|---|---|---|
| Skill | `skills/<name>/SKILL.md` | Name and description only. The body loads when the skill is used. | Know-how, procedures, checklists |
| Agent | `agents/<name>.md` | Description only. Runs in its own context. | Roles: reviewer, tracer, auditor |
| Workflow | `workflows/<name>.js` | None. Only the final answer enters context. | Running many agents in phases (`agent`, `pipeline`, `parallel`, `phase`) |
| Settings hook | `hooks/hooks.json` | None, unless the hook prints output | Allow, block or log events with a script |
| Mod | `hooks/` with a JS hooks module | None | Panes, bands above the prompt, holding a tool call to ask the user, instant `/commands` |
| Executables | `bin/` | None | CLIs Claude can run by name |
| MCP server | `.mcp.json` | **High.** Tool schemas load every session. | External systems with no CLI |
| LSP server | `.lsp.json` | Low | Code intelligence for a language |
| Output style | `output-styles/` | Changes the system prompt | Response modes |
| Monitor | `monitors/monitors.json` | Event-driven | Background watchers (experimental) |
| User config | `userConfig` in `plugin.json` | None | Settings and API keys the user enters on enable |
| Dependencies | `dependencies` in `plugin.json` | None | A pack that needs another pack |

## Useful references

- [Plugins reference](https://code.claude.com/docs/en/plugins-reference)
- [Marketplace reference](https://code.claude.com/docs/en/plugins/marketplace-reference)
- [Dynamic workflows](https://code.claude.com/docs/en/workflows)
- [Mods](https://code.claude.com/docs/en/plugins/mods)
- [Sample mods](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods)
