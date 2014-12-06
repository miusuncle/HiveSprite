module.exports = """dialog {
  text: 'Hive Sprite',

  g: Group {
    orientation: 'row',
    alignChildren: 'top',
    margins: 0,

    g: Group {
      orientation: 'column',
      alignChildren: ['fill', 'fill'],
      spacing: 10,

      pnlSourceImages: Panel {
        text: 'Source Images',
        orientation: 'column',
        alignChildren: ['fill', 'fill'],
        margins: 15,
        spacing: 10,
        properties: {
          name: 'pnlSourceImages'
        },

        g1: Group {
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
          },

          lblSourceImagesStat: StaticText {
            alignment: 'middle',
            text: 'Total: 0 Selected: 0 Images: 0',
            preferredSize: [230, -1],
            properties: {
              name: 'lblSourceImagesStat'
            }
          }
        },

        g2: Group {
          orientation: 'row',
          alignChildren: ['fill', 'fill'],

          lstSourceImages: ListBox {
            preferredSize: [600, -1],
            properties: {
              name: 'lstSourceImages',
              multiselect: true
            }
          },

          actions: Group {
            orientation: 'column',
            alignChildren: 'fill',
            preferredSize: [100, -1],

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
            cmdInsertSeparator: Button {
              text: 'Add Separator',
              properties: {
                name: 'cmdInsertSeparator'
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
        }
      },

      pnlOutputSettings: Panel {
        text: 'Output Settings',
        orientation: 'column',
        alignChildren: 'fill',
        margins: 15,
        spacing: 10,
        properties: {
          name: 'pnlOutputSettings'
        },

        g1: Group {
          orientation: 'row',
          alignChildren: ['fill', 'fill'],

          txtOutputFolder: EditText {
            text: '',
            preferredSize: [600, -1],
            properties: {
              name: 'txtOutputFolder'
            }
          },

          cmdChooseFolder: Button {
            text: 'Choose Folder...',
            preferredSize: [100, -1],
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
            text: 'After Finished Building: ',
            properties: {
              name: 'lblAfterBuild'
            }
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
        properties: {
          name: 'pnlSpriteBuildingOptions'
        },

        g1: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [124, -1],
            justify: 'right',
            text: 'Building Method: ',
            properties: {
              name: 'lblBuildMethod'
            }
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
              preferredSize: [150, -1],
              justify: 'right',
              text: 'Arrange By: ',
              properties: {
                name: 'lblArrangeBy'
              }
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
                preferredSize: [170, -1],
                justify: 'right',
                text: 'Columns per Row: ',
                visible: false,
                properties: {
                  name: 'lblColsPerRow'
                }
              },

              lblRowsPerCol: StaticText {
                preferredSize: [170, -1],
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
              helpTip: 'range: 1-50',
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
              text: 'Offset Spacing: ',
              properties: {
                name: 'lblOffsetSpacing'
              }
            },
            txtOffsetSpacing: EditText {
              preferredSize: [120, -1],
              helpTip: 'range: 0-200',
              properties: {
                name: 'txtOffsetSpacing'
              }
            },
            s: StaticText {
              text: 'px',
              properties: {
                name: 'lblOffsetSpacingUnit'
              }
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
                text: 'Horizontal Spacing: ',
                properties: {
                  name: 'lblHorizontalSpacing'
                }
              },
              txtHorizontalSpacing: EditText {
                preferredSize: [120, -1],
                helpTip: 'range: 0-200',
                properties: {
                  name: 'txtHorizontalSpacing'
                }
              },
              s: StaticText {
                text: 'px',
                properties: {
                  name: 'lblHorizontalSpacingUnit'
                }
              }
            },

            g2: Group {
              s: StaticText {
                preferredSize: [124, -1],
                justify: 'right',
                text: 'Vertical Spacing: ',
                properties: {
                  name: 'lblVerticalSpacing'
                }
              },
              txtVerticalSpacing: EditText {
                preferredSize: [120, -1],
                helpTip: 'range: 0-200',
                properties: {
                  name: 'txtVerticalSpacing'
                }
              },
              s: StaticText {
                text: 'px',
                properties: {
                  name: 'lblVerticalSpacingUnit'
                }
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
            text: 'CSS Format: ',
            properties: {
              name: 'lblCSSFormat'
            }
          },

          ddlCSSFormat: DropDownList {
            preferredSize: [120, -1],
            properties: {
              name: 'ddlCSSFormat'
            }
          },

          chkIncludeWidthHeight: Checkbox {
            text: 'Include Width and Height',
            preferredSize: [200, -1],
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
            text: 'Selector Prefix: ',
            properties: {
              name: 'lblSelectorPrefix'
            }
          },
          txtSelectorPrefix: EditText {
            preferredSize: [250, -1],
            helpTip: 'CSS to insert before the class name.',
            properties: {
              name: 'txtSelectorPrefix'
            }
          },
          s: StaticText {
            text: '(characters: 0-20)',
            properties: {
              name: 'lblSelectorPrefixHint'
            }
          }
        },

        g3: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [124, -1],
            justify: 'right',
            text: 'Class Prefix: ',
            properties: {
              name: 'lblClassPrefix'
            }
          },
          txtClassPrefix: EditText {
            preferredSize: [250, -1],
            helpTip: 'can\\'t begin with number.',
            properties: {
              name: 'txtClassPrefix'
            }
          },
          s: StaticText {
            text: '(characters: 0-20)',
            properties: {
              name: 'lblClassPrefixHint'
            }
          }
        },

        g4: Group {
          orientation: 'row',

          s: StaticText {
            preferredSize: [124, -1],
            justify: 'right',
            text: 'Selector Suffix: ',
            properties: {
              name: 'lblSelectorSuffix',
            }
          },
          txtSelectorSuffix: EditText {
            preferredSize: [250, -1],
            helpTip: 'CSS to insert after the class name.',
            properties: {
              name: 'txtSelectorSuffix'
            }
          },
          s: StaticText {
            text: '(characters: 0-20)',
            properties: {
              name: 'lblSelectorSuffixHint'
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
          preferredSize: [110, -1],
          properties: {
            name: 'cmdBuild'
          }
        },

        cmdCancel: Button {
          text: 'Cancel',
          preferredSize: [110, -1],
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

        img0: Image { preferredSize: [100, 86] },
        img1: Image { preferredSize: [100, 86] },
        img2: Image { preferredSize: [100, 86] },
        img3: Image { preferredSize: [100, 86] },
        img4: Image { preferredSize: [100, 86] },
        img5: Image { preferredSize: [100, 86] }
      }
    }
  }
}""";
