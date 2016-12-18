$(document).ready(function () {

  // Click-to-scroll for animated arrow
  $('#about-us').click(function () {
      $('html,body').animate({
          scrollTop: $(".meet-us--tiles").offset().top},
          'slow');
  });

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
    });
  }

  function generateCards(peopleArr) {
    return peopleArr.reduce(function(domString, person, i) {
      domString += "<div class='col-sm-6 col-md-4 col-lg-3 person-tile'>" +
                   "<div class='image-container'>" +
                      "<img class='person-image' src='" + person.professionalPic +
                        "' alt='" + person.name + "''>" +
                      "<div class='person-bio'><span>" + person.aboutMe + "</span></div>" +
                   "</div>" +
                   "<h3>" + person.name.split(" ")[0] + " " + person.name.split(" ")[1] + " " + person.name.split(" ")[2] + "</h3>" +
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
