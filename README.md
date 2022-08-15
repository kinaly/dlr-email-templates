# dlr-email-templates

Markup reference for DLR email templates.

I am using Nunjucks to build the markup. It helps keeping the common elements in one file.

## Installation

### To install the project

`npm install`


### To build the project

`npm run build`

### To clean the _dist folder

`npm run clean`

### To view in the browser

`npm run serve`


## Getting the markup for mailgun

### Inserting Mailgun variables
If you need to insert one of the mailgun variable to the email, you need to wrap it inside a Nunjucks raw tag:

`{% raw %}{{ Mailgun Variable }}{% endraw %}`

### Setting up the assets path
If you want the assets path from the CDN:
* Upload the assets to the CDN
* Fetch the URL for each asset (banner and DLR logo)
* Open the file located in `_src/html/templates/partials/email-header.html`
* Make sure that the variable `assetsPath` on line 1 is set to "cdn"
* Check and amend accordingly the CDN URL on line 8 for the banner and line 13 for the logo
* Build the project with `npm run build`

If you want the assets path from the `email-assets folder`:
* Open the file located in `_src/html/templates/partials/email-header.html`
* Make sure that the variable `assetsPath` on line 1 is set to "relative"
* Build the project with `npm run build`

**Do not use for production**
If you want the assets path from the Github repo:
* Open the file located in `_src/html/templates/partials/email-header.html`
* Make sure that the variable `assetsPath` on line 1 is set to "github"
* Build the project with `npm run build`

### Getting the markup from the `_dist_` folder
After building the project, the templates will be located in `_dist/emails/`.
You can use these files as references to use in Mailgun

### Getting the markup from the browser
When viewing the templates in the browser, you can copy paste the markup using the "view Source" option.

Please remove the lines related to webserver at the end

```
<!-- injected by web-dev-server -->
<script type="module" src="/__web-dev-server__web-socket.js"></script>
```


## Adding an e-mail

### Add the body content of the mail
When adding an e-mail, create a new file inside `_src/html/templates/emails`.

The file should be named after what it does (ie. password-reset.html for the Password Reset email).

This file should only contain the main content of the email and is placed inside a table.

Here is a short boilerplate:

```
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="10" style="background-color: #fff; color: #0C223F; line-height: 1.4;">
  <tr>
    <td>
      <!-- Greeting  -->
      <h2 style="font-size: 1.25em; margin: .25em 0 .25em;">Greeting</h2>
            
      <!-- Insert content here -->

      <!-- Ending -->
      <p style="margin: 1em 0 0;">Thank you!</p>
      <p style="margin: 0;"><strong style="font-weight: bold;">Your Digital Realty Team</strong></p>
    </td>
  </tr>
</table>
```

### Create a file for each brand of the email

Then you need to create a file for each brand of the email in `_src/html/pages/emails`.

For example if you have created `password-reset.html` inside the emails template folder, then you should create 2 files named `password-reset-interxion.html` and `password-reset-dlr.html` respectively.

These files should look like this:

```
{% extends "templates/template-main-email.html" %}

{% block title %} Insert the subject line here {% endblock %}

{% block shortSubject %}Short subject in banner{% endblock %}

{% block content %}
  {% include "templates/emails/magic-link.html" %}
  {% include "templates/partials/email-footer-dlr.html" %}
{% endblock %}
```

Each version is nearly identical except for the line including the footer:

Interxion version

`{% include "templates/partials/email-footer-interxion.html" %}`

Digital Realty version

`{% include "templates/partials/email-footer-dlr.html" %}`

### Add the newly created email to the list in index.html

Add the name (without the extension) of the mail template file to the array in index.html (line 1).

The name should be the same as the file created in the templates emails folder.

The array shoud look something like this:

`{% set emails = ["new-user", "refresh-registration-link", "successful-registration", "password-reset", "password-reset-confirmation", "password-expiry-reminder", "password-expired", "magic-link", "one-time-code"] %}`

## Email clients compatibility and known issues

These templates have been tested in:
* Outlook webmail in Firefox 103.0.2 - macOS 12.4
* Outlook webmail in Edge 103.0.1264.62 - Windows 10
* Outlook app - Windows 10
* Apple Mail - iOS 15.5
* Gmail webmail in Firefox 103.0.3 - macOS 12.4
* Gmail app - iOS 15.5 (Works well in Light Mode but not in Dark Mode)

The Gmail app in iOS (and possibly Android) will automatically change the colours in Dark Mode for you. These colours cannot be customised and make the text placed over the banner unreadable. If images are not downloaded, the logo will only be barely visible as it is white over a light background.


## Possible Improvements

* Each "component" of the email in the reference could be set as a Nunjucks macro to avoid copy-pasting.

* We could have a view to copy and paste the markup (instead of using the "view source" of the browser)

* The listing of emails could look nicer

* This build only caters for the English version of emails, it may be worth looking into how to translate it too.