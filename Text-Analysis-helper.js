const fs = require('fs');
const fileNames = ['Input/Text/1-1.txt','Input/Text/1-2.txt','Input/Text/1-3.txt'];//
const cmsDate = [];//array [date1,date2,date3]

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
});
}

module.exports = {
  cmsDate:cmsDate,
  actors:["Rachel","Joey","Chandler","Monica"]
}
