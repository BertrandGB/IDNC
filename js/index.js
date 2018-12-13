//Test that everything's OK
console.log("JS is started");


(function($) {
  "use strict"; // Start of use strict

let MenuNode = (menu) => {
    //create the node
    var node = document.createElement("div");
    node.id="generic";
    node.className="col-lg-3 col-md-4 col-sm-6 menus-item";
    //fetch the skeleton
    $.ajax({
       url:'./skeleton-card.html',
       type:'GET',
       success: function(data){
               console.log(data);
               node.innerHTML=data;
               console.log('success3');
       }
    });
    //populate the node with menu json structure
    //TO DO
    return node;
};



  console.log('IN');

  var a = {};

  $.getJSON('data.json', function(data) {
      a = data;
      console.log(a);
      $.each(a, function(idx, elem) {
          console.log(idx);
          console.log(elem);
          $('table#tbl tbody').append('<tr><td>' + elem.ID + '</td><td>' + elem.Name + '</td><td>' + elem.IDNumber + '</td></tr>');
      });
  });




  // Smooth scrolling using jQuery easing
  // Select all links with hashes
  // standard code from https://css-tricks.com/snippets/jquery/smooth-scrolling/
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
          &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
      });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.menus-modal').on('show.bs.modal', function(e) {
    $('.navbar').addClass('d-none');
    console.log("add");
  })
  $('.menus-modal').on('hidden.bs.modal', function(e) {
    $('.navbar').removeClass('d-none');
    console.log("remove");
  })

})(jQuery); // End of use strict
