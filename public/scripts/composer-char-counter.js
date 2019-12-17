/**
 * Dec 17, 2019
 * Frederick Lee
 */
const MAX_CHAR = 140;

$(document).ready(function() {
  $('.new-tweet textarea').keyup(function() {
    console.log('keyup: ', MAX_CHAR - $(this).val().length);
  });
});