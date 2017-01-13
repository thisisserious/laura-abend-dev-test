// AJAX script
var index = 0;
var clicks = 0;
var jsonURL = 'wp-content/plugins/employees/data/Employees.json';

// doc ready, initial 4 imgs on page load
(function($) {
  if(clicks === 0) {
    getImages(jsonURL);
  }

  // click event handler
  $('.get-more-employees').on('click', function(event) {
    event.preventDefault();
    clicks++;
    $('.ajax-loader').show();
    getImages(jsonURL);
  });

  // AJAX call to get the JSON data
  function getImages(jsonURL) {
    $.ajax({
      dataType: 'json',
      url: jsonURL,
      success: function(data) {
        showImages(data);
      }
    }).done(function(response) {
    }).fail(function(error) {
      console.log('Error', error);
    }).always(function() {
    });
  }

  // loop thru data to determine how many imgs should be showing
  function showImages(data) {
    // console.log('data length:', data.length);
    var numberOfEmployees = data.length;
    $.each(data, function() {
      if(clicks == 0 && index <= 3) {
        // show index 0-3
        prependDOM();
        index++;
        // numberOfEmployees -= 4;
      } else if(clicks > 0 && index <= 7) {
        // console.log('elseif 1');
        // index += 4
        // show index 0-7
        // numberOfEmployees -= 4
        prependDOM();
        index++;
        // numberOfEmployees -= 4;
      } else if(clicks > 1 && index <= 11) {
        // console.log('elseif 2');
        prependDOM();
        index++;
        // numberOfEmployees -= 4;
        // show all data
        // hide button
      } else if(clicks > 2 && index <= numberOfEmployees) {
        // console.log('elseif 3');
        prependDOM();
        index++;
        $('a.get-more-employees').remove();
        // numberOfEmployees -= 4;
      }
    });

    // create & prepend employee Profile to the DOM
    function prependDOM() {
      var fullName = data[index].name.first + ' ' + data[index].name.last;
      var position = data[index].position;
      var image = data[index].image;
      var employeeProfile = '<ul id="gallery"><li><a class="img-cell" href="#">' +
      '<img class="gallery-img" src="wp-content/plugins/employees/data/employee_images/' +
      image + '" alt="employee images" /><span class="img-overlay"></span><span class="img-text">'
      + fullName + ' ' + position + '</span>' +
      '</a></li>';
      $('.ajax-loader').remove();
      $('#get-more').before(employeeProfile);
    }
  }
})(jQuery);
