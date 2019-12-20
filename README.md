# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- body-parser 1.15.2 or above
- md5 2.1.0 or above

## Details

This simple Twitter clone accepts input to the tweet form and will send a AJAX POST request to the server. An AJAX GET request gets the new tweet and updated the Tweeter feed. The full feed is updated when the page is refreshed.  

To compose a tweet, click on "Write a new tweet" on the top right to expose the new tweet form. The form will check for tweets that are too long or empty. Once a valid tweet is sent, the server will generate a random name and avatar for you.

Clicking on the "Write a new tweet" button again will close the new tweet form.

The app will dynamically resize when the window size changes. The layout will shift once the window is below 768px to accomodate small screens

## Images
