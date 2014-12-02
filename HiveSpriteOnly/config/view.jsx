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

            ddlBrowseUsing: DropDownList {
              title: 'Browse Using: ',
              preferredSize: [200, -1],
              properties: {
                name: 'ddlBrowseUsing'
              }
            },

            chkIncludeSubFolders: Checkbox {
              text: 'Include Images in All Subfolders',
              properties: {
                name: 'chkIncludeSubFolders'
              }
            },

            chkPreviewImages: Checkbox {
              text: 'Preview Selected Images',
              properties: {
                name: 'chkPreviewImages'
              }
            }
          },

          lstSourceImages: ListBox {
            preferredSize: [570, 180],
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
            preferredSize: [530, -1],
            properties: {
              name: 'txtOutputFolder'
            }
          },

          cmdChooseFolder: Button {
            text: 'Choose Folder...',
            alignment: 'fill',
            preferredSize: [120, -1],
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

          g1: Group {
            chkExportSpriteImage: Checkbox {
              alignment: 'left',
              preferredSize: [310, -1],
              text: 'Export Sprite Image to Output Folder',
              properties: {
                name: 'chkExportSpriteImage'
              }
            },

            chkExportCSSFile: Checkbox {
              alignment: 'left',
              preferredSize: [310, -1],
              text: 'Export CSS File to Output Folder',
              properties: {
                name: 'chkExportCSSFile'
              }
            }
          },

          g2: Group {
            chkCloseGeneratedDocument: Checkbox {
              alignment: 'left',
              preferredSize: [310, -1],
              text: 'Close Generated Document',
              properties: {
                name: 'chkCloseGeneratedDocument'
              }
            },

            chkOpenOutputFolder: Checkbox {
              alignment: 'left',
              preferredSize: [310, -1],
              text: 'Open Output Folder',
              properties: {
                name: 'chkOpenOutputFolder'
              }
            }
          }
        }
      },

      pnlSpriteBuildingOptions: Panel {
        text: 'Sprite Building Options',
        orientation: 'column',
        alignChildren: 'left',
        margins: 15,

        g1: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [124, -1],
            justify: 'right',
            text: 'Building Method: '
          },

          ddlBuildMethod: DropDownList {
            preferredSize: [120, -1],
            properties: {
              name: 'ddlBuildMethod'
            }
          },

          g: Group {
            orientation: 'row',
            visible: false,
            properties: {
              name: 'grpArrangement'
            },

            s: StaticText {
              preferredSize: [120, -1],
              justify: 'right',
              text: 'Arrange By: '
            },

            ddlArrangeBy: DropDownList {
              preferredSize: [90, -1],
              properties: {
                name: 'ddlArrangeBy'
              }
            },

            g: Group {
              orientation: 'stack',

              lblColsPerRow: StaticText {
                preferredSize: [150, -1],
                justify: 'right',
                text: 'Columns per Row: ',
                visible: false,
                properties: {
                  name: 'lblColsPerRow'
                }
              },

              lblRowsPerCol: StaticText {
                preferredSize: [160, -1],
                justify: 'right',
                text: 'Rows per Column: ',
                visible: false,
                properties: {
                  name: 'lblRowsPerCol'
                }
              },
            },

            txtRowNums: EditText {
              preferredSize: [50, -1],
              helpTip: 'range: 1-30',
              properties: {
                name: 'txtRowNums'
              }
            }
          }
        },

        g2: Group {
          orientation: 'stack',
          alignChildren: 'left',

          g1: Group {
            orientation: 'row',
            properties: {
              name: 'grpSoloSpacing'
            },

            s: StaticText {
              preferredSize: [124, -1],
              justify: 'right',
              text: 'Offset Spacing: '
            },
            txtOffsetSpacing: EditText {
              preferredSize: [120, -1],
              helpTip: 'range: 0-50',
              properties: {
                name: 'txtOffsetSpacing'
              }
            },
            s: StaticText {
              text: 'px'
            }
          },

          g2: Group {
            orientation: 'row',
            visible: false,
            properties: {
              name: 'grpDualSpacing'
            },

            g1: Group {
              s: StaticText {
                preferredSize: [124, -1],
                justify: 'right',
                text: 'Horizontal Spacing: '
              },
              txtHorizontalSpacing: EditText {
                preferredSize: [120, -1],
                helpTip: 'range: 0-50',
                properties: {
                  name: 'txtHorizontalSpacing'
                }
              },
              s: StaticText {
                text: 'px'
              }
            },

            g2: Group {
              s: StaticText {
                preferredSize: [124, -1],
                justify: 'right',
                text: 'Vertical Spacing: '
              },
              txtVerticalSpacing: EditText {
                preferredSize: [120, -1],
                helpTip: 'range: 0-50',
                properties: {
                  name: 'txtVerticalSpacing'
                }
              },
              s: StaticText {
                text: 'px'
              }
            }
          }
        }
      },

      pnlCSSExportOptions: Panel {
        text: 'CSS Export Options',
        orientation: 'column',
        alignChildren: 'left',
        margins: 15,
        properties: {
          name: 'pnlCSSExportOptions'
        },

        g1: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [124, -1],
            justify: 'right',
            text: 'CSS Format: '
          },

          ddlCSSFormat: DropDownList {
            preferredSize: [120, -1],
            properties: {
              name: 'ddlCSSFormat'
            }
          },

          chkIncludeWidthHeight: Checkbox {
            text: 'Include Width and Height',
            helpTip: 'Provides the width and height of each sprite in the CSS.',
            properties: {
              name: 'chkIncludeWidthHeight'
            }
          }
        },

        g2: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [124, -1],
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
            preferredSize: [124, -1],
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
            text: '(characters: 0-20)'
          }
        },

        g4: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [124, -1],
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
