/**
 * openui5-googlemaps - OpenUI5 Google Maps library
 * @version v1.0.4
 * @link http://jasper07.github.io/openui5-googlemaps/
 * @license MIT
 */
sap.ui.define(
  ["jquery.sap.global", "google.maps"],
  function (e, n) {
    "use strict";
    var t = {};
    return (
      (t.objToLatLng = function (e) {
        return new n.LatLng(e.lat, e.lng);
      }),
      (t.latLngToObj = function (e) {
        return { lat: e.lat(), lng: e.lng() };
      }),
      (t.floatEqual = function (e, n) {
        return Math.abs(e - n) < 1e-6;
      }),
      (t.latLngEqual = function (e, n) {
        return this.floatEqual(e.lat, n.lat) && this.floatEqual(e.lng, n.lng);
      }),
      (t.search = function (t) {
        var o = e.Deferred();
        return (
          n.isLoaded.then(function () {
            new n.Geocoder().geocode(t, o.resolve);
          }),
          o.promise()
        );
      }),
      (t.currentPosition = function () {
        var n = e.Deferred(),
          t = { enableHighAccuracy: !0, timeout: 5e3, maximumAge: 0 },
          o = function (e) {
            var t = {};
            (t.lat = e.coords.latitude),
              (t.lng = e.coords.longitude),
              n.resolve(t);
          },
          r = function (t) {
            e.sap.log.info("ERROR(" + t.code + "): " + t.message), n.reject(t);
          };
        return (
          navigator.geolocation &&
            navigator.geolocation.getCurrentPosition(o, r, t),
          n.promise()
        );
      }),
      (t.trigger = function (e, t, o) {
        n.event.trigger(e, t, o);
      }),
      (t.addListener = function (e, t, o) {
        return n.event.addListener(e, t, o);
      }),
      (t.geocodePosition = function (t) {
        var o = e.Deferred(),
          r = function (e) {
            e && e.length > 0
              ? o.resolve(e[0].formatted_address)
              : o.reject("Cannot determine address at this location.");
          };
        return new n.Geocoder().geocode({ latLng: t }, r), o.promise();
      }),
      t
    );
  },
  !0
);
