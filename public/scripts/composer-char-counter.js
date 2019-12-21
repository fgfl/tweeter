/**
 * Dec 17, 2019
 * Frederick Lee
 */
const MAX_CHAR = 140;

$(document).ready(function() {
  $('.new-tweet textarea').keyup(function() {
    const counter = $(this).siblings('.counter');
    const submitButton = $(this).siblings('input');
    const charsRemaining = MAX_CHAR - $(this).val().length;

    if (charsRemaining < 0) {
      counter.addClass('counter-over-char-limit');
      submitButton.addClass('submit-over-char-limit');
    } else {
      counter.removeClass('counter-over-char-limit');
      submitButton.removeClass('submit-over-char-limit');
    }

    counter.html(charsRemaining);
  });

  $('.to-top').click(function() {
    $('html, body').animate({
      scrollTop: $('body').offset().top,
    }, 'slow');

    $('#new-tweet').slideDown('slow', function() {
      $('.new-tweet textarea').focus();
    });

  });

  $(window).scroll(function() {
    const toTopButton = $('.to-top');
    const navButton = $('.nav-right');
    if ($(this).scrollTop() > 100) {
      toTopButton.slideDown();
      navButton.slideUp();
    } else {
      toTopButton.slideUp();
      navButton.slideDown();
    }
  });

});
