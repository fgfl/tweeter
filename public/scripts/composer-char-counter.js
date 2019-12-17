/**
 * Dec 17, 2019
 * Frederick Lee
 */
const MAX_CHAR = 140;

$(document).ready(function() {
  $('.new-tweet textarea').keyup(function() {
    const counter = $(this).siblings('.counter');
    const charsRemaining = MAX_CHAR - $(this).val().length;

    if (charsRemaining < 0) {
      counter.addClass('over-char-limit');
    } else {
      counter.removeClass('over-char-limit');
    }

    counter.html(charsRemaining);
  });
});