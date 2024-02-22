function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 43.6532, lng: -79.3832} // Default center
    });

    // Add markers for each location
    {% for location in location_data %}
        new google.maps.Marker({
            position: {lat: {{ location.location.lat }}, lng: {{ location.location.lng }}},
            map: map,
            title: '{{ location.masjid_name }}'
        });
    {% endfor %}
}