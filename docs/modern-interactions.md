# Portfolio interactions

- Scroll reveal uses IntersectionObserver once per heading/card. The initial
  viewport stays visible. Content is visible by default without JavaScript or
  IntersectionObserver; keyboard focus reveals a pending element immediately.
- Reduced motion skips reveal initialization and disables CSS animations. A live
  change to reduced motion disconnects the observer and reveals all content.
- A decorative 3 px header bar tracks the scrollable document distance. Updates
  share the navigation's animation-frame callback; ResizeObserver updates it when
  case studies or other content change page height.
- Copy email was removed at the owner's request. Contact retains its email link
  and email draft form.

Validation: production build and export checks passed. Browser checks confirmed
pending elements reveal on navigation, progress is zero at the top and full at
the bottom, and progress matches the new document height after case-study
expansion. Desktop 1440 and mobile 320 layouts had no horizontal
overflow; mobile contact controls remained visible. Browser errors/warnings were
empty. Reduced-motion is implemented but was not emulated through the browser
automation interface.
