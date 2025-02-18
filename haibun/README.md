
# Overview

Provides Haibun end to end testing features and pipeline, including auth.

Requires a username and password to log into the application.

# Running locally

`HAIBUN_LOG_LEVEL=log HAIBUN_ENVC="USERNAME=<username>,PASSWORD=<password>" HAIBUN_O_WEBPLAYWRIGHT_HEADLESS=false npm run e2e-basic`

The results will appear on the console after running this command.

# Running in pipeline

Define `test_password` and `test_password` variables for the pipeline.

The results will be reported as JUnit tests, which will appear on the Azure Devops dashboard.
