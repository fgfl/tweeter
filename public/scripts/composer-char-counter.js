/**
 * Dec 17, 2019
 * Frederick Lee
 */
const MAX_CHAR = 140;

$(document).ready(function() {
  $('.new-tweet textarea').keyup(function() {
    $(this).siblings('.counter').html(MAX_CHAR - $(this).val().length);
  });
});