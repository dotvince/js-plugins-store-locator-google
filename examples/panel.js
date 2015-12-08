  "use strict";
//Map Settings

//Gelocation. Set to true or false. Defaults to true.
this.geolocation = true;

// Places Search Lable
this.locationSearchLabel = '';

//Enable Location Search 
this.locationSearch = true;

// Enable Features Filter
this.featureFilter = true;

//Enable Directions
this.directions = true;

// Div Id of the Panel
this.panelDiv = 'panel';

//Div ID of Google Maps
this.mapDiv = 'map-canvas';

//Set Cluster threshhold
this.gridSize = 25;

//Set Cluster Max Zoom
this.maxZoom = 20;

//HTML appended to the search results if no results in the current view. 
this.noResultsViewHtml ='<li class="no-stores alert alert-warning"><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"> </span> There are no stores in this area. However, we have listed the stores closest to you below.</li><hr>',
// HTML if there are no results. (Dynamic) 
this.noResultsHtml = '<li class="no-stores warning">There are no stores in this area.</li><hr>',

//Info Window labels for directions, zoom and view
this.streetViewLabel = ' <span class="glyphicon glyphicon-sunglasses" aria-hidden="true"> </span> Street View',
this.zoomLabel = ' <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"> </span> Zoom Here ',
this.directionsLabel = '<span class="glyphicon glyphicon-map-marker" aria-hidden="true"> </span> Directions ',

//Directions Search Form
this.directionsPanelHTML = '<div class="directions-panel"><form><input class="directions-to"/><input type="submit" value="Get Directions"/> <a href="#" class="close-directions"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"> </span> Close</a></form><div class="rendered-directions"></div></div>';

// Enable Draggable routes on the directions
//this.draggable = false;
// Set Custom Icons

google.maps.event.addDomListener(window, 'load', function() {
  

  var ICON = new google.maps.MarkerImage('logo.png', null, null, new google.maps.Point(14, 13));
  var SHADOW = new google.maps.MarkerImage('shadow.png', null, null, new google.maps.Point(14, 13));

    var map = new google.maps.Map(document.getElementById(this.mapDiv), {
        center: new google.maps.LatLng(40, -100),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var panelDiv = document.getElementById(this.panelDiv);
    var data = new DealerDataSource;
    var view = new storeLocator.View(map, data, {
        geolocation: geolocation,
        //features: data.getFeatures()
    });
    
    
    var mcOptions = {
      gridSize: 25, 
      maxZoom: 20
    };

    // Create new MarkerClusterer object
    var clusters = new MarkerClusterer(map, [], mcOptions);
    // Override so MarkerClusterer object can be populated with Markers
    view.createMarker = function(store) {
        // We make these markers invisible
        var markerOptions = {
                position: store.getLocation(),
                Opacity: 0,
                icon: ICON,
                shadow: SHADOW,
                title: store.getDetails().title,

                
            },
        
            // This is the first marker var for storeLocator
            marker = new google.maps.Marker(markerOptions),
            // This is the second marker var for MarkerClusterer. We'll make it visible
        markercluster = new google.maps.Marker(markerOptions);
        markercluster.setOpacity(1);
        markercluster.setClickable(false);
        clusters.addMarker(markercluster);
        
        return marker;
    };
    
    // Draw the panel. 
    new storeLocator.Panel(panelDiv, {
        //Use the options from the config area above. 
        view: view,
        locationSearch: locationSearch,
        locationSearchLabel: locationSearchLabel,
        featureFilter: featureFilter,
        directions: directions,
        noResultsViewHtml: noResultsViewHtml,
        noResultsHtml: noResultsHtml,
        zoomLabel : zoomLabel,
        streetViewLabel : streetViewLabel,
        directionsLabel : directionsLabel,
        directionsPanelHTML : directionsPanelHTML,
      
    });
});