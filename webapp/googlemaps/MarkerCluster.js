/**
 * openui5-googlemaps - OpenUI5 Google Maps library
 * @version v1.0.4
 * @link http://jasper07.github.io/openui5-googlemaps/
 * @license MIT
 */
sap.ui.define(
  [
    "jquery.sap.global",
    "sap/ui/core/Control",
    "google.maps",
    "openui5/googlemaps/MapUtils",
    "./markerclusterer",
  ],
  function (e, t, r, s, i) {
    "use strict";
    i = window.MarkerClusterer;
    var o = t.extend("openui5.googlemaps.MarkerCluster", {
      metadata: {
        properties: {
          averageCenter: {
            type: "boolean",
            bindable: "bindable",
            defaultValue: !0,
          },
        },
        defaultAggregation: "markers",
        aggregations: {
          markers: {
            type: "openui5.googlemaps.Marker",
            multiple: !0,
            bindable: "bindable",
          },
        },
        events: { clusteringend: {}, click: {}, mouseover: {}, mouseout: {} },
        renderer: {},
      },
    });
    return (
      (o.prototype.init = function () {
        this.aListeners = [];
      }),
      (o.prototype._mapRendered = function (e) {
        (this.map = e), this.setClusterer();
      }),
      (o.prototype.onClusterClick = function (e) {
        this.fireClick({ cluster: e });
      }),
      (o.prototype.onClusterMouseover = function (e) {
        this.fireMouseover({ cluster: e });
      }),
      (o.prototype.onClusterMouseout = function (e) {
        this.fireMouseout({ cluster: e });
      }),
      (o.prototype.onClusteringEnd = function () {
        this.fireClusteringend({
          clusters: this.markerClusterer.getClusters(),
        });
      }),
      (o.prototype._getMarkers = function () {
        var e = this,
          t = [];
        return (
          this.getMarkers().forEach(function (r) {
            r.setMarker(), r.setMap(e.map), t.push(r.marker);
          }),
          t
        );
      }),
      (o.prototype.getOptions = function () {
        var t = e.sap.getModulePath("openui5.googlemaps.themes.base"),
          r = t + "/img",
          s = {
            styles: [
              { height: 53, url: r + "/m1.png", width: 53 },
              { height: 56, url: r + "/m2.png", width: 56 },
              { height: 66, url: r + "/m3.png", width: 66 },
              { height: 78, url: r + "/m4.png", width: 78 },
              { height: 90, url: r + "/m5.png", width: 90 },
            ],
          };
        return (s.averageCenter = this.getAverageCenter()), s;
      }),
      (o.prototype.setClusterer = function () {
        (this.markerClusterer = new i(
          this.map,
          this._getMarkers(),
          this.getOptions()
        )),
          this.addListener("clusteringend", this.onClusteringEnd.bind(this)),
          this.addListener("click", this.onClusterClick.bind(this)),
          this.addListener("mouseover", this.onClusterMouseover.bind(this)),
          this.addListener("mouseout", this.onClusterMouseout.bind(this));
      }),
      (o.prototype.addListener = function (e, t) {
        this.aListeners.push(s.addListener(this.markerClusterer, e, t));
      }),
      (o.prototype.removeListeners = function () {
        this.aListeners.forEach(function (e) {
          e.remove();
        }),
          (this.aListeners = []);
      }),
      (o.prototype.reset = function () {
        this.markerClusterer &&
          (this.removeListeners(), (this.markerClusterer = void 0));
      }),
      (o.prototype.exit = function () {
        this.reset();
      }),
      o
    );
  },
  !0
);
