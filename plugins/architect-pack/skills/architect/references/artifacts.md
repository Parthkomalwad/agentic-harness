# Design artifacts

## Architecture diagram
Use Mermaid (`flowchart LR`) or an SVG. Group components by boundary: client, edge, services, data, third parties. Label every arrow with what flows and how (HTTPS, queue, webhook). One diagram per level: context first, then containers. Do not draw everything at once.

## Product UI concept
An interactive HTML or React page with realistic content and data, not lorem ipsum. Show the main screen and the one flow that matters most. Plain, clean layout, one accent color, readable type. Avoid the generic AI look: no default purple gradients, no centered hero on a gradient, no emoji icons.

## Design doc
Sections: summary, requirements, options, decision, pillar review table, decision record, first steps, open questions.

## Cost model
A table per traffic scenario (low, medium, high): each component, unit price, quantity, monthly cost, total. State the date prices were checked.

## Keep it current
When the conversation changes the design, update the same artifact and say what changed.
