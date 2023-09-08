/*global QUnit*/

sap.ui.define([
	"project1/controller/Mapa.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Mapa Controller");

	QUnit.test("I should test the Mapa controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
