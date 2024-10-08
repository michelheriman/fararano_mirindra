//initialize the map 

function init(){
    //const antananarivo = {longitude : 47.519,
    //                    latitude : 18.862}; 47.483553,-19.007601
    let zoom = 15;
  
    const map = L.map("map").setView([-19.007601, 47.483553], zoom);
    
    let tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    
    tile.addTo(map);
    return map;
  }

let map_ = init();

//
// Initialize the map and set its view and zoom level
//const map = L.map('map').setView([34.0522, -118.2437], 10);  // Example coordinates (Los Angeles)

// Define different tile layers (basemaps)
const streetsLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
});

const satelliteLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenTopoMap contributors'
});

const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenTopoMap contributors'
});

// Add the default basemap (streets)
streetsLayer.addTo(map_);

// Function to change the basemap
function changeBasemap(newLayer) {
  map_.eachLayer(function (layer) {
    map_.removeLayer(layer);  // Remove the current basemap
  });
  newLayer.addTo(map_);  // Add the new basemap
}


// Initialize Supabase client
//console.log(window.supabase);

if (window.supabase) {
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
            //console.log('Data:', data);
            // here lies some propreties issue
            /*
            const geojson = {
            type: "FeatureCollection",
            features: data.map(row => {
                // Create the properties object dynamically, excluding the geometry column
                const properties = { ...row }; // Copy the entire row object
                delete properties.geojson;     // Remove the geojson field
                delete properties.geometry;    // Remove geometry field if it exists

                return {
                type: "Feature",
                properties: properties,       // All non-geometry columns go into properties
                geometry: JSON.parse(row.geojson) // Parse the geometry from string to JSON
                };
            */
            let prop = data.map(row => {
                let p = {...row};
                delete p.geojson;
                delete p.geometry ;
            })
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

            var myStyle = {
                "color": "#ff7800",
                "weight": 1,
                "opacity": 0.65
            };

            function loader() {
                L.geoJSON(geojson,  {
                    style: myStyle
                }).addTo(map_)
            };

            loader();
            //console.log(geojson)
            //now you need to map the data and create the 
            
        }
        }

    // Fetch data on page load
    //console.log(fetchData());
    fetchData();

}
else {
    console.error('Supabase is not defined');
  };

// Event listeners for each button
document.getElementById('basemap-select').addEventListener('change', function(event) {
  const selectedBasemap = event.target.value;
  if (selectedBasemap === 'streets') {
    changeBasemap(streetsLayer);
  } else if (selectedBasemap === 'satellite') {
    changeBasemap(satelliteLayer);
  } else if (selectedBasemap === 'topo') {
    changeBasemap(topoLayer);
  }
});
//
/*
// script.js

// Check if Supabase is loaded correctly before initializing
if (window.supabase) {
  // Initialize Supabase client
  const supabaseUrl = 'https://your-supabase-url.supabase.co';
  const supabaseKey = 'your-anon-key';
  const supabase = supabase.createClient(supabaseUrl, supabaseKey);

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from('your_table_name')  // Replace with your actual table name
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Data:', data);
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);
    }
  }

  // Fetch data on page load (or you can call this function from anywhere)
  fetchData();
} else {
  console.error('Supabase is not defined');
}
*/

