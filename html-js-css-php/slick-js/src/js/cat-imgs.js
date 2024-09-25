$.ajax({
    type: "GET",
    url: "https://api.thecatapi.com/v1/images/search?size=small&mime_types=png&limit=10",
    success: function (response) {
        $.each(response, function(index, item) {

            var key = index + 1;
            var cat_img = $('<img>');

            cat_img.attr('src', item.url );
            cat_img.attr('height', 500);
            cat_img.attr('width', 460);
            
            $(`#cat_imgs-${key}`).append(cat_img)
            
            
        })
    }
});
