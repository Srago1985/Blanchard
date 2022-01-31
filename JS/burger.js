$(document).ready(function() {
	$('.menu-burger').click(function(){
        $('.menu-burger').toggleClass('open-menu');
        $('.header__nav2').toggleClass('open-menu');
        $('.header__login').toggleClass('open-menu');        
	});

        $('.header__nav2').click(function(){
                $('.menu-burger').toggleClass('open-menu');
                $('.header__nav2').toggleClass('open-menu');
                $('.header__login').toggleClass('open-menu');               
        });
});