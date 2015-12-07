// Set Custom Icons
var ICON = new google.maps.MarkerImage('grow.png', null, null,
    new google.maps.Point(14, 13));

var SHADOW = new google.maps.MarkerImage('dealer-shadow.png', null, null,
    new google.maps.Point(14, 13));
google.maps.event.addDomListener(window, 'load', function() {

  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(40, -100),
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var panelDiv = document.getElementById('panel');

  var data = new DealerDataSource;

  var view = new storeLocator.View(map, data, {
    geolocation: true,
    //features: data.getFeatures()
  });
  view.createMarker = function(store) {
    var markerOptions = {
      position: store.getLocation(),
      icon: ICON,
      shadow: SHADOW,
      title: store.getDetails().title
    };
    return new google.maps.Marker(markerOptions);
  }

  new storeLocator.Panel(panelDiv, {
    view: view
  });
});
