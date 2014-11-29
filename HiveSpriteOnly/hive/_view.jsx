module.exports = """dialog {
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

      pnlSourceImages: Panel {
        text: 'Source Images',
        orientation: 'row',
        alignChildren: 'top',
        margins: 15,

        g: Group {
          orientation: 'column',
          alignChildren: 'fill',

          ddlBrowseUse: DropDownList {
            title: 'Use: ',
            preferredSize: [400, -1],
            properties: {
              name: 'ddlBrowseUse'
            }
          },

          lstSourceImages: ListBox {
            preferredSize: [367, 155],
            alignment: 'right',
            properties: {
              name: 'lstSourceImages',
              multiselect: true
            }
          }
        },

        actions: Group {
          orientation: 'column',
          margins: [0, 30, 0, 0],

          cmdBrowse: Button {
            text: 'Browse...',
            properties: {
              name: 'cmdBrowse'
            }
          },
          cmdRemoveAll: Button {
            text: 'Remove All',
            properties: {
              name: 'cmdRemoveAll'
            }
          },
          cmdRemove: Button {
            text: 'Remove',
            properties: {
              name: 'cmdRemove'
            }
          },
          cmdMoveUp: Button {
            text: 'Move Up',
            properties: {
              name: 'cmdMoveUp'
            }
          },
          cmdMoveDown: Button {
            text: 'Move Down',
            properties: {
              name: 'cmdMoveDown'
            }
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
            preferredSize: [100, -1],
            justify: 'right',
            text: 'Build Direction: '
          },

          ddlBuildDirection: DropDownList {
            preferredSize: [100, -1],
            properties: {
              name: 'ddlBuildDirection',
              items: ['Horizontal', 'Vertial']
            }
          }
        },

        g2: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [100, -1],
            justify: 'right',
            text: 'Offset Distance: '
          },
          txtOffsetDistance: EditText {
            preferredSize: [100, -1],
            text: 0,
            properties: {
              name: 'txtOffsetDistance'
            }
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
            preferredSize: [100, -1],
            justify: 'right',
            text: 'Selector Prefix: '
          },
          txtSelectorPrefix: EditText {
            preferredSize: [100, -1],
            properties: {
              name: 'txtSelectorPrefix'
            }
          },
          s: StaticText {
            text: '(characters: 0-20)'
          }
        },

        g2: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [100, -1],
            justify: 'right',
            text: 'Class Prefix: '
          },
          txtClassPrefix: EditText {
            preferredSize: [100, -1],
            text: 'sprite-',
            properties: {
              name: 'txtClassPrefix'
            }
          },
          s: StaticText {
            text: '(characters: 0-20)'
          }
        },

        g3: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [100, -1],
            justify: 'right',
            text: 'Selector Suffix: '
          },
          txtSelectorSuffix: EditText {
            preferredSize: [100, -1],
            properties: {
              name: 'txtSelectorSuffix'
            }
          },
          s: StaticText {
            text: '(characters: 0-20)'
          }
        },

        chkIncludeWidthHeight: Checkbox {
          text: 'Include Width and Height',
          helpTip: 'Provides the height and width of each sprite in the CSS.',
          value: true,
          properties: {
            name: 'chkIncludeWidthHeight'
          }
        }
      },

      pnlOutputFolder: Panel {
        text: 'Output Settings',
        orientation: 'column',
        alignChildren: 'fill',
        margins: 15,
        spacing: 10,

        g1: Group {
          orientation: 'row',

          cmdChooseFolder: Button {
            text: 'Choose Folder...',
            properties: {
              name: 'cmdChooseFolder'
            }
          },

          lblOutputFolder: StaticText {
            text: 'No output folder has been chosen.',
            properties: {
              name: 'lblOutputFolder'
            }
          }
        },

        p: Panel {
          preferredSize: [-1, 0]
        },

        g2: Group {
          orientation: 'column',
          alignChildren: 'fill',

          s: StaticText {
            text: 'After Finished Building: '
          },

          chkCloseGeneratedDocument: Checkbox {
            alignment: 'left',
            indent: 20,
            preferredSize: [300, -1],
            text: 'Close Generated Document',
            value: false,
            properties: {
              name: 'chkCloseGeneratedDocument'
            }
          },

          chkOpenOutputFolder: Checkbox {
            alignment: 'left',
            indent: 20,
            preferredSize: [300, -1],
            text: 'Open Output Folder',
            value: true,
            properties: {
              name: 'chkOpenOutputFolder'
            }
          }
        }
      }
    },

    actions: Group {
      orientation: 'column',
      margins: [0, 5, 0, 0],

      cmdOk: Button {
        text: 'OK',
        properties: {
          name: 'cmdOk'
        }
      },

      cmdCancel: Button {
        text: 'Cancel',
        properties: {
          name: 'cmdCancel'
        }
      }
    }
  }
}""";
