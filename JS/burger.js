$(document).ready(function() {
	$('.menu-burger__header').click(function(){
        $('.menu-burger__header').toggleClass('open-menu');
        $('.header__nav2').toggleClass('open-menu');
        $('.header__login').toggleClass('open-menu');
        $('body').toggleClass('fixed-page');
	});

        $('.header__nav2').click(function(){
        $('.header__nav2').toggleClass('open-menu');
        });
});