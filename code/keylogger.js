const fs = require('fs');
const filename = 'Input/Keylogger/KeyloggerRecord.txt';
const time_reg = /.*\s\|\s\d+\s\w+\s\d+,\s\d:\d+\s\w+/g;
const web_reg = /^(http)|\(Clipboard\sin.*\)/g;
const keystroke_reg = /\(Keystrokes\sin\s.*\)/g
const special_reg = /\[Cmd\]|\[Cmd+\]|\[Space\]|\[Enter\]|\[Tab\]|\[Shift\]|\[Shift+\]|\[Ctrl\]|\[Ctrl+\]/g
const delete_reg = /\[Delete\]/g

function stripComments(str) {
  return str.replace(keystroke_reg, '').replace(special_reg, 'a');
}

let word_count = 0; let delete_count = 0;
function readfile(filename) {
  fs.readFile(filename, function read(err, data) {
    if (err) console.log(err);
    
    const content = data.toString().split('\n');
    for (line of content) {
      if (!time_reg.test(line) && !web_reg.test(line)) {
        line = stripComments(line);

        let tmp_count = 0;
        if (delete_reg.test(line)) tmp_count = line.match(delete_reg).length;
        line = line.replace(delete_reg, '').replace(' ', '');
        word_count += line.length + tmp_count;
        delete_count += tmp_count;
      }
    }
  });
}

readfile(filename);
setTimeout(() => {
  ratio = delete_count/(word_count);
  console.log(ratio);
}, 5000);
