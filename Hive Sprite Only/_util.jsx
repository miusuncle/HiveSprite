function newLayersFromFiles(specList) {
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
