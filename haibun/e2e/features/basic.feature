
Feature: Basic signin

Go to the login page, enter credentials, be on the welcome page.

  Backgrounds: auth-form

  go to the https://devgcx.sharepoint.com webpage
  wait for "Sign in"
   input {USERNAME} for Username field
   click "Next"

   wait for "Enter password"
   input {PASSWORD} for Password field
   Click "Sign in"
   wait for "More information required"
   click "Next"
   wait for "Microsoft Authenticator"
   click "Skip setup"
   wait for "Stay signed in?"
   click "Don't show this again"
   click "Yes"
   wait for "Welcome to GCXchange"


