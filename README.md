# DialogFlowV2-Angular9

Since dialogFlow has been moved to V2, we cannot directly 
consume the dialogFlow Rest API from an angular application, as usual.

And we cannot currently use the dialogFlow SDK directly in angular application.
so we need to follow this steps in order to get it works.

# 1-get the service account:
As indicated in the documentation download the service account linked to the dialogFlow agent:
https://dialogflow.com/docs/reference/v2-auth-setup
# 2-get the service account:
Paste the account service file in chat-provider.
# 3-run the gateway:
run : node index.js => the api that will take your request and talk to dialogFlow API
# 4-run your angular App:
ng serve 




