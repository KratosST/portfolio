
let map, heatmapData, heatmapDataByTime, heatmap, hour;

function initMap() {
    var dataTime = d3.range(0, 155).map(function(d) {
        return new Date(2009 + d/12, d%12, 1);
    });

    var time = new Date(2018, 11, 1);
    // console.log(time);
    // console.log(time.getYear());

    // slider bottom
    var sliderTime = d3
        .sliderBottom()
        .min(new Date(2009, 0, 1))
        .max(new Date(2021, 11, 1))
        .step(1000 * 60 * 60 * 24)
        .width(800)
        .ticks(12)
        .tickFormat(d3.timeFormat('%y-%m-%d'))
        .tickValues(dataTime)
        .default(new Date(2018, 11, 1))
        .on('onchange', show);

    function show(){
        d3.selectAll(".legend")
            .remove();
        time = sliderTime.value();
        // console.log(time.toISOString().slice(0, 10));
        heatmap.setData(heatmapData[time.toISOString().slice(0, 10)]);
        heatmap.setOptions({radius: 0.1});
        // heatmap.setMap();
    }

    var gTime = d3
        .select('div#slider-year')
        .append('svg')
        .attr('width', 1000)
        .attr('height', 80)
        .append('g')
        .attr('transform', 'translate(40,20)');

    gTime.call(sliderTime);

    var hourSelect = ["Select the hour period:"];
    for (let hr = 0; hr < 24; hr++) {
        let hr1 = hr.toString().padStart(2, "0") + ":";
        let hr2 = (hr+1).toString().padStart(2, "0") + ":";
        hourSelect.push(hr1 + "00 - " + hr1 + "30");
        hourSelect.push(hr1 + "30 - " + hr2 + "00");
    }

    d3.select("#hourSelect")
        .selectAll('option')
        .data(hourSelect)
        .enter()
        .append("option")
        .attr("value", function (d) { return d; }) // corresponding value returned by the button
        .text(function (d) { return d; }) // text showed in the menu

    d3.select("#hourSelect").on("change", function(d){
        hour = this.value;
        if (hour.length == 13) {
            console.log(heatmapDataByTime[time.toISOString().slice(0, 10)].length);
            var minute1 = parseInt(hour.slice(3,5));
            var minute2 = parseInt(hour.slice(11,13));
            if (minute2 == 0) minute2 = 59;
            var heatmapByHour = [];
            for (i=0; i<heatmapDataByTime[time.toISOString().slice(0, 10)].length; i++) {
                if (heatmapDataByTime[time.toISOString().slice(0, 10)][i].getHours() == parseInt(hour.slice(0,2))) {
                    var minute = heatmapDataByTime[time.toISOString().slice(0, 10)][i].getMinutes();
                    if (minute >= minute1 && minute <= minute2) {
                        heatmapByHour.push(heatmapData[time.toISOString().slice(0, 10)][i]);
                    }
                }
            }
            heatmap.setData(heatmapByHour);
            heatmap.setOptions({radius: 10});
            console.log(heatmapByHour.length);
        }
    })

    const gatech = { lat: 33.7756, lng: -84.3963 };

    // Initialize and add the map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: gatech,
        mapTypeId: "terrain",
    });
    const marker = new google.maps.Marker({
        position: gatech,
        map: map,
    });

    map.data.loadGeoJson(
        "./json/City_of_Atlanta_Neighborhood_Statistical_Areas.json"
    );

    // const PolygonLookup = require('polygon-lookup')

    map.data.setStyle(function(feature) {
        // var lookup = new PolygonLookup(featureCollection);
        // var poly = lookup.search(33.7756, -84.3963);
        // console.log(poly);
        // console.log(d3.geoContains(feature, { lat: 33.7756, lng: -84.3963 }));
        // var ascii = feature.getProperty('ascii');
        // var color = ascii > 91 ? 'red' : 'blue';
        return {
            fillColor: 'none',
            strokeColor: 'grey',
            strokeWeight: 1
        };
    });

    map.data.addListener('mouseover', function(event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {strokeWeight: 3});
    });

    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
    });

    // var results = Papa.parse(file);
    // var results = Papa.parse("refined_data.csv");

    const heatmapData = {};
    const heatmapDataByTime = {};
    // const dataByRegion = {};

    Promise.all([
        d3.csv("./refined_data.csv")
    ]).then (function(array) {
        results = array[0];
        results.forEach(function(d){
            var date = (new Date(d["timestamp"] * 1000)).toISOString().slice(0, 10);
            const latLng = new google.maps.LatLng(d["lat"], d["long"]);

            // TODO: draw color by region
            if ((date in heatmapData) == false) {
                heatmapData[date] = [{location: latLng, weight: 0.1}];
                heatmapDataByTime[date] = [new Date(d["timestamp"] * 1000)];
            } else {
                heatmapData[date].push({location: latLng, weight: 0.1});
                heatmapDataByTime[date].push(new Date(d["timestamp"] * 1000));
            }

        });

        heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData[time.toISOString().slice(0, 10)],
            dissipating: false,
            map: map,
            radius: 0.1,
        });
    });


    // Create a <script> tag and set the USGS URL as the source.
    // const script = document.createElement("script");
    // script.src =
    //     "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
    // document.getElementsByTagName("head")[0].appendChild(script);

}

function eqfeed_callback(results) {
    const heatmapData = [];

    for (let i = 0; i < results.features.length; i++) {
        const coords = results.features[i].geometry.coordinates;
        const latLng = new google.maps.LatLng(coords[1], coords[0]);

        heatmapData.push(latLng);
    }

    const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        dissipating: false,
        map: map,
    });
}