/**
 * Dec 17, 2019
 * Frederick Lee
 */


$(document).ready(function() {

  $('.nav-right').click(function() {
    $('#new-tweet').slideToggle('slow');
    $('html, body').animate({
      scrollTop: $('#new-tweet').offset().top - $('nav').outerHeight()
    }, 500);
  });
});