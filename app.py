import requests
import googlemaps
from flask import Flask, render_template, jsonify


API_KEY = 'AIzaSyA0np_qdbzooZ2asbRlO9MrQS_E4fPzknI'
gmaps = googlemaps.Client(key=API_KEY)
location = '43.6335025,-79.5240738'  # Latitude and longitude of 180 Norseman

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('app.html')

@app.route('/executePythonScript')
def execute_python_script():
    lst = []
    radius = 6000 #meters
    place_type = 'mosque'

    places_result = gmaps.places_nearby(location=location, radius=radius, type=place_type)
    for place in places_result['results']:
        final = {}
        final["masjid_name"] = place['name']
        final["location"] = place['geometry']['location']

        place_details = gmaps.place(place["place_id"])
        if 'website' in place_details['result']:
            final["url"] = place_details['result']['website']
        else:
            final["url"] = ""

        distance_matrix = gmaps.distance_matrix(location, final["location"])

        distance_in_meters = distance_matrix['rows'][0]['elements'][0]['distance']['value']

        distance_in_kilometers = distance_in_meters / 1000

        final["kilometers_away"] = distance_in_kilometers
        lst.append(final)
        lst = sorted(lst, key=lambda x: x['kilometers_away'])
    return lst

if __name__ == '__main__':
    app.run(debug=True)