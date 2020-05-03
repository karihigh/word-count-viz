let txt;
let counts = {};
let keys = [];
let ww = 2000;
let wh = 1200;

function preload() {
  txt = loadJSON('/EveryFullTextAnnotation-noFileName.json');
}

function setup() {
  createCanvas(ww, wh);

  let allwords = txt.responses.join("\n");
  let tokens = allwords.split(/\W+/);
  console.log(tokens.length);

  for (let i = 0; i < 20000; i++) {
    let word = tokens[i].toLowerCase();
    if (!/\d+/.test(word)) {
      if (counts[word] === undefined) {
        counts[word] = 1;
        keys.push(word);
      } else {
        counts[word] = counts[word] + 1;
      }
    }
  }
  //console.log(counts);
  keys.sort(compare);

  function compare(a,b) {
    let countA = counts[a];
    let countB = counts[b];
    return countB - countA;
  }

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    //console.log(key + " " + counts[key]);
    finalcount = key + " " + counts[key];

    //console.log(positx)
    if (counts[key] > 6){
      let positx = random(1, ww);
      let posity = random(40, wh);
      let myP = createElement('p', key);
      myP.position(positx, posity);
      myP.style('font-family', 'sans-serif');
      //myP.style('margin-bottom', '-65px');
      myP.style('margin', '10px');
      myP.style('font-size', counts[key]*2 + 'px');
      myP.style('color', 'rgba(0, 0, 0, 0.8)');
    }
  }
}
