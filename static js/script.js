// Function to execute when the button to execute the Python script is clicked
function executePythonScript() {
    // Send a GET request to the Flask endpoint
    fetch('/executePythonScript')
        .then(response => {
            // Check if response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Check if data is an array and not empty
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Invalid or empty data');
            }

            // Update the HTML content with the data received from the server
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = ''; // Clear previous content
            data.forEach(item => {
                outputDiv.innerHTML += `<p>${item.masjid_name}, ${item.url}, ${item.kilometers_away}</p>`;
            });

            // Initialize the map with the location (if needed)
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// fix button click listener 
// Add an event listener to the "Get Started" button to execute the Python script
document.querySelector('.getstartedbtn').addEventListener('click', executePythonScript);

document.querySelector('.donationbtn').addEventListener('click', function(){
    // Redirect the user to the 'findmymosque.html' page
    window.location.href = 'findmymosque.html';
});
