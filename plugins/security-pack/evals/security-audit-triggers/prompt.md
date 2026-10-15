---
max_turns: 15
---

Check this snippet for security problems: app.get("/user", (req, res) => db.query("SELECT * FROM users WHERE id = " + req.query.id).then(r => res.json(r)))
