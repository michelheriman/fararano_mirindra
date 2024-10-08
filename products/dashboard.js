//
const supabaseUrl = 'https://rakfrxwkidutruudbfyk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2ZyeHdraWR1dHJ1dWRiZnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzM3MTQsImV4cCI6MjA0MTgwOTcxNH0.NeCSvgwdglKXkbJqsMSbwS8qXDLFm6MB12JQSgo-1Ws';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
//

async function fetch_supabase(table_name, columns) {
    const { data, error } = await supabase
            .from(table_name) // Replace with your actual table name
            .select(columns); // Modify this query based on your needs
    if (error) {
        console.error('Error fetching data:', error);
    } else {
        return data;
        
    }
}

let main_speculation = fetch_supabase('for_demo_fararano_v', 'first_speculation, first_production_tons').then(data => {console.log(data)});
console.log(main_speculation);


/*

async function fetchDataAndPopulateSelect() {
    try {
      // Fetching data (replace with your actual API or JSON file URL)

      const supabaseUrl = 'https://rakfrxwkidutruudbfyk.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2ZyeHdraWR1dHJ1dWRiZnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzM3MTQsImV4cCI6MjA0MTgwOTcxNH0.NeCSvgwdglKXkbJqsMSbwS8qXDLFm6MB12JQSgo-1Ws';
      const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
      //const response = await fetch('https://api.example.com/data');
      //const data = await response.json();



      // Extract unique categories from the fetched data
      const uniqueCategories = [...new Set(data.map(item => item.category))];

      // Get the select element
      const select = document.getElementById('category-select');

      // Populate the select with unique categories
      uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
      });

    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }

  // Call the function to fetch data and populate the select dropdown
  fetchDataAndPopulateSelect();
  */