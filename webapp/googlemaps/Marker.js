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
    "./Animation",
  ],
  function (t, e, i, n, o) {
    "use strict";
    var s = e.extend("openui5.googlemaps.Marker", {
      metadata: {
        properties: {
          lat: { type: "float", bindable: "bindable" },
          lng: { type: "float", bindable: "bindable" },
          draggable: {
            type: "boolean",
            bindable: "bindable",
            defaultValue: !1,
          },
          info: { type: "string", bindable: "bindable" },
          icon: { type: "any", bindable: "bindable" },
          visible: { type: "boolean", bindable: "bindable", defaultValue: !0 },
          animation: {
            type: "int",
            bindable: "bindable",
            defaultValue: o.DROP,
          },
          zIndex: { type: "int", defaultValue: 1 },
          optimized: {
            type: "boolean",
            bindable: "bindable",
            defaultValue: !1,
          },
        },
        events: {
          click: {},
          dragEnd: {},
          infoWindowClose: {},
          mouseover: {},
          mouseout: {},
        },
        renderer: {},
      },
    });
    return (
      (s.prototype.init = function () {
        (this._dragging = !1), (this.aListeners = []), (this.iwMaxWidth = 360);
      }),
      (s.prototype.updatePosition = function () {
        this.marker &&
          null !== this.getLat() &&
          null !== this.getLng() &&
          (t.sap.clearDelayedCall(this.delayedCallId),
          (this.delayedCallId = t.sap.delayedCall(0, this, function () {
            this.marker.setPosition(new i.LatLng(this.getLat(), this.getLng()));
          })));
      }),
      (s.prototype.setLat = function (t) {
        this.setProperty("lat", parseFloat(t), !0), this.updatePosition();
      }),
      (s.prototype.setLng = function (t) {
        this.setProperty("lng", parseFloat(t), !0), this.updatePosition();
      }),
      (s.prototype.setVisible = function (t) {
        this.setProperty("visible", t, !0),
          this.marker && this.marker.setVisible(this.getVisible());
      }),
      (s.prototype.setIcon = function (t) {
        this.setProperty("icon", t, !0),
          this.marker && this.marker.setIcon(this.getIcon());
      }),
      (s.prototype.getMap = function () {
        return this.map;
      }),
      (s.prototype.setMap = function (t) {
        this.map = t;
      }),
      (s.prototype.createMarker = function () {
        return new i.Marker(this.getOptions());
      }),
      (s.prototype.setMarker = function () {
        this.marker ||
          ((this.marker = this.createMarker()),
          this.addListener(this.marker, "click", this.onClick.bind(this)),
          this.addListener(
            this.marker,
            "mouseover",
            this.onMouseover.bind(this)
          ),
          this.addListener(
            this.marker,
            "mouseout",
            this.onMouseout.bind(this)
          )),
          this.getDraggable() &&
            this.addListener(this.marker, "dragend", this.onDragEnd.bind(this)),
          this.marker.setMap(this.map),
          this.marker.setOptions(this.getOptions()),
          "function" == typeof this.marker.setZIndex &&
            this.marker.setZIndex(this.getZIndex()),
          this.infoWindow ||
            ((this.infoWindow = new i.InfoWindow({
              maxWidth: this.iwMaxWidth,
            })),
            this.addListener(
              this.infoWindow,
              "closeclick",
              this.onInfoWindowClose.bind(this)
            )),
          this.infoWindow.setContent(this.getInfo());
      }),
      (s.prototype.getOptions = function () {
        var t = {};
        return (
          (t.position = new i.LatLng(this.getLat(), this.getLng())),
          (t.draggable = this.getDraggable()),
          (t.animation = this.getAnimation()),
          (t.visible = this.getVisible()),
          (t.icon = this.getIcon()),
          (t.optimized = this.getOptimized()),
          t
        );
      }),
      (s.prototype._mapRendered = function (t) {
        this.setMap(t), this.setMarker();
      }),
      (s.prototype.addListener = function (t, e, i) {
        this.aListeners.push(n.addListener(t, e, i));
      }),
      (s.prototype.removeListeners = function () {
        this.aListeners.forEach(function (t) {
          t.remove();
        }),
          (this.aListeners = []);
      }),
      (s.prototype.infoWindowOpen = function () {
        this.infoWindow.open(this.map, this.marker);
      }),
      (s.prototype.infoWindowClose = function () {
        this.infoWindow.close();
      }),
      (s.prototype.onClick = function () {
        this.infoWindow && this.infoWindowOpen(),
          this.fireClick({
            map: this.map,
            marker: this.marker,
            context: this.getBindingContext(),
            location: { lat: this.getLat(), lng: this.getLng() },
          });
      }),
      (s.prototype.onMouseover = function () {
        this.fireMouseover({
          map: this.map,
          marker: this.marker,
          context: this.getBindingContext(),
          location: { lat: this.getLat(), lng: this.getLng() },
        });
      }),
      (s.prototype.onMouseout = function () {
        this.fireMouseout({
          map: this.map,
          marker: this.marker,
          context: this.getBindingContext(),
          location: { lat: this.getLat(), lng: this.getLng() },
        });
      }),
      (s.prototype.onDragEnd = function () {
        var t = this.marker.getPosition();
        this.setLat(t.lat()),
          this.setLng(t.lng()),
          this.fireDragEnd({ position: t });
      }),
      (s.prototype.onInfoWindowClose = function () {
        this.fireInfoWindowClose({}), this.infoWindowClose();
      }),
      (s.prototype.reset = function () {
        (this.map = void 0),
          this.marker && (this.removeListeners(), this.marker.setMap(null));
      }),
      (s.prototype.exit = function () {
        this.reset();
      }),
      s
    );
  },
  !0
);
