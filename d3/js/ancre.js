    $('a').on('click', function(evt){
       evt.preventDefault();
 var target = $(this).attr('href');
    if(target.charAt(0) === '#') {
      console.log('ddd');
      $('html, body')
         .stop()
         .animate({scrollTop: $(target).offset().top}, 1000 );
    } else {
      document.location.href = target;
    }
  });
