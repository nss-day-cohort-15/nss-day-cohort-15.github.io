$(document).ready(function () {

  // Click-to-scroll for animated arrow
  $('#about-us').click(function () {
      $('html,body').animate({
          scrollTop: $(".meet-us--tiles").offset().top},
          'slow');
  });

function checkWhitespace(name) {
  var counter = 0;
  var name = name.split('');
  name.forEach(function(char){
    if (char === " ") {
    counter = counter + 1;
    }
  })
  return counter;
}
  // XHR to load class info from json file
  function getClassFromJson() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "classinfo.json",
      }).done(function(response) {
        resolve(response);
      }).fail(function(error) {
        reject(error);
      })
    });
  }

  // Load the class info, load the DOM with cards
  function loadPage() {
    getClassFromJson()
    .then(function (response) {
      var propertyName = Object.keys(response)[0];
      var infoArr = response[propertyName];
      var cardString = generateCards(infoArr);

      attachCardsToDOM(cardString);
      // Auto-fix the bio div size
      shrinkPersonBioDiv();
      // Also resize them if the size of the browser changes
      window.addEventListener('resize', shrinkPersonBioDiv, true);
    });
  }

  function shrinkPersonBioDiv() {
    // This will literally wait until the first image is loaded.
    // Guys, this is crazy.
    // Javascript 😍
    var img = new Image();
    var firstImage = document.querySelector('.person-image');

    img.onload = function(){
      var allPersonBios = document.querySelectorAll('.person-bio');
      var firstImage = document.querySelector('.person-image');
      var imageWidth = firstImage.offsetWidth;
      var marginValue = firstImage.offsetLeft;
      allPersonBios.forEach(function (bio) {
        bio.style.width = imageWidth + 'px';
        bio.style.margin = '0 ' + marginValue + 'px';
      });
    }

    img.src = firstImage.src;
  }

  function generateCards(peopleArr) {
    return peopleArr.reduce(function(domString, person, i) {
      domString += "<div class='col-sm-6 col-md-4 col-lg-3 person-tile'>" +
                   "<div class='image-container'>" +
                      "<img class='person-image' src='" + person.professionalPic +
                        "' alt='" + person.name + "''>" +
                      "<div class='person-bio'><span>" + person.aboutMe + "</span></div>" +
                   "</div>" +
                   "<h3>";
      if (person.name.includes("(")) {
        domString += person.name.split(") ")[0] + ")<br/>" + person.name.split(") ")[1];
      } 

      else if (checkWhitespace(person.name) > 2) {
        domString += person.name.split(" ")[0] + " " + person.name.split(" ")[1] + "<br/>" + person.name.split(" ")[2] + " " + person.name.split(" ")[3];
      }

      else {
        domString += person.name.split(" ")[0] + "<br/>" + person.name.split(" ")[1];
      }
      domString += "</h3>" +
                   "<hr>" +
                   "<div class='tile--icons'>" +
                       "<a href='" + person.githubLink + "' target='_blank'>" +
                           "<img src='img/logo/Github.svg' alt='Github'/>" +
                       "</a>" +
                       "<a href='" + person.linkedInLink + "' target='_blank'>" +
                           "<img src='img/icon/linkedin.svg' alt='Linkedin'/>" +
                       "</a>" +
                       "<a href='" + person.portfolioLink + "' target='_blank'>" +
                           "<img src='img/icon/globe.svg' alt='Personal Website'/>" +
                       "</a>" +
                     "</div>" +
                   "</div>";

      return domString;
    }, '');
  }

  function attachCardsToDOM(cardString) {
    document.getElementById('meet-us--row').innerHTML = cardString;
  }

  loadPage();
});
