# Mobile More navigation

The previous React button depended on client-side hydration to open the mobile
navigation. The hosted menu worked in the reproduced browser session, so the
reported device-specific failure was not conclusively isolated.

The mobile menu now uses a native `details`/`summary` disclosure. Opening and
closing the disclosure and following its links work before JavaScript loads.
The visible More control is at least 44 pixels high. Separate responsive desktop
navigation preserves all six links and their order.

JavaScript adds active-section highlighting, closing after a link is selected,
Escape dismissal with focus returned to the summary, and closing on desktop
resize. Native open state is not controlled by a React boolean, so hydration
does not reset a disclosure opened before JavaScript is ready.

Verification on the production export:

- Build and export verification passed.
- All six mobile links reached their anchors and closed the hydrated menu.
- Enter and Space opened the menu; Escape closed it.
- At 320 pixels, all six open-menu links were visible, the control was 44 pixels
  high, and there was no horizontal overflow.
- At 1440 pixels, desktop links were visible, mobile controls were hidden, and
  the disclosure closed after the resize.
- A temporary exported HTML fixture with every script removed verified opening,
  following the Projects anchor, and closing the disclosure without JavaScript.
  The fixture was deleted before packaging.

These checks used browser viewport emulation, not physical phone hardware.
