#!/usr/bin/env bash
# Install agentic-harness packs in a Claude Code cloud session.
#
# Cloud sessions start from a fresh clone and do not install plugins listed in a
# repo's .claude/settings.json, so this runs as the cloud environment's setup
# script instead. Set it once at claude.ai/code -> environment -> Setup script:
#
#   git clone --depth 1 https://github.com/Parthkomalwad/agentic-harness /tmp/agentic-harness
#   HARNESS_PACKS="core harness-band memory-pack ui-pack" bash /tmp/agentic-harness/scripts/cloud-setup.sh
#
# HARNESS_PACKS: space-separated pack names. Default: core harness-band memory-pack.
# The environment needs network access to github.com (the Trusted level allows it).
set -euo pipefail

PACKS="${HARNESS_PACKS:-core harness-band memory-pack}"
MARKET="agentic-harness"

if ! command -v claude >/dev/null 2>&1; then
  echo "agentic-harness: claude CLI not found; skipping plugin install" >&2
  exit 0
fi

claude plugin marketplace add Parthkomalwad/agentic-harness || claude plugin marketplace update "$MARKET"

for pack in $PACKS; do
  if claude plugin install "$pack@$MARKET"; then
    echo "agentic-harness: installed $pack"
  else
    echo "agentic-harness: could not install $pack" >&2
  fi
done
