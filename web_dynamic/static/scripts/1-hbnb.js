$(function() {
    $('input[type=checkbox]').on('change', function() {
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

