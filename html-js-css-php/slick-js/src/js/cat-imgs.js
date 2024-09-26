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
        
        $('.cats-imgs').slick({
            dots: true,            
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            centerMode: true,
            infinite: true,
        });

        // $('.cats').on('swipe', function(event, slick, direction){
        //     console.log('Swipe direction: ' + direction);
        // });
        
        // $('.cats').on('click', '.slick-prev', function() {
        //     console.log('Arrow previous clicked!');
        // });
        
        // $('.cats').on('click', '.slick-next', function() {
        //     console.log('Arrow next clicked!');
        // });
    }
});