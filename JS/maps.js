const mapApiKey = window.APP_CONFIG && window.APP_CONFIG.yandexMapsApiKey;
const placemarkIconUrl = new URL('../IMG/placemark.png', import.meta.url).href;

if (!mapApiKey || mapApiKey === 'YOUR_KEY_HERE') {
  console.warn('Yandex Maps API key is not configured.');
} else {
  const s = document.createElement("script");
  s.src = `https://api-maps.yandex.ru/2.1/?apikey=${mapApiKey}&lang=ru_RU`;
  s.onload = function() {
    ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map("map", {
        center: [55.758397, 37.601617],
        zoom: 14
      });
      var myPlacemark = new ymaps.Placemark([55.758397, 37.601617], {}, {
        iconLayout: 'default#image',
        iconImageHref: placemarkIconUrl,
        iconImageSize: [20, 20],
        iconImageOffset: []
      });
      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable(['scrollZoom']);
    }
  };
  document.head.appendChild(s);
}