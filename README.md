# dlr-email-templates

Markup reference for DLR email templates.

I am using Nunjucks to build the markup. It helps keeping the common elements in one file.

## Installation

To install the project

`npm install`


To build the project

`npm run build`

The templates will be located in `_dist/emails/`

### Other bits

To clean the _dist folder

`npm run clean`


To view in the browser

`npm run serve`

If you are copy-pasting the markup from the browser using `npm run serve`, please remove the lines related to webserver at the end

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

If you need to insert one of the mailgun variable to the email, you need to wrap it inside a Nunjucks raw tag:

`{% raw %}{{ Mailgun Variable }}{% endraw %}`

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

## Possible Improvements

* Each "component" of the email in the reference could be set as a Nunjucks macro to avoid copy-pasting.

* We could have a view to copy and paste the markup (instead of using the "view source" of the browser)

* The listing of emails could look nicer

* This build only caters for the English version of emails, it may be worth looking into how to translate it too.