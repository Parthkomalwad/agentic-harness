## What this adds or changes

<!-- One or two sentences. Link the issue if there is one. -->

## Type

- [ ] New pack
- [ ] New skill / agent / workflow / hook / mod in an existing pack
- [ ] New external (upstream) entry
- [ ] Fix or docs

## Checklist

- [ ] `node scripts/validate.mjs` passes
- [ ] `claude plugin validate ./plugins/<pack> --strict` passes
- [ ] New pack sets `"defaultEnabled": false` in `marketplace.json`
- [ ] Skill descriptions are short (≤ 300 characters) and say *when* to use the skill
- [ ] No secrets, API keys or tokens in any file
- [ ] Any mod or hook code is readable and does not auto-approve on failure
- [ ] I tested it locally with `claude --plugin-dir ./plugins/<pack>`
- [ ] README pack table updated
