const helper = require("./Text-Analysis-helper.js");
console.log(helper)
const dataText = helper.cmsDate;
console.log(dataText)
const dataActors = helper.actors;

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  'version': '2018-11-16',
  'iam_apikey': 'GKB49eZbKj9qKAjzso1H9ZWYTtBMbKDlzKG6RcjL-erN',
  'url': 'https://gateway-wdc.watsonplatform.net/natural-language-understanding/api'
});

//output array of objects(for each day)
// [{ "Rachel":{
//           "emotion":[object1,object2,...],
//           "sentiment":[num1,num2,...]
//         },
//     "Joey":{...}
// }]

const outputTextAnalysis = [];
for (const eachDay of dataText){
  const dateAnalysis = {};
  for (const actor of dataActors){
    actorData = eachDay[actor];
    const emotion = [];
    const sentiment = [];
    console.log("actor",actor)
    for (const TextSentence of actorData){
      var parameters = {
        'text': `${TextSentence}`,
        'features': {
          'emotion':{
            'document':true
          },
          'sentiment':{
            "document":true
          }
        }
      }
      naturalLanguageUnderstanding.analyze(parameters, function(err, response) {
        if (err){
          console.log('error:', err);
        }
        else{
          emotion.push(JSON.stringify(response.emotion, null, 2));
          sentiment.push(JSON.stringify(response.sentiment, null, 2))
        }
      });
    }
    dateAnalysis[actor] = {emotion,sentiment};
  }
  outputTextAnalysis.push(dateAnalysis)
}

// console.log(outputTextAnalysis[0]["Rachel"])
module.exports = {
  outputTextAnalysis:outputTextAnalysis,
  actors:dataActors
}
