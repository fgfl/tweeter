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
};

const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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
  const text = escape(tweet.content.text);

  const tweetElm = `
    <article class="tweet">
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

/**
* Append the tweet HTML to the #tweets-container
* @param {string} $tweet single tweet object
*/
const renderTweet = ($tweet) => {
  $('#tweets-container').prepend(createTweetElement($tweet));
};

/**
* Appends a list of tweets to the #tweet-container
* @param {array} arrOfTweets array of tweet objects
*/
const renderTweets = (arrOfTweets) => {
  for (const tweet of arrOfTweets) {
    renderTweet(tweet);
  }
};


const failToLoadTweet = (err) => {
  alert('Failed to load tweets.', err);
};

const notifyTweetTooLong = () => {
  alert(`The tweet is over the ${MAX_CHAR} character limit.`);
}

const notifyTweetEmpty = () => {
  alert(`The tweet is empty.`);
}

// ==== DOCUMENT READY =====
$(document).ready(function() {
  // call this right away to load all tweets
  let loadTweets;
  (loadTweets = function()  {
    // $.ajax({
    //   method: 'GET',
    //   url: '/tweets',
    // })
    // Same as using above ajax request (https://api.jquery.com/jQuery.get/)
    $.get('/tweets')
      .then((tweets) => {
        renderTweets(tweets);
      })
      .fail(failToLoadTweet);
  })();

  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const textarea = $(this).children('textarea');

    if (textarea.val().length > MAX_CHAR) {
      notifyTweetTooLong();
    } else if (textarea.val() === '' || textarea.val() === null) {
      notifyTweetEmpty();
    } else {
      $.post('/tweets', textarea.serialize())
        .then(() => {
          textarea.val('');
          console.log('post')
          return $.get('/tweets');
        })
        .then((res) => {
          const ourTweet = res[res.length - 1];
          console.log('get')
          renderTweet(ourTweet);
        })
        .fail(failToLoadTweet);
    }
  });
});
