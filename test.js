const fs = require('fs');
const fileNames = ['Input/Text/1-1.txt'];//,'Input/Text/1-2.txt','Input/Text/1-3.txt'
const cmsDate = [];//array [date1,date2,date3]
const textAnalysis = [];
const actors = ["Rachel"];//,"Joey","Chandler","Monica"

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  'version': '2018-11-16',
  'iam_apikey': 'GKB49eZbKj9qKAjzso1H9ZWYTtBMbKDlzKG6RcjL-erN',
  'url': 'https://gateway-wdc.watsonplatform.net/natural-language-understanding/api'
});

function stripComments(str) {
  return str.replace(/\(.*\)|\[.*\]/g, "");
}


for (const filename of fileNames){
  fs.readFile(filename, function read(err, data) {
  if (err) console.log(err);
  const cms = {};
  const content = data.toString().split('\n\n');
  for (line in content) {
    content[line] = stripComments(content[line]);
    result = content[line].split(':');
    const charac = result[0];
    const script = result[1];
    if (cms[charac] === undefined && script !== undefined) {
      cms[charac] = [script.trim()];
    } else if (script !== undefined) {
      cms[charac].push(script.trim());
    }
  }
  cmsDate.push(cms);
  const dateAnalysis = {};
  for (const actor of actors){
    if ( !(cms.hasOwnProperty(actor)) ){
      console.log(actor)
      continue;
    }
    actorData = cms[actor];
    console.log("actor",actor);
    console.log("actorData",actorData)
    const emotion = [];
    const sentiment = [];
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
  textAnalysis.push(dateAnalysis);
  console.log(textAnalysis)

});
}
