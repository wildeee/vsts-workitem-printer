# VSTS Workitem Printer!

This Front-end project is intended to help printing VSTS cards into PDF files.

### Use instructions
You must generate a Personal Access Token on VSTS (Azure Dev-ops) with the "Work Items" -> "Read" permission.
Paste your PAT token on pat.js file, replacing the string 'PASTE_YOUR_PAT_TOKEN_HERE'

If you're running the project locally, just open src/index.html on your browser.
Or build the Dockerfile and run the image.

# WARNING
Your Personal access token is exposed on network calls, use at your own risk.
Is **HIGHLY RECOMMENDED** to generate a PAT token with only the "Work Items" -> "Read" permission. And nothing else.
