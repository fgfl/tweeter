/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 * icons Font Awesome. License: https://fontawesome.com/license
 */

const daysElapsed = (date) => {
  const elapsed = Math.round(Date.now() - date) / (1000 * 60 * 60 *24); 
  return elapsed.toFixed(0);
}

/**
 * Append the tweet HTML to the #tweets-container
 * @param {string} $tweet single tweet element (HTML)
 */
 const renderTweet = ($tweet) => {
  $('#tweets-container').prepend($tweet);
 };

 /**
  * Appends a list of tweets to the #tweet-container
  * @param {array} arrOfTweets array of tweet elements
  */
 const renderTweets = (arrOfTweets) => {
  for (const $tweet of arrOfTweets) {
    renderTweet($tweet);
  }
 };

 /**
  * Returns the HTML text that the browser can use to render the tweet
  * @param {object} tweet tweet object from the server databae
  */
const createTweetElement = (tweet) => {
  const avatar = tweet.user.avatars;
  const name = tweet.user.name;
  const handle = tweet.user.handle;
  // let date = daysElapsed(tweet.created_at);
  const date = new Date(tweet.created_at).toDateString();
  const text = tweet.content.text;

  const tweetElm = `
    <article class="section tweet">
      <header>
        <div>
          <img src="${avatar}"><h3 class="name">${name}</h3>
        </div>
        <h3 class="handle">${handle}</h3>
      </header>
      <p class="msg">${text}</p>
      <footer>
        <p>${date}</p>
        <div>
          <img class="icon" src="/images/flag-solid.svg" />
          <img class="icon" src="/images/retweet-solid.svg" />
          <img class="icon" src="/images/heart-solid.svg" />
        </div>
      </footer>
        
    </article>
  `;
  return tweetElm;
};


$(document).ready(function() {
  // $.ajax({
  //   method: 'GET',
  //   url: '/tweets',
  // })
  // Same as using above ajax request (https://api.jquery.com/jQuery.get/)
  $.get('/tweets')
    .then((tweets) => {
      const arrOfTweets = [];
      for (const tweet of tweets) {
        arrOfTweets.push(createTweetElement(tweet));
      }
      renderTweets(arrOfTweets);
    })
    .fail((err) => {
      alert('Failed to load tweets.', err);
    });


  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).children('textarea').serialize(),
    })
      .then(() => {
        return $.ajax({
          method: 'GET',
          url: '/tweets'
        });
      })
      .then((res) => {
        const ourTweet = [createTweetElement(res[res.length - 1])];
        renderTweets(ourTweet);
      })
  });
});
