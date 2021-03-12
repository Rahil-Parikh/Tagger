import L from "leaflet";

const iconTree = L.Icon.extend({
  options: {
    iconUrl: require("../img/tree-576847.svg"),
    iconRetinaUrl: require("../img/tree-576847.svg"),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: "leaflet-div-icon"
  }
});

export { iconTree };
