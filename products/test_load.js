require([
    "esri/Map",            // Map constructor
    "esri/views/MapView"    // MapView constructor to render the map
  ], function(Map, MapView) {

    // Create a new Map instance with a basemap
    const map = new Map({
      basemap: "streets-navigation-vector"  // You can change this to "topo", "satellite", etc.
    });

    // Create a MapView instance and link it to the #viewDiv element
    const view = new MapView({
      container: "viewDiv",  // Reference to the DOM element that will hold the map
      map: map,              // Reference to the Map object
      center: [39.1645477, -4.6284542], // Longitude, Latitude (for California in this example)
      zoom: 13               // Initial zoom level
    });

  });