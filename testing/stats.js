const fs = require('fs');
const readline = require('readline');

const read = fs.createReadStream('./ls-lR.txt');
// const write = fs.createWriteStream('./testing/write.txt', { encoding: 'utf8' });

const rl = readline.createInterface({
  input: read,
});

let lines = 0;
let texts = 0;
let size = 0;
let max = 0;
let maxFile = '';
const maxes = [0];
rl.on('line', (line) => {
  lines++;
  if (/\.txt$/.test(line)) {
    texts++;
    // write.write(`${line}\n`);
    const match = line.match(/^\S+\s+\S+\s+\S+\s+\S+\s+(\d+)/);
    const sz = Number(match[1]);
    if (sz > maxes[0]) {
      maxes.push(sz);
      maxes.sort((a, b) => (a - b));
      if (maxes.length > 50) {
        maxes.shift();
      }
    }
    if (sz > max) {
      max = sz;
      maxFile = line;
    }
    size += sz;
  }
});

rl.on('close', () => {
  console.log(lines, texts, size, size / texts, max);
  console.log(maxFile);
  console.log(maxes);
});

/*

3215214 110436 46020461268 416716.1185482995 150531148
-rw-rw-rw-. 1 gbnewby pg 150531148 Aug 25  2021 3512-0.txt
[
    9840067,   9873495,  9877862,  10031344,
   10031347,  10056747, 10305483,  10547077,
   10565721,  10594621, 10686587,  12066257,
   12261370,  12266029, 12288767,  12512428,
   12980284,  13516907, 13640057,  14666345,
   14729083,  14755450, 14775192,  14957991,
   15140710,  15446001, 15669414,  16013968,
   16637472,  18797303, 19195353,  19568950,
   19664049,  19674816, 20045118,  24853275,
   28432183,  28930485, 29509377,  32703397,
   33267023,  34707288, 36389734,  45769399,
   45769828,  57923382, 73370264, 150526548,
  150526548, 150531148
]

*/
