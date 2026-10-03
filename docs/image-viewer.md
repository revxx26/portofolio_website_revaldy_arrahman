# In-page image previews

Project figures, volunteer photos, and certificates have nine dedicated preview
buttons. Thumbnails are noninteractive. The buttons open a shared native dialog
with the original image, fit-to-screen and original-size zoom, and a close button.
Escape and backdrop clicks also close it. The URL stays unchanged.

The viewer isolates keyboard focus, locks background scrolling, and restores the
opening button's focus and the saved page position. Preview buttons stay disabled
until hydration is ready; zoom waits for the image to load. Failed images have an
inline error message.

Validation: production build and export verification passed. All nine buttons
opened the expected original image without navigation. Project, volunteer, and
certificate thumbnails did not open the viewer. Desktop (1440 × 900) and mobile
(320 × 740) dialogs fit the viewport. Keyboard navigation, Escape, image scrolling
when zoomed, and focus return passed. Closing the mobile viewer restored the exact
scroll position (8883 px before and after). Browser errors and warnings were empty.
