#!/usr/bin/env bash
# Run the Cobenian Shai-Hulud supply-chain detector against this repo.
# Upstream: https://github.com/Cobenian/shai-hulud-detect
#
# Usage:
#   ./scripts/shai-hulud-scan.sh              # default scan (recommended)
#   ./scripts/shai-hulud-scan.sh --paranoid   # extra heuristics (noisier)
#   CLEAN_NEXT=1 ./scripts/shai-hulud-scan.sh # rm -rf .next first (drops LOW noise from build output)
#
# Notes:
#   - Upstream auto-selects git-grep first; it often prints paths like `node_modules/...`
#     (repo-relative, no slash before `node_modules`). The detector then runs
#     `grep -v "/node_modules/"`, which does NOT exclude those lines, so Next.js
#     telemetry (detect-agent.js) is falsely flagged as MEDIUM. Passing --use-grep
#     keeps paths absolute like the find output so the filter works.
#   - GNU grep (brew install grep) is still required for other `grep -v` alternations.
#   - SHA_HULUD_USE_GIT_GREP=1 omits --use-grep for debugging upstream behavior.
#
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DETECT_DIR="${SHA_HULUD_DETECT_DIR:-${TMPDIR:-/tmp}/shai-hulud-detect}"

DETECTOR_FLAGS=()
if [[ "${SHA_HULUD_USE_GIT_GREP:-}" != "1" ]]; then
  DETECTOR_FLAGS+=(--use-grep)
fi

_prefer_gnu_grep_path() {
  local dir
  for dir in \
    "${HOMEBREW_PREFIX:-/opt/homebrew}/opt/grep/libexec/gnubin" \
    "/usr/local/opt/grep/libexec/gnubin"; do
    if [[ -x "$dir/grep" ]]; then
      export PATH="$dir:$PATH"
      return 0
    fi
  done
  return 1
}

_prefer_gnu_grep_path || true

if ! grep --version 2>/dev/null | head -1 | grep -q GNU; then
  echo "warning: grep is not GNU; install: brew install grep (needed for detector filters)" >&2
fi

if [[ "${CLEAN_NEXT:-}" == "1" ]] && [[ -d "$ROOT/.next" ]]; then
  rm -rf "$ROOT/.next"
fi

if [[ ! -f "$DETECT_DIR/shai-hulud-detector.sh" ]]; then
  rm -rf "$DETECT_DIR"
  git clone --depth 1 https://github.com/Cobenian/shai-hulud-detect.git "$DETECT_DIR"
else
  git -C "$DETECT_DIR" pull --ff-only 2>/dev/null || true
fi

exec bash "$DETECT_DIR/shai-hulud-detector.sh" "${DETECTOR_FLAGS[@]}" "$@" "$ROOT"
