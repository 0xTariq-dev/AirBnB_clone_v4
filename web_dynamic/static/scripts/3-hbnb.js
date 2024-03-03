import $ from 'jquery';

$(function () {
  $('input[type=checkbox]').change(function () {
    const amenities = {};
    $('input[type=checkbox]:checked').each(function () {
      amenities[$(this).data('id')] = $(this).data('name');
    });
    if (Object.values(amenities).length > 0) {
      $('.amenities h4').text(Object.values(amenities).join(', '));
    } else {
      $('.amenities h4').text('\u00A0');
    }
  });
  function checkApiStatus () {
    $.get('http://127.0.0.1:5001/api/v1/stats').done(function () {
      $('div#api_status').addClass('available');
    }).fail(function () {
      $('div#api_status').removeClass('available');
    });
  }

  checkApiStatus();

  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({})
  })
    .done(function (data) {
      data.forEach(place => {
        const guest_s = (place.max_guest !== 1) ? 'Gests' : 'Guest';
        const bedroom_s = (place.number_rooms !== 1) ? 'Bedrooms' : 'Bedroom';
        const bathroom_s = (place.number_bathrooms !== 1) ? 'Bathrooms' : 'Bathroom';

        const placeArticle = `
            <article>
	            <div class="title_box">
	                <h2>${place.name}</h2>
	                <div class="price_by_night">${place.price_by_night}</div>
	            </div>
	            <div class="information">
	                <div class="max_guest">${place.max_guest} ${guest_s}</div>
                    <div class="number_rooms">${place.number_rooms} ${bedroom_s}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} ${bathroom_s}</div>
	            </div>
                <div class="description">
	                ${place.description ? place.description : ''}
                </div>
	        </article>`;

        $('section.places').append(placeArticle);
      });
    });

  setInterval(checkApiStatus, 20000);
});
