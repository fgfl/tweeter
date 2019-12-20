/**
 * Dec 17, 2019
 * Frederick Lee
 */


$(document).ready(function() {

  $('.nav-right').click(function() {
    $('#new-tweet').slideToggle('slow', function() {
      $('.new-tweet textarea').focus();
    });

    $('html, body').animate({
      scrollTop: $('#new-tweet').offset().top - $('nav').outerHeight()
    }, 'slow');
  });
});