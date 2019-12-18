/**
 * Dec 17, 2019
 * Frederick Lee
 */

$(document).ready(function() {
  const tweets = $.get('/tweets', function(data, status) {
    if (status === 'success') {
      for (tweet of data) {
        $('main').append(`
          <article class="section tweet">
            <header>
              <div>
                <img src=${tweet.user.avatars}><h3 class="name">${tweet.user.name}</h3>
              </div>
              <h3 class="handle">${tweet.user.handle}</h3>
            </header>
            <p class="msg">${tweet.content.text}></p>
            <footer>
              <p>${tweet.created_at}</p>
              <div>

              </div>
              <img/>
            </footer>
              
          </article>
        `);

      }
    }
    console.log('data',data);
  });
});
