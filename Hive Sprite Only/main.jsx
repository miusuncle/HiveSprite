var hiveView = require('_view.jsx');
var hiveValidator = require('_validator.jsx');

var hiveWindow = new Window(hiveView);

// ===========================================================
var pnlSourceFiles = hiveWindow.g.g.pnlSourceFiles;
var pnlSpriteOutputOptions = hiveWindow.g.g.pnlSpriteOutputOptions;
var pnlCSSOutputOptions = hiveWindow.g.g.pnlCSSOutputOptions;
var pnlOutputFolder = hiveWindow.g.g.pnlOutputFolder;
// ===========================================================

// -----------------------------------------------------------
var ddlUse = pnlSourceFiles.g.ddl;
ddlUse.selection = 0;

var ddlBuildDirection = pnlSpriteOutputOptions.g1.ddl;
ddlBuildDirection.selection = 1;
// -----------------------------------------------------------


hiveWindow.center();
hiveWindow.show();




