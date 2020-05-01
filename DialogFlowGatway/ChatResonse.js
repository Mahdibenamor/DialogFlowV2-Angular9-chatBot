
const express = require('express');
var dialogflow = require("dialogflow");
const cors = require('cors')({ origin: true});

const UserRouter = express.Router();


UserRouter.route('/chatResponse').post(function (request, response) {
       cors(request, response, async () => {

           const { queryInput, sessionId,serviceAccount } = request.body;
           let projectId;
           let sessionClient ;
           let sessionPath;
           let responses;

           try{
                projectId = serviceAccount.project_id;
                sessionClient= new dialogflow.SessionsClient({credentials: serviceAccount});
                sessionPath = sessionClient.sessionPath(projectId, sessionId);
                const data = {session: sessionPath, queryInput: queryInput};
                responses = await sessionClient.detectIntent(data);
                const result = responses[0].queryResult.fulfillmentMessages;
                response.send(result);
           }catch (e) {
               console.log(e);
               response.status(400).json({error:e.toString()})
           }

       });


});

module.exports = UserRouter;

/*

async function runSample() {
    const projectId = "agent-aqciai";
    const sessionId = "foo";
    const authenticationFile = "./service-account1.json";

    const sessionClient = new dialogflow.SessionsClient({
        projectId,
        keyFilename: authenticationFile
    });
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: 'bonjour',
                // The language used by the client (en-US)
                languageCode: 'fr',
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log('  No intent matched.');
    }
}*/
// [END dialogflow_quickstart]



