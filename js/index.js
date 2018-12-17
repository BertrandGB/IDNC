//Test that everything's OK
console.log("JS is started");


(function($) {
  "use strict"; // Start of use strict

      var requestURL = 'data.json';
      var request = new XMLHttpRequest();

      request.open('GET', requestURL);
      request.responseType = 'json';

      request.send();
      request.onload = function() {
          var data = request.response;    //    populateHeader(superHeroes);
          showCards(data);
      }

    function createModalCard(parent,photo){
        var modal_col=document.createElement("div");
            modal_col.className="col-lg-3 col-md-4 col-sm-6";
        var modal_card=document.createElement("div");
            modal_card.className="card";
        var modal_card_img = document.createElement('img');
            modal_card_img.className = 'card-img';
            modal_card_img.src = "img/" + photo;
        parent.appendChild(modal_col);
        modal_col.appendChild(modal_card);
        modal_card.appendChild(modal_card_img);
    };


    function createModal(data) {
        var myModal= document.createElement('div');
            myModal.className="detail-modal modal fade";
        var tagRef=data.date
            tagRef=tagRef.substring(0, tagRef.length-5)+tagRef.substring(tagRef.length-4,tagRef.length);
            myModal.setAttribute("id",tagRef);
        var modal_dialog=document.createElement('div');
            modal_dialog.className="modal-dialog modal-dialog-centered";
        var modal_content=document.createElement('div');
            modal_content.className="modal-content";
        var modal_container=document.createElement('div');
            modal_container.className="container";
        var modal_row=document.createElement("div");
            modal_row.className="row justify-content-md-center";

        var photos=data.photo;
        for (var j = 0; j < photos.length; j++) {
            createModalCard(modal_row,photos[j]);
        };

        var modal_body=document.createElement("div");
            modal_body.className="modal-body";

        var details = data.detail;
        for (var j = 0; j < details.length; j++) {
            var modal_detail = document.createElement('p');
            modal_detail.textContent = details[j];
            modal_body.appendChild(modal_detail);
        };

        var modal_footer=document.createElement("div");
            modal_footer.className="modal-footer";
            modal_footer.innerHTML='<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';

        myModal.appendChild(modal_dialog);
        modal_dialog.appendChild(modal_content);
        modal_content.appendChild(modal_container);
        modal_container.appendChild(modal_row);
        modal_container.appendChild(modal_body);
        modal_container.appendChild(modal_footer);

        document.getElementById('details').appendChild(myModal);

    };

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

            card_img.src = "img/" + jsonObj[i].date + "-thumbnail.jpg";

            //definition of modal
            var att1 = document.createAttribute("data-toggle");
            att1.value = "modal";
            card_img.setAttributeNode(att1);

            var att2 = document.createAttribute("data-target");
            var tagRef=jsonObj[i].date;
                tagRef=tagRef.substring(0, tagRef.length-5)+tagRef.substring(tagRef.length-4,tagRef.length);
            att2.value ='#'+tagRef;
            card_img.setAttributeNode(att2);

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

            createModal(jsonObj[i]);
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
  $('.modal').on('show.bs.modal', function(e) {
    $('.navbar').addClass('d-none');
    console.log("add");
  })
  $('.modal').on('hidden.bs.modal', function(e) {
    $('.navbar').removeClass('d-none');
    console.log("remove");
  })

})(jQuery); // End of use strict
