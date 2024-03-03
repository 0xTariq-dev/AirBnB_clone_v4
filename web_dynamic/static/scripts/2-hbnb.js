$(function() {
    $('input[type=checkbox]').change(function() {
        const amenities = {};
        $('input[type=checkbox]:checked').each(function() {
            amenities[$(this).data('id')] = $(this).data('name');
        });
        if (Object.values(amenities).length > 0) {
            $( ".amenities h4" ).text(Object.values(amenities).join(', '));
        } else {
            $( ".amenities h4" ).text('\u00A0');
        }
    });    
});
$.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/',
    type: 'GET',
    success: function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
            $('#api_status').removeClass('not-available');
        } else {
            $('#api_status').addClass('not-available');
            $('#api_status').removeClass('available');
        }
    },
})
