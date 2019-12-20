/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 * icons Font Awesome. License: https://fontawesome.com/license
 */

const daysElapsed = (date) => {
  const DAYS_PER_WEEK = 7;
  const now = new Date(Date.now());
  const tweetTime = new Date(date);
  const elapsedYear = now.getFullYear() - tweetTime.getFullYear();
  const elapsedMonth = now.getMonth() - tweetTime.getMonth();
  const dateDiff = now.getDate() - tweetTime.getDate();
  const hourDiff = now.getHours() - tweetTime.getHours();
  const minDiff = now.getMinutes() - tweetTime.getMinutes();
  const secDiff = now.getSeconds() - tweetTime.getSeconds();

  let elapsedStr = '';

  // this doesn't account for times that cross sec, min, hour, etc. boundaries but are full min, hour, day, etc
  if (elapsedYear > 0) {
    elapsedStr = `${elapsedYear} year${elapsedYear > 1 ? 's' : ''} ago`;
  } else if (elapsedMonth > 0 || (elapsedMonth > 0 && dateDiff >= 0)) {
    elapsedStr = `${elapsedMonth} month${elapsedMonth > 1 ? 's': ''} ago`;
  } else if (dateDiff >= DAYS_PER_WEEK) {
    const weeks = Math.floor(dateDiff / DAYS_PER_WEEK);
    elapsedStr = `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (dateDiff > 0 || (dateDiff > 0 && hourDiff >= 0)) {
    elapsedStr = `${dateDiff} day${dateDiff > 1 ? 's' : ''} ago`;
  } else if (hourDiff > 0 || (hourDiff === 1 && minDiff >= 0)) {
    elapsedStr = `${hourDiff} hours ago`;
  } else if (minDiff > 0 || (minDiff === 1 && secDiff >= 0)) {
    elapsedStr = `${minDiff} minutes ago`;
  } else {
    elapsedStr = 'now';
  }
  
  return elapsedStr;
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
  let date = daysElapsed(tweet.created_at);
  // const date = new Date(tweet.created_at).toDateString();
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
  const errBox = $('.error-box');
  errBox.html('Failed to load tweets.')
  errBox.slideDown('fast');
};

const notifyTweetTooLong = () => {
  const errBox = $('.error-box');
  errBox.html(`The tweet is over the ${MAX_CHAR} character limit.`);
  $('.error-box').slideDown('fast');
}

const notifyTweetEmpty = () => {
  const errBox = $('.error-box');
  errBox.html(`The tweet is empty.`);
  $('.error-box').slideDown('fast');
}

const hideErrorBox = () => {
  const errBox = $('.error-box');
  $('.error-box').slideUp('fast');
};

// ==== DOCUMENT READY =====
$(document).ready(function() {
  // call this right away to load all tweets
  let loadTweets;
  (loadTweets = function()  {
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

    hideErrorBox();

    if (textarea.val().length > MAX_CHAR) {
      notifyTweetTooLong();
    } else if (textarea.val() === '' || textarea.val() === null) {
      notifyTweetEmpty();
    } else {
      $.post('/tweets', textarea.serialize())
        .then(() => {
          textarea.val('');
          $('.counter').html(MAX_CHAR);
          return $.get('/tweets');
        })
        .then((res) => {
          const ourTweet = res[res.length - 1];
          renderTweet(ourTweet);
        })
        .fail(failToLoadTweet);
    }
  });
});
