FORM STUDIO WEBSITE
===================

FILES
-----
index.html   Main website structure and Formspree integration
style.css    Responsive black-and-white visual design
script.js    Mobile menu, scroll reveals, year and form guardrails

STACK
-----
Static HTML, CSS and vanilla JavaScript. No build step or npm install is needed.
Designed for static hosting such as GitHub Pages.

FORM SUBMISSIONS
----------------
The project inquiry form is connected to:
https://formspree.io/f/xnppyjdg

The form uses Formspree's official @formspree/ajax CDN integration.
The email field is named "email" so Formspree can identify the submitter for
an autoresponse workflow. The hidden _subject field labels incoming inquiries.
A hidden _gotcha field is included as a basic honeypot anti-spam measure.

IMPORTANT: The site code cannot configure your Formspree account's notification
recipient or autoresponse workflow. Sign in to Formspree and:
1. Open the form with ID xnppyjdg.
2. Confirm the notification/recipient email address in the form settings.
3. Complete any email verification Formspree requests.
4. If your plan supports autoresponses, open Workflow > Actions > Add New >
   Auto Response. Set the sender name, subject and reply message.
5. Test the form from the published website and confirm both the Formspree
   submission and any email notifications.

Formspree's current documentation says its autoresponse workflow is available
on Professional and Business plans. If the option is not available in your
account, the form can still submit inquiries; visitors will see the on-page
success message, but no automatic reply email will be sent.

PUBLISHING
----------
For GitHub Pages, upload/replace index.html, style.css and script.js in the
same folder in your repository. Keep the filenames exactly as written.
Then open the published site and test the form on desktop and mobile.

BEFORE GOING LIVE
-----------------
- Replace any illustrative portfolio previews with real work when available.
- Confirm your Formspree notification email is verified.
- Submit one test inquiry and confirm it appears in Formspree.
- Check the page on a phone and desktop.
- Do not add passwords, private account details or sensitive personal data
  to project inquiry forms.
