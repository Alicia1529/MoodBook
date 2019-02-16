const fs = require('fs');
const fileNames = ['Input/Text/1-1.txt','Input/Text/1-2.txt','Input/Text/1-3.txt'];
const textAnalysis = [];
const actors = ["Rachel"];

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

    const dateAnalysis = {};
    for (const actor of actors) {
      if (!cms.hasOwnProperty(actor)){
        continue;
      }
      actorData = cms[actor];
      for (const TextSentence of actorData) {
        setTimeout(() =>{
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
            if (err) {
              console.log('error:', err);
            }
            else {
              if (response.emotion.hasOwnProperty('document')) {
                emotion = response.emotion.document.emotion;
                for (e in emotion) {
                  if (!dateAnalysis.hasOwnProperty(actor)) dateAnalysis[actor] = {};
                  if (!dateAnalysis[actor].hasOwnProperty(e)) {
                    dateAnalysis[actor][e] = emotion[e];
                  } else {
                    dateAnalysis[actor][e] += emotion[e];
                  }
                }
                if (!dateAnalysis[actor].hasOwnProperty('sentiment')) dateAnalysis[actor]['sentiment'] = [];
                dateAnalysis[actor]['sentiment'].push(response.sentiment.document.score);
              }
            }
          });
        }, 500);
          
      }
    }
    setTimeout(() => {
      textAnalysis.push(dateAnalysis);
      console.log(textAnalysis);
    }, 10000);
  });
}

setTimeout(function() {
  fs.writeFile("Output/script_analysis.json", JSON.stringify(textAnalysis), 'utf8', function(err) {
    if(err) console.log(err);
  })
}, 15000);