const s = document.createElement("script");
  s.src = `https://api-maps.yandex.ru/2.1/?apikey=${window.APP_CONFIG.yandexMapsApiKey}&lang=ru_RU`;
  s.onload = function() {
    ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map("map", {
        center: [55.758397, 37.601617],
        zoom: 14
      });
      var myPlacemark = new ymaps.Placemark([55.758397, 37.601617], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'IMG/placemark.png',
        iconImageSize: [20, 20],
        iconImageOffset: []
      });
      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable(['scrollZoom']);
    }
  };
  document.head.appendChild(s);