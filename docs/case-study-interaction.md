# Case study button hit area

The native details summary fits the visible button exactly. Its helper text is a
noninteractive sibling, and the divider belongs to the surrounding row. Empty
row space and helper text no longer trigger hover or toggle the details.

Production build and export verification passed. Browser checks confirmed all
three summaries match their button width and height; clicking the helper text or
empty row left details closed and hover inactive. The button opened the details,
and Enter closed them. Indonesian mobile 320 layout opened correctly without
horizontal overflow. Browser errors and warnings were empty.
