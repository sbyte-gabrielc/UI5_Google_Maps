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
    "sap/ui/core/ResizeHandler",
    "google.maps",
    "./MapsApi",
    "./MapUtils",
    "./MapTypeId",
  ],
  function (t, e, i, s, a, o, n) {
    "use strict";
    var r = e.extend("openui5.googlemaps.Map", {
      metadata: {
        properties: {
          lat: { type: "float", bindable: "bindable", defaultValue: 1 },
          lng: { type: "float", bindable: "bindable", defaultValue: 1 },
          width: {
            type: "sap.ui.core.CSSSize",
            group: "Dimension",
            defaultValue: "auto",
          },
          height: {
            type: "sap.ui.core.CSSSize",
            group: "Dimension",
            defaultValue: "20em",
          },
          zoom: { type: "int", defaultValue: 8 },
          disableDefaultUI: { type: "boolean", defaultValue: !0 },
          mapTypeId: { type: "string", defaultValue: n.ROADMAP },
          panControl: { type: "boolean", defaultValue: !1 },
          zoomControl: { type: "boolean", defaultValue: !1 },
          mapTypeControl: { type: "boolean", defaultValue: !1 },
          streetViewControl: { type: "boolean", defaultValue: !1 },
          fitToMarkers: { type: "boolean", defaultValue: !1 },
          mapsUrl: { type: "string", defaultValue: "" },
          apiKey: { type: "string", defaultValue: "" },
          clientId: { type: "string", defaultValue: "" },
          version: { type: "string", defaultValue: "3.exp" },
          language: { type: "string", defaultValue: "" },
          signedIn: { type: "boolean", defaultValue: !1 },
        },
        defaultAggregation: "markers",
        aggregations: {
          markers: {
            type: "openui5.googlemaps.Marker",
            multiple: !0,
            bindable: "bindable",
          },
          polylines: {
            type: "openui5.googlemaps.Polyline",
            multiple: !0,
            bindable: "bindable",
          },
          polygons: {
            type: "openui5.googlemaps.Polygon",
            multiple: !0,
            bindable: "bindable",
          },
          directions: {
            type: "openui5.googlemaps.Directions",
            multiple: !1,
            bindable: "bindable",
          },
          markerCluster: {
            type: "openui5.googlemaps.MarkerCluster",
            multiple: !1,
            bindable: "bindable",
          },
        },
        events: { ready: {}, click: {} },
      },
      renderer: function (t, e) {
        t.write("<div "),
          t.writeControlData(e),
          t.addStyle("width", "auto"),
          t.addStyle("height", "auto"),
          t.writeClasses(),
          t.writeStyles(),
          t.write(">"),
          t.renderControl(e._html),
          t.write("</div>");
      },
    });
    return (
      (r.prototype.init = function () {
        (this._dragging = !1),
          (this.aListeners = []),
          (this.mapId = this.getId() + "-map"),
          (this._html = new sap.ui.core.HTML({
            content:
              "<div style='height: " +
              this.getHeight() +
              ";width: " +
              this.getWidth() +
              ";' id='" +
              this.mapId +
              "'></div>",
          }));
      }),
      (r.prototype.onBeforeRendering = function () {
        void 0 === s.loaded &&
          void 0 === this._oMapsApi &&
          ((this._oMapsApi = new a({
            mapsUrl: this.getMapsUrl(),
            apiKey: this.getApiKey(),
            clientId: this.getClientId(),
            version: this.getVersion(),
            language: this.getLanguage(),
            signedIn: this.getSignedIn(),
          })),
          this._oMapsApi.load());
      }),
      (r.prototype.setHeight = function (t) {
        return this.setProperty("height", t, !0), this.setSize(), this;
      }),
      (r.prototype.setWidth = function (t) {
        return this.setProperty("width", t, !0), this.setSize(), this;
      }),
      (r.prototype.setSize = function () {
        if (t.sap.domById(this.mapId))
          t.sap
            .byId(this.mapId)
            .css("height", this.getHeight())
            .css("width", this.getWidth());
        else {
          var e = t(this._html.getContent());
          e.css("height", this.getHeight()).css("width", this.getWidth()),
            this._html.setContent(e.outerHTML());
        }
        return this;
      }),
      (r.prototype.setZoom = function (t) {
        return (
          this.setProperty("zoom", t, !0),
          this.map && t !== this.map.getZoom() && this.map.setZoom(t),
          this
        );
      }),
      (r.prototype.setLat = function (t) {
        var e = parseFloat(t);
        return (
          o.floatEqual(e, this.getLat()) ||
            (this.setProperty("lat", e, !0), this._updateCenter()),
          this
        );
      }),
      (r.prototype.setLng = function (t) {
        var e = parseFloat(t);
        return (
          o.floatEqual(e, this.getLng()) ||
            (this.setProperty("lng", e, !0), this._updateCenter()),
          this
        );
      }),
      (r.prototype.setFitToMarkers = function (t) {
        return (
          this.setProperty("fitToMarkers", t, !0), this._fitToMarkers(), this
        );
      }),
      (r.prototype._updateCenter = function () {
        this.map &&
          null !== this.getLat() &&
          null !== this.getLng() &&
          (t.sap.clearDelayedCall(this.delayedCallId),
          (this.delayedCallId = t.sap.delayedCall(0, this, function () {
            this.map.setCenter(new s.LatLng(this.getLat(), this.getLng())),
              this.notifyAggregations("mapRendered");
          })));
      }),
      (r.prototype.setMapTypeId = function (t) {
        return (
          this.setProperty("mapTypeId", t, !0),
          this.map && t !== this.map.getMapTypeId() && this.map.setMapTypeId(t),
          this
        );
      }),
      (r.prototype.setZoomControl = function (t) {
        return (
          this.setProperty("zoomControl", t, !0),
          this.map && t !== this.map.zoomControl && (this.map.zoomControl = t),
          this
        );
      }),
      (r.prototype.setDisableDefaultUI = function (t) {
        return (
          this.setProperty("disableDefaultUI", t, !0),
          this.map &&
            this.map.setOptions({
              disableDefaultUI: this.getDisableDefaultUI(),
            }),
          this
        );
      }),
      (r.prototype.zoomChanged = function () {
        this.map.getZoom() !== this.getZoom() &&
          this.setZoom(this.map.getZoom());
      }),
      (r.prototype.mapTypeIdChanged = function () {
        this.map.getMapTypeId() !== this.getMapTypeId() &&
          this.setMapTypeId(this.map.getMapTypeId());
      }),
      (r.prototype.onResize = function () {
        var t = this.map.getCenter();
        this.trigger("resize"), this.map.setCenter(t);
      }),
      (r.prototype._getMapOptions = function () {
        var t = {};
        return (
          (t.zoom = this.getZoom()),
          (t.center = new s.LatLng(this.getLat(), this.getLng())),
          (t.disableDefaultUI = this.getDisableDefaultUI()),
          (t.mapTypeId = this.getMapTypeId()),
          (t.panControl = this.getPanControl()),
          (t.zoomControl = this.getZoomControl()),
          (t.mapTypeControl = this.getMapTypeControl()),
          (t.streetViewControl = this.getStreetViewControl()),
          t
        );
      }),
      (r.prototype.notifyAggregations = function (t) {
        var e = this.getMetadata().getAggregations(),
          i = Object.keys(e).map(function (t) {
            return e[t];
          }),
          s = this.map,
          a = function (e) {
            e["_" + t](s);
          };
        i.forEach(
          function (t) {
            var e = this[t._sGetter]();
            e && (!0 === t.multiple ? e.forEach(a) : a(e));
          }.bind(this)
        );
      }),
      (r.prototype.onAfterRendering = function () {
        if (!s.loaded)
          return void (
            void 0 === this.subscribed &&
            (sap.ui
              .getCore()
              .getEventBus()
              .subscribe(s.notifyEvent, this.createMap, this),
            (this.subscribed = !0))
          );
        this.initialized ? this._updateCenter() : this.createMap();
      }),
      (r.prototype.createMap = function () {
        this.getLat() &&
          this.getLng() &&
          ((this.map = new s.Map(
            t.sap.domById(this.mapId),
            this._getMapOptions()
          )),
          this.notifyAggregations("mapRendered"),
          this.addListener("drag", this.isDragging.bind(this)),
          this.addListener("dragstart", this.isDragging.bind(this)),
          this.addListener("zoom_changed", this.zoomChanged.bind(this)),
          this.addListener("idle", this.mapChanged.bind(this)),
          this.addListener(
            "maptypeid_changed",
            this.mapTypeIdChanged.bind(this)
          ),
          this.addListener("click", this.clicked.bind(this)),
          (this.resizeID = i.register(
            t.sap.domById(this.mapId),
            this.onResize.bind(this)
          )),
          this._fitToMarkers(),
          (this.initialized = !0));
      }),
      (r.prototype.addListener = function (t, e) {
        this.aListeners.push(o.addListener(this.map, t, e));
      }),
      (r.prototype.removeListeners = function () {
        this.aListeners.forEach(function (t) {
          t.remove();
        }),
          (this.aListeners = []);
      }),
      (r.prototype.trigger = function (t, e) {
        s.event.trigger(this.map, t, e);
      }),
      (r.prototype.isDragging = function () {
        this._dragging = !0;
      }),
      (r.prototype.isNotDragging = function () {
        this._dragging = !1;
      }),
      (r.prototype.mapChanged = function () {
        this._dragging && this.isNotDragging(),
          this.fireReady({
            map: this.map,
            context: this.getBindingContext(),
            lat: this.getLat(),
            lng: this.getLng(),
          });
      }),
      (r.prototype._fitToMarkers = function () {
        if (
          this.map &&
          this.getFitToMarkers() &&
          this.getMarkers().length > 0
        ) {
          var t = new s.LatLngBounds();
          this.getMarkers().forEach(function (e) {
            t.extend(e.marker.getPosition());
          }),
            this.getMarkers().length > 1 && this.map.fitBounds(t);
        }
      }),
      (r.prototype.resetMap = function () {
        this.removeListeners(), this.map && this.map.set(null);
      }),
      (r.prototype.exit = function () {
        this.resetMap(), i.deregister(this.resizeID);
      }),
      (r.prototype.clicked = function (t) {
        this.fireClick({
          map: this.map,
          context: this.getBindingContext(),
          lat: t.latLng.lat(),
          lng: t.latLng.lng(),
        });
      }),
      r
    );
  },
  !0
);
