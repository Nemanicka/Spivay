// var btns = document.getElementsByClassName("nightPlay");

var instruments = {
  piano  : 1,
  strings: 1,
  drums  : 1
};

var parseTexts = function (texts) {
  melodies = [];

  for (let i=0; i<texts.length; ++i) {
    if (!texts[i]) continue;

    let n = texts[i].search(/#spivay/i);
    if (n === -1) {
      continue;
    }

    let melody = texts[i].substr(n);
    let tokens = melody.split(' ');
    if (tokens.length < 3) {
      continue;
    }

    if (instruments[tokens[1]] !== 1) {
      continue;
    }

    melodies.push(tokens);
  }

  chrome.runtime.sendMessage({message: {code: "play", melodies: melodies}, function (response) {

    }
  });
}

var inputBoxes = document.getElementsByClassName('TweetstormDialog-tweet-box');
for (let i=0; i<inputBoxes.length; ++i) {
  let id = inputBoxes[i].getAttribute("id");
  let btns = inputBoxes[i].getElementsByClassName("nightPlay");
  if (btns.length != 1) {
    continue;
  }

  btns[0].addEventListener('click', function() {
    let texts = [];
    let newTweets = document.getElementsByClassName('TweetstormDialog-tweet-box');
    for (let j=0; j<newTweets.length; ++j) {
      let textareas = newTweets[j].getElementsByClassName("tweet-box");

      if (textareas.length != 1) continue;

      if (!textareas[0] ||
          !textareas[0].children ||
          !textareas[0].children[0])
          continue;

      let text = textareas[0].children[0].innerText;
      texts.push(text);
    }

    parseTexts(texts);
  });
}
