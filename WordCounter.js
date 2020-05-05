let txt;
let font;
let counts = {};
let keys = [];
let wordIndex = [];
let boxes = [];
let ww = 2000;
let wh = 1200;



function preload() {
  txt = loadJSON('/EveryFullTextAnnotation-noFileName.json');
  font = loadFont('./fonts/helvetica.otf');
}

// function preload() {
 
// }

function setup() {
  createCanvas(ww, wh);

  let allwords = txt.responses.join("\n");
  let tokens = allwords.split(/\W+/);
  console.log(tokens.length);

  for (let i = 0; i < 5000; i++) {
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
      // let positx = random(1, ww);
      // let posity = random(40, wh);
      // let myP = createElement('p', key);
      // myP.position(positx, posity);
      // myP.style('font-family', 'sans-serif');
      // //myP.style('margin-bottom', '-65px');
      // myP.style('margin', '10px');
      // myP.style('font-size', counts[key]*2 + 'px');
      // myP.style('color', 'rgba(0, 0, 0, 0.8)');
      
      textFont(font);
      textSize(counts[key]*2);
      let box = font.textBounds(key)
      box.w *= 1.15
      box.h *= 1.15
      boxes.push(box);      
      // text(key, 0, i * 10);
      wordIndex.push(i)
    }
  }

  let packer = new  GrowingPacker(ww, wh);
  boxes.sort(function(a,b) { return (b.h < a.h); }); // sort inputs for best results
  packer.fit(boxes);

  for(var n = 0 ; n < boxes.length ; n++) {
    var block = boxes[n];
    if (block.fit) {
      // rect(block.fit.x, block.fit.y, block.w, block.h);
      textFont(font);
      textSize(counts[keys[wordIndex[n]]]*2);
      text(keys[wordIndex[n]], block.fit.x, block.fit.y + block.h)
    }
  }
}
