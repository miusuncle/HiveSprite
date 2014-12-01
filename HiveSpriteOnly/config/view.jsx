module.exports = """dialog {
  text: 'Hive Sprite',

  g: Group {
    orientation: 'row',
    alignChildren: 'top',
    margins: 0,
    spacing: 16,

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

          g: Group {
            orientation: 'row',
            alignChildren: 'fill',
            spacing: 20,

            ddlBrowseUse: DropDownList {
              title: 'Browse Use: ',
              preferredSize: [200, -1],
              properties: {
                name: 'ddlBrowseUse'
              }
            },

            chkIncludeSubFolders: Checkbox {
              text: 'Include All Subfolders',
              properties: {
                name: 'chkIncludeSubFolders'
              }
            }
          },

          lstSourceImages: ListBox {
            preferredSize: [550, 155],
            alignment: 'right',
            properties: {
              name: 'lstSourceImages',
              multiselect: true
            }
          }
        },

        actions: Group {
          orientation: 'column',
          margins: [5, 30, 0, 0],

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
            preferredSize: [120, -1],
            properties: {
              name: 'ddlBuildDirection'
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
            preferredSize: [120, -1],
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
            text: 'CSS Format: '
          },

          ddlCSSFormat: DropDownList {
            preferredSize: [120, -1],
            properties: {
              name: 'ddlCSSFormat'
            }
          }
        },

        g2: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [100, -1],
            justify: 'right',
            text: 'Selector Prefix: '
          },
          txtSelectorPrefix: EditText {
            preferredSize: [250, -1],
            helpTip: 'CSS to insert before the class name.',
            properties: {
              name: 'txtSelectorPrefix'
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
            text: 'Class Prefix: '
          },
          txtClassPrefix: EditText {
            preferredSize: [250, -1],
            helpTip: 'can\\'t begin with number',
            properties: {
              name: 'txtClassPrefix'
            }
          },
          s: StaticText {
            text: '(characters: 0-20, can\\'t begin with number)'
          }
        },

        g4: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [100, -1],
            justify: 'right',
            text: 'Selector Suffix: '
          },
          txtSelectorSuffix: EditText {
            preferredSize: [250, -1],
            helpTip: 'CSS to insert after the class name.',
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

          txtOutputFolder: EditText {
            text: '',
            alignment: 'fill',
            preferredSize: [524, -1],
            properties: {
              name: 'txtOutputFolder'
            }
          },

          cmdChooseFolder: Button {
            text: 'Choose Folder...',
            properties: {
              name: 'cmdChooseFolder'
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
            properties: {
              name: 'chkCloseGeneratedDocument'
            }
          },

          chkOpenOutputFolder: Checkbox {
            alignment: 'left',
            indent: 20,
            preferredSize: [300, -1],
            text: 'Open Output Folder',
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
      spacing: 20,

      actions: Group {
        orientation: 'column',
        cmdBuild: Button {
          text: 'Build',
          preferredSize: [100, -1],
          properties: {
            name: 'cmdBuild'
          }
        },

        cmdCancel: Button {
          text: 'Cancel',
          preferredSize: [100, -1],
          properties: {
            name: 'cmdCancel'
          }
        }
      },

      pnlImagePreview: Panel {
        text: 'Preview',
        orientation: 'column',
        margins: [5, 20, 5, 5],
        spacing: 6,
        properties: {
          name: 'pnlImagePreview'
        },

        img0: Image { preferredSize: [90, 86] },
        img1: Image { preferredSize: [90, 86] },
        img2: Image { preferredSize: [90, 86] },
        img3: Image { preferredSize: [90, 86] },
        img4: Image { preferredSize: [90, 86] },
        img5: Image { preferredSize: [90, 86] }
      }
    }
  }
}""";
