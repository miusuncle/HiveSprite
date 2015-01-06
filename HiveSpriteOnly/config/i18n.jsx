var util = require('../lib/util');
var _    = require('../lib/underscore');

var nls = {
  'CHC': {
    FILES: {
      zh: '文件',
      en: 'Files'
    },
    FOLDER: {
      zh: '文件夹',
      en: 'Folder'
    },
    HORIZONTAL: {
      zh: '单行',
      en: 'Horizontal'
    },
    VERTICAL: {
      zh: '单列',
      en: 'Vertical'
    },
    GROUPED: {
      zh: '分隔符分组',
      en: 'Divide By Seps.'
    },
    TILED: {
      zh: '平铺',
      en: 'Tiled'
    },
    ROWS: {
      zh: '先行后列',
      en: 'Rows'
    },
    COLUMNS: {
      zh: '先列后行',
      en: 'Columns'
    },
    EXPANDED: {
      zh: '展开',
      en: 'Expanded'
    },
    COMPACT: {
      zh: '紧凑',
      en: 'Compact'
    }
  },

  'DLG': {
    SELECT_IMAGES: {
      zh: '请选择要添加的图片',
      en: 'Select source images'
    },
    TARGET_FOLDER: {
      zh: '请选择包含图片的目标文件夹',
      en: 'Select target folder that contains images'
    },
    OUTPUT_FOLDER: {
      zh: '请选择要导出Sprite图片文件和CSS样式文件的目标文件夹',
      en: 'Select target folder you want to export Sprite Image file and CSS style file into'
    },
    IMPORT_SETTINGS_FORM_FILE: {
      zh: '从指定文件导入设定',
      en: 'Import settings from specified file'
    },
    EXPORT_SETTINGS_TO_FILE: {
      zh: '导出当前设定到指定文件',
      en: 'Export current settings to specified file'
    },
    EXPORT_SETTINGS_TO_FOLDER: {
      zh: '导出当前设定到指定文件夹',
      en: 'Export current settings to specified folder'
    },
    EXPORT_IMAGES_TIPS: {
      zh: '当前设置图片源非空，是否同时导出图片源？',
      en: 'Current source images is not empty, do you want to export source images simultaneously?'
    },
    EXPORT_SUCCEED: {
      zh: '当前设置导出成功，是否打开导出目录？',
      en: 'Export current settings successfully, do you want to reveal export folder?'
    }
  },

  'UI': {
    SOURCE_IMAGES: {
      zh: '图片来源',
      en: 'Source Images'
    },
    BROWSE_USING: {
      zh: '浏览使用: ',
      en: 'Browse Using: '
    },
    INCLUDE_SUBFOLDERS: {
      zh: '包括所有子文件夹图片',
      en: 'Include All Subfolders'
    },
    PREVIEW_IMAGES: {
      zh: '预览选中的图片',
      en: 'Preview Selected'
    },
    BROWSE: {
      zh: '浏览...',
      en: 'Browse...'
    },
    REMOVE_ALL: {
      zh: '移除所有',
      en: 'Remove All'
    },
    REMOVE: {
      zh: '移除',
      en: 'Remove'
    },
    INSERT_SEPARATOR: {
      zh: '插入分隔符',
      en: 'Add Separator'
    },
    DUPLICATE: {
      zh: '复制',
      en: 'Duplicate'
    },
    MOVE_UP: {
      zh: '上移',
      en: 'Move Up'
    },
    MOVE_DOWN: {
      zh: '下移',
      en: 'Move Down'
    },
    OUTPUT_SETTINGS: {
      zh: '输出设置',
      en: 'Output Settings'
    },
    CHOOSE_FOLDER: {
      zh: '选择输出目录...',
      en: 'Choose Folder...'
    },
    AFTER_BUILD: {
      zh: '文档生成后执行操作: ',
      en: 'After Finished Building: '
    },
    EXPORT_SPRITE_IMAGE: {
      zh: '导出Sprite图片文件到输出目录',
      en: 'Export Sprite Image to Output Folder'
    },
    EXPORT_CSS_FILE: {
      zh: '导出CSS样式文件到输出目录',
      en: 'Export CSS File to Output Folder'
    },
    CLOSE_GEN_DOC: {
      zh: '关闭生成的文档',
      en: 'Close Generated Document'
    },
    OPEN_OUTPUT_FOLDER: {
      zh: '打开输出目录',
      en: 'Open Output Folder'
    },
    SPRITE_BUILD_OPTIONS: {
      zh: 'Sprite图片生成规则',
      en: 'Sprite Building Options'
    },
    BUILD_METHOD: {
      zh: '生成方法: ',
      en: 'Building Method: '
    },
    ARRANGE_BY: {
      zh: '排列方式: ',
      en: 'Arrange By: '
    },
    COLUMNS_PER_ROW: {
      zh: '每行列数: ',
      en: 'Columns per Row: '
    },
    ROWS_PER_COLUMN: {
      zh: '每列行数: ',
      en: 'Rows per Column: '
    },
    OFFSET_SPACING: {
      zh: '偏移间距: ',
      en: 'Offset Spacing: '
    },
    HORIZ_SPACING: {
      zh: '水平偏距: ',
      en: 'Horizontal Spacing: '
    },
    VERTICAL_SPACING: {
      zh: '垂直偏距: ',
      en: 'Vertical Spacing: '
    },
    CSS_EXPORT_OPTIONS: {
      zh: 'CSS样式生成规则',
      en: 'CSS Export Options'
    },
    CSS_FORMAT: {
      zh: 'CSS格式: ',
      en: 'CSS Format: '
    },
    INC_WIDTH_HEIGHT: {
      zh: '包括宽度和高度',
      en: 'Include Width and Height'
    },
    INC_WIDTH_HEIGHT_TIP: {
      zh: '输出的CSS样式中将包括宽度和高度属性值.',
      en: 'Provides the width and height of each sprite in the CSS.'
    },
    INC_BGI: {
      zh: '包括背景图片',
      en: 'Include Background Image'
    },
    INC_BGI_TIP: {
      zh: '输出的CSS样式中将包括背景图片属性值.',
      en: 'Provides background image of each sprite in the CSS.'
    },
    SELECTOR_PREFIX: {
      zh: '选择器前缀: ',
      en: 'Selector Prefix: '
    },
    SELECTOR_PREFIX_TIP: {
      zh: '',
      en: 'CSS to insert before the class name.'
    },
    CLASS_PREFIX: {
      zh: '类名(class)前缀: ',
      en: 'Class Prefix: '
    },
    CLASS_PREFIX_TIP: {
      zh: "不能以数字开头",
      en: "can't begin with number."
    },
    SELECTOR_SUFFIX: {
      zh: '选择器后缀: ',
      en: 'Selector Suffix: '
    },
    SELECTOR_SUFFIX_TIP: {
      zh: '',
      en: 'CSS to insert after the class name.'
    },
    BUILD: {
      zh: '生成',
      en: 'Build'
    },
    CANCEL: {
      zh: '取消',
      en: 'Cancel'
    },
    IMPORT: {
      zh: '导入设定...',
      en: 'Import...'
    },
    EXPORT: {
      zh: '导出设定...',
      en: 'Export...'
    },
    PREVIEW: {
      zh: '预览',
      en: 'Preview'
    },
    INPUT_RANGE_1_50: {
      zh: '数字输入范围: 1-50',
      en: 'range: 1-50'
    },
    INPUT_RANGE_0_200: {
      zh: '数字输入范围: 0-200',
      en: 'range: 0-200'
    },
    CHAR_RANGE_0_20: {
      zh: '(字符输入范围: 0-20)',
      en: '(characters: 0-20)'
    },
    TOTAL: {
      zh: '总计',
      en: 'Total'
    },
    SELECTED: {
      zh: '选中',
      en: 'Selected'
    },
    IMAGES: {
      zh: '图片',
      en: 'Images'
    },
    PIXELS: {
      zh: '像素',
      en: 'px'
    },
    EMPTY: {
      zh: '',
      en: ''
    }
  },

  'MSG': {
    SOURCE_IMAGES_REQUIRED: {
      zh: '图片来源不能为空。',
      en: 'Source images can not be empty.'
    },
    OUTPUT_FOLDER_REQUIRED: {
      zh: '输出目录不能为空。',
      en: 'Output folder can not be empty.'
    },
    OUTPUT_FOLDER_INVALID: {
      zh: '请指定存在的输出目录',
      en: 'Please specify a valid output folder.'
    },
    ROW_NUMS_REQUIRED: {
      zh: '${target}不能为空。',
      en: '${target} can not be empty.'
    },
    ROW_NUMS_POS_NUM: {
      zh: '${target}需输入正整数值。',
      en: '${target} should accept a positive whole number value.'
    },
    ROW_NUMS_RANGE: {
      zh: '${target}可输入的数值范围为${0}-${1}。',
      en: '${target} need a number value between ${0} and ${1}.'
    },
    HORIZ_SPACING_REQUIRED: {
      zh: '水平偏距不能为空。',
      en: 'Horizontal Spacing can not be empty.'
    },
    HORIZ_SPACING_POS_NUM: {
      zh: '水平偏距需输入正整数值。',
      en: 'Horizontal Spacing should accept a positive whole number value.'
    },
    HORIZ_SPACING_RANGE: {
      zh: '水平偏距可输入的数值范围为${0}-${1}。',
      en: 'Horizontal Spacing need a number value between ${0} and ${1}.'
    },
    VERTICAL_SPACING_REQUIRED: {
      zh: '垂直偏距不能为空。',
      en: 'Vertical Spacing can not be empty.'
    },
    VERTICAL_SPACING_POS_NUM: {
      zh: '垂直偏距需输入正整数值。',
      en: 'Vertical Spacing should accept a positive whole number value.'
    },
    VERTICAL_SPACING_RANGE: {
      zh: '垂直偏距可输入的数值范围为${0}-${1}。',
      en: 'Vertical Spacing need a number value between ${0} and ${1}.'
    },
    OFFSET_SPACING_REQUIRED: {
      zh: '偏移间距不能为空。',
      en: 'Offset Spacing can not be empty.'
    },
    OFFSET_SPACING_POS_NUM: {
      zh: '偏移间距需输入正整数值。',
      en: 'Offset Spacing should accept a positive whole number value.'
    },
    OFFSET_SPACING_RANGE: {
      zh: '偏移间距可输入的数值范围为${0}-${1}。',
      en: 'Offset Spacing need a number value between ${0} and ${1}.'
    },
    SELECTOR_PREFIX_MAX_LENGTH: {
      zh: '选择器前缀不能超过${0}个字。',
      en: 'Selector prefix input SHALL not more than ${0} charaters.'
    },
    CLASS_PREFIX_LETTER_FIRST: {
      zh: '选择器前缀应使用字母开头。',
      en: 'Class prefix SHALL start with a letter.'
    },
    CLASS_PREFIX_MAX_LENGTH: {
      zh: '类名(class)前缀不能超过${0}个字。',
      en: 'Class prefix input SHALL not more than ${0} charaters.'
    },
    SELECTOR_SUFFIX_MAX_LENGTH: {
      zh: '选择器后缀不能超过${0}个字。',
      en: 'Selector suffix input SHALL not more than ${0} charaters.'
    },
    COLUMNS_PER_ROW: {
      zh: '每行列数',
      en: 'Columns per Row '
    },
    ROWS_PER_COLUMN: {
      zh: '每列行数',
      en: 'Rows per Column'
    },
    CONFIRM_REMOVE_ALL: {
      zh: '是否清除列表中的所有图片或分隔符？',
      en: 'Do you really want to ERASE all the item(s) in the list?'
    },
    CONFIRM_REMOVE: {
      zh: '是否清除列表中选中的图片或分隔符？',
      en: 'Do you really want to ERASE the selected item(s) in the list?'
    }
  }
};

module.exports = _.extend(nls, {
  'ERR': {
    CHK_CLOSE_DOC: {
      zh: util.vsub('要${0}, 请先勾选 [${1}] 复选框。', [
        util.localize(nls.UI.CLOSE_GEN_DOC),
        util.localize(nls.UI.EXPORT_SPRITE_IMAGE)
      ]),
      en: 'You can only have Close Generated Document checked if you choose to Export Sprite Image.'
    },
    CHK_OPEN_OUT_DIR: {
      zh: util.vsub('文档生成后要${0}, 请至少先勾选 [${1}] 或 [${2}] 复选框。', [
        util.localize(nls.UI.OPEN_OUTPUT_FOLDER),
        util.localize(nls.UI.EXPORT_SPRITE_IMAGE),
        util.localize(nls.UI.EXPORT_CSS_FILE)
      ]),
      en: 'It\'s only make sense to Open Output Folder if at least Export Sprite Image or Export CSS File enabled.'
    },
    CHK_INCLUDE_BGI: {
      zh: util.vsub('要${0}, 请先勾选 [${1}] 复选框。', [
        util.localize(nls.UI.INC_BGI),
        util.localize(nls.UI.EXPORT_SPRITE_IMAGE)
      ]),
      en: 'It\'s only make sense to Include Background Image if you choose to Export Sprite Image.'
    },
    NO_IMAGES: {
      zh: '抱歉！由于您未添加任务图片，操作取消。',
      en: 'Abort building because there is no image specified.'
    },
    UNKNOWN_IMAGES: {
      zh: '抱歉！由于某些图片不能被Photoshop所识别和打开，操作取消。',
      en: 'Abort building because there are some images cannot be identified and opened by Photoshop!'
    },
    UNKNOWN_ERROR: {
      zh: '未知错误，操作取消。',
      en: 'Abort operation due to unknown error!'
    },
    DEST_ACCESS_DENIED: {
      zh: '目标文件访问受限，操作取消。',
      en: 'Abort operation due to destination folder access denied!'
    }
  }
});
