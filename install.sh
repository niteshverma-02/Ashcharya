#!/usr/bin/env bash
# Installs the ashcharya-ui skill into ~/.claude/skills (personal, all projects).
set -euo pipefail

REPO="https://github.com/niteshverma-02/Ashcharya.git"
DEST="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}/ashcharya-ui"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

git clone --depth 1 --quiet "$REPO" "$TMP/repo"
mkdir -p "$(dirname "$DEST")"
rm -rf "$DEST"
cp -r "$TMP/repo/skills/ashcharya-ui" "$DEST"

echo "✅ ashcharya-ui installed at $DEST"
echo "   Restart Claude Code, then try: /ashcharya-ui"
