"""dialog {
	text: 'Hive Sprite',

	g: Group {
		orientation: 'row',
		alignChildren: 'top',
		margins: 0,
		spacing: 20,

		g: Group {
			orientation: 'column',
			alignChildren: 'fill',
			spacing: 10,

			pnlSourceFiles: Panel {
				text: 'Source Files',
				orientation: 'row',
				alignChildren: 'top',
				margins: 15,

				g: Group {
					orientation: 'column',
					alignChildren: 'fill',

					ddl: DropDownList {
						title: 'Use: ',
						preferredSize: [300, -1],
						properties: {
							items: ['Files', 'Folders']
						}
					},

					boxSourceFiles: ListBox {
						size: [267, 155],
						alignment: 'right',
						properties: {
							items: ['ninja.png', 'robot.png', 'pizza.png']
						}
					}
				},

				actions: Group {
					orientation: 'column',
					margins: [0, 30, 0, 0],

					cmdBrowse: Button {
						text: 'Browse...'
					},
					cmdRemoveAll: Button {
						text: 'Remove All'
					},
					cmdRemove: Button {
						text: 'Remove'
					},
					cmdMoveUp: Button {
						text: 'Move Up'
					},
					cmdMoveDown: Button {
						text: 'Move Down'
					}
				}
			},

			pnlSpriteOutputOptions: Panel {
				text: 'Sprite Output Options',
				orientation: 'column',
				alignChildren: 'left',
				margins: 15,

				g1: Group {
					orientation: 'row',

					s: StaticText {
						preferredSize: [90, -1],
						justify: 'right',
						text: 'Build Direction: '
					},

					ddl: DropDownList {
						preferredSize: [100, -1],
						properties: {
							items: ['Horizontal', 'Vertial']
						}
					}
				},

				g2: Group {
					orientation: 'row',

					s: StaticText {
						preferredSize: [90, -1],
						justify: 'right',
						text: 'Offset Distance: '
					},
					txtOffsetDistance: EditText {
						preferredSize: [100, -1],
						text: 0
					},
					s: StaticText {
						text: 'px (range: 0-50)'
					}
				}
			},

			pnlCSSOutputOptions: Panel {
				text: 'CSS Output Options',
				orientation: 'column',
				alignChildren: 'left',
				margins: 15,

				g1: Group {
					orientation: 'row',

					s: StaticText {
						preferredSize: [90, -1],
						justify: 'right',
						text: 'Selector Prefix: '
					},
					txtSelectorPrefix: EditText {
						preferredSize: [100, -1]
					},
					s: StaticText {
						text: '(characters: 0-20)'
					}
				},

				g2: Group {
					orientation: 'row',

					s: StaticText {
						preferredSize: [90, -1],
						justify: 'right',
						text: 'Class Prefix: '
					},
					txtClassPrefix: EditText {
						preferredSize: [100, -1],
						text: 'sprite-'
					},
					s: StaticText {
						text: '(characters: 0-20)'
					}
				},

				g3: Group {
					orientation: 'row',

					s: StaticText {
						preferredSize: [90, -1],
						justify: 'right',
						text: 'Selector Suffix: '
					},
					txtSelectorSuffix: EditText {
						preferredSize: [100, -1]
					},
					s: StaticText {
						text: '(characters: 0-20)'
					}
				},

				chkIncludeWidthHeight: Checkbox {
					text: 'Include Width and Height',
					value: true
				}
			},

			pnlOutputFolder: Panel {
				text: 'Output Settings',
				orientation: 'column',
				alignChildren: 'left',
				margins: 15,

				g: Group {
					orientation: 'row',

					cmdChooseFolder: Button {
						text: 'Choose Folder...'
					},

					lblOutputFolder: StaticText {
						text: 'No output folder has been chosen.'
					}
				},

				chkOpenOutputFolder: Checkbox {
					text: 'Open Output Folder When Finished',
					value: true
				},

				chkCloseGeneratedDocument: Checkbox {
					text: 'Close Generated Document When Finished',
					value: false
				}
			}
		},

		actions: Group {
			orientation: 'column',
			margins: [0, 5, 0, 0],

			cmdOk: Button {
				text: 'OK',
				properties: {
					name: 'ok'
				}
			},

			cmdCancel: Button {
				text: 'Cancel',
				properties: {
					name: 'cancel'
				}
			}
		}
	}
}"""
