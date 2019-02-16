

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  'version': '2018-11-16',
  'iam_apikey': 'GKB49eZbKj9qKAjzso1H9ZWYTtBMbKDlzKG6RcjL-erN',
  'url': 'https://gateway-wdc.watsonplatform.net/natural-language-understanding/api'
});

var parameters = {
  'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
  'features': {
    'entities': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    },
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    }
  }
}

naturalLanguageUnderstanding.analyze(parameters, function(err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
