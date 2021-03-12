import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import {
  Map,
  MapContainer,
  TileLayer,
  useMap,
  ImageOverlay,
  SVGOverlay,
  Circle,
  GeoJSON,
  Rectangle
} from "react-leaflet";
import "./style.css";
import { TileLayer, Marker, Popup } from "react-leaflet";
// import {iconTree} from iconMarker
import L from "leaflet";

var MapTest = function() {
  var imageUrl =
      "https://cdn.pixabay.com/photo/2014/12/22/00/07/tree-576847_960_720.png",
    imageBounds = [[51.505, -0.09], [51.49, -0.075]];

  const map = useMap();
  console.log("map center:", map.getCenter());
  useEffect(() => {
    const bounds = [[-26.5, -25], [1021.5, 1023]];
    L.imageOverlay(imageUrl, imageBounds).addTo(map);
    L.imageOverlay(imageUrl, imageBounds).bringToFront();

    // this is what you were looking for
    // map.fitBounds(image.getBounds());
  }, []);
  return null;
};
var treeData = [
  { name: "Teak", lat: 51.505, lon: -0.09 },
  { name: "Sal", lat: 51.405, lon: -0.09 },
  { name: "SandalWood", lat: 51.605, lon: -0.09 }
];

function diagnalCorners(center_x, center_y) {
  var height = 0.0015 / 2;
  var width = 0.0013875 / 2;
  var angle = 0;
  var Top_Lx =
    center_x +
    (width / 2) * Math.cos(angle) -
    (height / 2) * Math.sin(angle) +
    0.0013875 / 4;
  var Top_Ly =
    center_y + (width / 2) * Math.sin(angle) + (height / 2) * Math.cos(angle);

  var Bot_Rx =
    center_x -
    (width / 2) * Math.cos(angle) +
    (height / 2) * Math.sin(angle) +
    0.0013875 / 4;
  var Bot_Ry =
    center_y - (width / 2) * Math.sin(angle) - (height / 2) * Math.cos(angle);
  console.log([[Top_Lx, Top_Ly], [Bot_Rx, Bot_Ry]]);
  return [[Top_Lx, Top_Ly], [Bot_Rx, Bot_Ry]];
  // Top_Lx = center.x + ((width / 2) * cos(angle)) - ((height / 2) * sin(angle))Top_Ly = center.y + ((width / 2) * sin(angle)) + ((height / 2) * cos(angle))

  // Bot_Rx = center.x - ((width / 2) * cos(angle)) + ((height / 2) * sin(angle))Bot_Ry = center.y - ((width / 2) * sin(angle)) - ((height / 2) * cos(angle))
}

var App = function() {
  const greenOptions = { color: "green", fillColor: "green" };

  // const bounds = [[51.49, -0.08], [51.5, -0.06]];
  var greenIcon = L.icon({
    iconUrl:
      "https://webstockreview.net/images/triangular-clipart-dark-green-1.png",
    // "https://cdn.pixabay.com/photo/2014/12/22/00/07/tree-576847_960_720.png",

    iconSize: [15, 15], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [15 / 2, 15] // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  // var LeafIcon = L.Icon.extend({
  //     options: {
  //         shadowUrl: '../img/tree-576847.svg',
  //         iconSize:     [38, 95],
  //         shadowSize:   [50, 64],
  //         iconAnchor:   [22, 94],
  //         shadowAnchor: [4, 62],
  //         popupAnchor:  [-3, -76]
  //     }
  // });
  // console.log("map center:", map.getCenter());
  // useEffect(() => {
  //   const map = mapRef.current.leafletElement;
  //   const bounds = [[-26.5, -25], [1021.5, 1023]];
  //   const image = L.imageOverlay("https://i.imgur.com/Ion6X7C.jpg", bounds).addTo(
  //     map
  //   );
  //   // this is what you were looking for
  //   map.fitBounds(image.getBounds());
  // }, []);
  // Creating a map object
  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    layer.bindPopup(feature.properties.popupContent);
  }
  var pOptions = { opacity: 1, interactive: true };
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <div classnname="mymap">
        <MapContainer center={[51.505, -0.09]} zoom={18} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ImageOverlay
            bounds={diagnalCorners(51.505, -0.09)}
            interactive={true}
            url={
              "https://cdn.pixabay.com/photo/2014/12/22/00/07/tree-576847_960_720.png"
            }
          >
            <Popup>Popup in CircleMarker</Popup>
          </ImageOverlay>

          <Marker position={[51.505, -0.09]} icon={greenIcon} />

          <Circle
            center={[51.51, -0.08]}
            pathOptions={greenOptions}
            radius={100}
          />
        </MapContainer>
      </div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
};

export default App;
// {[[51.505, -0.09], [51.49, -0.075]]}
//  <Marker position={[51.505, -0.09]} icon={ greenIcon }>
//             <Popup>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//           </Marker>
//  <MapTest />
//             ref={this.imageOverlayRef}

// bounds={diagnalCorners(51.505, -0.09)}
// url={"https://cdn.pixabay.com/photo/2014/12/22/00/07/tree-576847_960_720.png"}
// <Marker position={[51.505, -0.09]} icon={ greenIcon }>
//              <Popup>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//           </Marker>

//         <GeoJSON data= {treeData} style={onEachFeature: onEachFeature}/>
// <Rectangle classname="tree" style={{opacity: 0}} bounds = {diagnalCorners(51.505, -0.09)}>
//           <Popup>Popup in CircleMarker</Popup>
//           </Rectangle>
