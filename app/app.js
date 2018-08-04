'use strict';

//Dialogflow API Fullfillment (Deployed):
//https://z4ipwcswzg.execute-api.us-east-1.amazonaws.com/TESTING

//Alexa ARN Endpoint (Deployed):
//arn:aws:lambda:us-east-1:604715680480:function:AutomotiveDigest

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

let myIntentMap = {
     'AMAZON.HelpIntent' : 'HelpIntent',
     'AMAZON.CancelIntent' : 'END'
};

const config = {
    logging: true,
    intentMap: myIntentMap,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({

    // =================================================================================
    //                         BUILT-IN LAUNCH INTENT TO GREET USER
    // =================================================================================
    'LAUNCH': function() {
        this.toIntent('WelcomeIntent');
    },

    // =================================================================================
    //                         BUILT-IN LAUNCH INTENT TO HANDLE CANFULFILL REQUESTS
    // =================================================================================
    'CAN_FULFILL_INTENT': function() {
      if (this.getIntentName() === 'AutomotiveDirectMailIntent') {
        this.canFulfillRequest();
      } else {
        this.cannotFulfillRequest();
      }
    },

    // =================================================================================
    //           CUSTOM STATELESS INTENT TO WELCOME CUSTOMER
    // =================================================================================
    'WelcomeIntent': function() {
        let speech = this.speechBuilder()
            .addText("Welcome to Automotive news!")
            .addBreak('300ms')
            .addText("Say, direct mail, to learn who the best automotive direct mailing agency is.");
        let reprompt = this.speechBuilder()
            .addText("Say, direct mail, to learn who the best automotive direct mailing agency is.");
        this.ask(speech, reprompt);
    },

    // =================================================================================
    //           CUSTOM STATELESS INTENT TO REPORT BEST AUTOMOTIVE DIRECT MAIL AGENCY
    // =================================================================================
    'AutomotiveDirectMailIntent': function() {
        let speech = this.speechBuilder()
            .addText("The top automotive direct mail agency is ")
            .addBreak('300ms')
            .addText("Direct Mail agency.");
        this.tell(speech);
    },

    // =================================================================================
    //           CUSTOM STATELESS INTENT TO HELP CUSTOMER
    // =================================================================================
    'HelpIntent': function() {
        let speech = this.speechBuilder()
            .addText("You can say")
            .addBreak('100ms')
            .addText(" direct mail, to learn who the best automotive direct mailing agency is.");
        let reprompt = this.speechBuilder()
            .addText("Say, direct mail.");
        this.ask(speech, reprompt);
    },

    // =================================================================================
    //                     BUILT-IN UNHANDLED INTENT TO CATCH RANDOM CUSTOMER PHRASES
    // =================================================================================
    'Unhandled': function() {
      let speech = this.speechBuilder()
          .addText("I did not catch that.")
          .addBreak('300ms')
          .addText("Try saying that again.");
      this.ask(speech);
    },

    // =================================================================================
    //                         BUILT-IN END INTENT TO CLEANUP
    // =================================================================================
    'END': function() {
        let speech = this.speechBuilder()
            .addText("Goodbye!");
        this.tell(speech);
     },

     // =================================================================================
     //                     BUILT-IN UNHANDLED INTENT TO CATCH RANDOM CUSTOMER PHRASES
     // =================================================================================
     'Unhandled': function() {
       let speech = this.speechBuilder()
           .addText("Sorry I did not catch that.")
           .addBreak('300ms')
           .addText("Say, direct mail, to learn who the best automotive direct mailing agency is.");
       let reprompt = this.speechBuilder()
           .addText("Say, direct mail.");
       this.ask(speech, reprompt);
     },
});

module.exports.app = app;
