var _ = require('../Vendor Only/underscore');

module.exports = {
  newLayersFromFiles: function newLayersFromFiles(specList) {
    // this method must work with current active document
    // so we check it first
    try { app.activeDocument } catch (e) { return; }

    var keyfileList = app.stringIDToTypeID('fileList');
    var keyAddLayerFromFile = app.stringIDToTypeID('addLayerFromFile');

    var myFileList = _(specList).reduce(function (ret, spec) {
      ret.putPath(new File(spec));
      return ret;
    }, new ActionList());

    var myOpenDescriptor = new ActionDescriptor();
    myOpenDescriptor.putList(keyfileList, myFileList);

    app.executeAction(keyAddLayerFromFile, myOpenDescriptor, DialogModes.NO);
  }
};
