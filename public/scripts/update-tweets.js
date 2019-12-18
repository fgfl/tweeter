/**
 * Dec 17, 2019
 * Frederick Lee
 */

$(document).ready(function() {
  const tweets = $.get('/tweets', function(data, status) {
    if (status === 'success') {
      for (tweet of data) {
        $('main').append(
          `<article class="section tweet">
            <header>
              <img src=${tweet.user.avatars}> <h3>${tweet.user.name}</h3>
              <p>${tweet.content.text}></p>
              <br/>
              <p>${tweet.created_at}</p>
            </header>
            <footer>Footer</footer>
          </article>`
        );

      }
    }
    console.log('status', status);
    console.log('data',data);
  });
  console.log('tweets', tweets)
});
