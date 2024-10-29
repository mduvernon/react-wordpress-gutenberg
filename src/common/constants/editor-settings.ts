//Ref: https://github.com/WordPress/gutenberg/blob/trunk/packages/editor/src/store/defaults.js

/**
 * WordPress dependencies
 */
import { SETTINGS_DEFAULTS } from "@wordpress/block-editor";

const EDITOR_SETTINGS = {
  ...SETTINGS_DEFAULTS,
  __experimentalFeatures: {
    layout: {
      contentSize: "650px",
      wideSize: "1000px"
    }
  }
};

export { EDITOR_SETTINGS };
