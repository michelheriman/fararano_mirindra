require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Popup",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleFillSymbol",
    "esri/widgets/BasemapGallery",
      "esri/widgets/Expand"
  ], function(Map, MapView, GeoJSONLayer, Popup, SimpleRenderer, SimpleFillSymbol, BasemapGallery, Expand) 
  {

    // Crée la carte avec le fond topographique
    
    const map = new Map({
      basemap: "topo-vector"
    });

    // Crée la vue de la carte
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [47.483553, -19.007601], // Coordonnées initiales -19.007601, 47.483553
      zoom: 15
    });
    

    // URL du fichier GeoJSON
    //var geojsonUrl = "./input_dataset/data_la.geojson";
    //var geojsonUrl = "./Mavuno_smart/virtual_farm/data_.geojson";
    //fetch data first 
    if(window.supabase) {
        const supabaseUrl = 'https://rakfrxwkidutruudbfyk.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2ZyeHdraWR1dHJ1dWRiZnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzM3MTQsImV4cCI6MjA0MTgwOTcxNH0.NeCSvgwdglKXkbJqsMSbwS8qXDLFm6MB12JQSgo-1Ws';
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        async function fetchData() {

            const { data, error } = await supabase
            .from('for_demo_fararano_v') // Replace with your actual table name
            .select('*'); // Modify this query based on your needs
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                let prop = data.map(row => {
                    let p = {...row};
                    delete p.geojson;
                    delete p.geometry ;
                });

                let geojson = {
                    type: "FeatureCollection",
                    features: data.map(row => ({
                    type: "Feature",
                    properties: prop
                    /*
                    {
                        id: row.id,
                        name: row.name,
                    } */,
                    geometry: JSON.parse(row.geojson)  // Parse the geometry from string to JSON
                    }))
                                };
                let renderer = new SimpleRenderer({
                    symbol: new SimpleFillSymbol({
                        color: [0, 255, 0, 0.5], // Green with 50% opacity
                        outline: {
                        color: [0, 0, 0, 1], // Black outline
                        width: 1
                        }
                    })
                    });
                var geojsonLayer = new GeoJSONLayer({
                    url: geojson,
                    renderer: renderer,
                    popupTemplate: {
                        title: "{Name}", // Assurez-vous que ce champ existe dans votre GeoJSON
                        //content: "{ID_number}",
                        //content: "{trees}",
                        content : [
                          {
                            type: "fields",
                            fieldInfos: [
                              {
                                fieldName: 'id_number',
                                label: "id_number"
                              }
                            ]
                          },
                          {
                            type: "fields",
                            fieldInfos: [
                              {
                                fieldName: "spec_1",
                                label: "Main crop"
                              }
                            ]
                          },
                          {
                            type: "fields",
                            fieldInfos: [
                              {
                                fieldName: "prod_1",
                                label: "forecast harvest Tonnes"
                              }
                            ]
                          }
                        ]// Affiche tous les attributs
                      }
                })
                
                // Ajoute la couche GeoJSON à la carte
                map.add(geojsonLayer);
                           
        }

    }
    //end of fetching

    fetchData();

    view.popup = new Popup({
        dockEnabled: true,
        dockOptions: {
          buttonEnabled: true,
          breakpoint: false
        }
      });
    
    // Change basemap function
    document.getElementById("basemapSelect").addEventListener("change", function(event) {
    var basemap = event.target.value;
    map.basemap = basemap;
  });

    // Crée la couche GeoJSON
    /*
    var geojsonLayer = new GeoJSONLayer({
      url: geojson,
      renderer: renderer, 
      popupTemplate: {
        title: "{Owner}", // Assurez-vous que ce champ existe dans votre GeoJSON
        //content: "{ID_number}",
        //content: "{trees}",
        content : [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: 'area_ha_',
                label: "area (in Hectare)"
              }
            ]
          },
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "carbon",
                label: "Carbon stock : TCo2eq"
              }
            ]
          },
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "result",
                label: "Biomass : Tonnes/Ha"
              }
            ]
          },
        {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "trees",
                label: "Trees whithin the plot"
              }
            ]
          },
        {
            type: "media",
            mediaInfos: [
              {
                title: "<b>The owner Pic</b>",
                type: "image",
                value: {
                  sourceURL: "{pic}" // Assurez-vous que ce champ existe dans votre GeoJSON
                }
              }
            ]
          }
        ]// Affiche tous les attributs
      }
    });

    // Ajoute la couche GeoJSON à la carte
    map.add(geojsonLayer);

    // Optionnel : Configurer les options du popup
    view.popup = new Popup({
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: true,
        breakpoint: false
      }
    });
    */
    
};

  });