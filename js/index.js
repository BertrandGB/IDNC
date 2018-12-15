//Test that everything's OK
console.log("JS is started");


(function($) {
  "use strict"; // Start of use strict

  console.log("We are in the function");

      var requestURL = 'data.json';
      var request = new XMLHttpRequest();

      request.open('GET', requestURL);
      request.responseType = 'json';

      request.send();
      request.onload = function() {
          var data = request.response;    //    populateHeader(superHeroes);
          showCards(data);
          console.log(JSON.stringify(data));
          console.log(data);
      }

/*
<section id="repas">
    <div class='container'>
        <div class="row" id ='repas_row'>
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card">
                    <img class="card-img-top" src="img/12-05-m.jpg" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
*/
    function showCards(jsonObj) {
        for (var i = 0; i < jsonObj.length; i++) {
            var myArticle = document.createElement('div');
            myArticle.className = 'col-lg-3 col-md-4 col-sm-6 menu';
            var card = document.createElement('div');
            card.className = 'card';
            var card_img = document.createElement('img');
            card_img.className = 'card-img-top';
            var card_body = document.createElement('div');
            card_body.className = 'card-body'
            var card_title = document.createElement('h5');
            card_title.className = 'card-title';
            var card_text = document.createElement('p');
            card_text.className = 'card-text';

            card_img.src = "img/" + jsonObj[i].date + ".jpg"

            var menus = jsonObj[i].menu;
            for (var j = 0; j < menus.length; j++) {
                var menu_item = document.createElement('h5');
                menu_item.className = 'card-title';
                menu_item.textContent = menus[j];
                card_body.appendChild(menu_item);
            };

            card_text.textContent = jsonObj[i].date;
            card_body.appendChild(card_text);

            card.appendChild(card_img);
            card.appendChild(card_body);

            myArticle.appendChild(card);

            document.getElementById('repas_row').appendChild(myArticle);
        }
    }





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
