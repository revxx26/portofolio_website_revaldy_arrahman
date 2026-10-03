# Language and theme preferences

EN is the default language. The header offers English and Bahasa Indonesia in
both desktop and mobile layouts. Interface text, portfolio descriptions, project
case studies, dates, form validation, image alt text, and image-viewer controls
are translated. Tool names, organizations, and official certificate titles remain
unchanged. Asset URLs, anchors, dates, and reported numerical results are kept.

Language and light/dark theme choices use localStorage with a safe fallback when
storage is unavailable. The document language follows the chosen language. An
inline theme initializer applies the saved theme before rendering; first visits
follow the system color scheme. The original photos/charts/certificates keep
their colors. Theme switching changes interface surfaces and text colors.

Copy email and its clipboard code/styles were removed. The email link and draft
form remain. Language changes preserve typed form values and native case-study
state, and the scroll progress continues to follow content height.

Validation: production build and export checks passed. Desktop 1440 and mobile
320 layouts had no horizontal overflow. EN/ID and dark/light controls worked;
ID and dark preferences survived reload. Volunteer dates and both team-project
contributions translated correctly. The mobile menu closed after contact
navigation. Form values survived a language change; whitespace-only messages
showed Indonesian validation without opening an email draft. The certificate
popup retained its official title, with translated zoom/close controls. No browser
errors or warnings were reported. Copy email was absent.
