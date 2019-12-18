/**
 * Dec 17, 2019
 * Frederick Lee
 * 
 * icons Font Awesome. License: https://fontawesome.com/license
 */

const daysElapsed = (date) => {
  const elapsed = Math.round(Date.now() - date) / (1000 * 60 * 60 *24); 
  return elapsed.toFixed(0);
}

$(document).ready(function() {
  const tweets = $.get('/tweets', function(data, status) {
    if (status === 'success') {
      for (tweet of data) {
        const avatar = tweet.user.avatars;
        const name = tweet.user.name;
        const handle = tweet.user.handle;
        // let date = daysElapsed(tweet.created_at);
        const date = new Date(tweet.created_at).toDateString();
        const text = tweet.content.text;


        $('main').append(`
          <article class="section tweet">
            <header>
              <div>
                <img src="${avatar}"><h3 class="name">${name}</h3>
              </div>
              <h3 class="handle">${handle}</h3>
            </header>
            <p class="msg">${text}></p>
            <footer>
              <p>${date}</p>
              <div>
                <img class="icon" src="/images/flag-solid.svg" />
                <img class="icon" src="/images/retweet-solid.svg" />
                <img class="icon" src="/images/heart-solid.svg" />
              </div>
            </footer>
              
          </article>
        `);

      }
    }
  });
});
