$(document).ready(function(){

    function slickRenderGif(){
        return new Promise (function (resolve, reject) {
            $.ajax({
                type: "GET",
                url: "https://api.thecatapi.com/v1/images/search?size=small&mime_types=gif&limit=10",
                success: function (response) {

                    console.log(response);

                    $.each(response, function(index, item) {
                        var key = index + 1;
                        var cat_img = $('<img>');
        
                        cat_img.attr('src', item.url );
                        cat_img.attr('height', 500);
                        cat_img.attr('width', 460 );
                        
                        $(`#cat_gifs-${key}`).append(cat_img)
                    })
                    
                    $('.cats-gifs').slick({
                        dots: true,
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        centerMode: true,
                        autoplay: true,
                        autoplaySpeed: 2000,
                    });

                    resolve()
                },
                error: function(){
                    reject();
                }
            });   
        })
    }

    slickRenderGif().then( () => {
        console.log('ok')
    }).catch(()=> {
        console.log('erro na request')
    });

});


