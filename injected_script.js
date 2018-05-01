var btn = document.getElementById("nightPlay");

console.log("button = ", btn);

btn.addEventListener('click', function(){
  //var input = $('#Tweetstorm-tweet-box-0');
  var newTweet = document.getElementById("Tweetstorm-tweet-box-0");
  var textareas = newTweet.getElementsByClassName("tweet-box");
  if (!textareas.length) return;
  var text = textareas[0].children[0].innerText;
  console.log(text);
  //var c = decodeURI(this.getAttribute("data-original-content"));
  //this.parentNode.innerHTML = c;
});
