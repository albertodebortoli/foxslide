$(document).ready(function(){
  $('.hentry .image-wrapper').click(function(){
    if( $(this).hasClass('octobox') ) {
      $('.octobox img').css("margin-top", 0 + "px");
      $('.octobox').removeClass('octobox');
    } else {
      $(this).addClass('octobox');
      var octoboxMarginTop = -($('.octobox img').height())/2;
      $('.octobox img').css("margin-top", octoboxMarginTop + "px" );
    }
  });
});