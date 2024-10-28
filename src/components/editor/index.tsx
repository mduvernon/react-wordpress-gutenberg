import { FC, useEffect, useState } from "react";
import { serialize, parse } from '@wordpress/blocks';
import {
    BlockEditorProvider,
    BlockInspector,
    BlockToolbar,
    BlockCanvas,
} from "@wordpress/block-editor";
import { BlockInstance } from "@wordpress/blocks";
import { Button } from '@wordpress/components';
import { Popover, SlotFillProvider } from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";
import { ShortcutProvider } from "@wordpress/keyboard-shortcuts";
import { useStateWithHistory } from '@wordpress/compose';
import { undo as undoIcon, redo as redoIcon } from '@wordpress/icons';
import "@wordpress/format-library";

import "@wordpress/components/build-style/style.css";
import "@wordpress/block-editor/build-style/style.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/theme.css";
import "@wordpress/block-library/build-style/editor.css";
import "@wordpress/format-library/build-style/style.css";

/**
 * Internal deps
 */
import EDITOR_SETTINGS from "./editor-settings";
import "./styles.scss";
import { editorStyles } from "./editor-styles";

/**
 * tutorials 
 * @see https://github.com/WordPress/gutenberg/blob/6372ef77e99d4a2c962f031f434e1f0565618776/platform-docs/docs/basic-concepts/data.md
 * 
 * 
 * @returns 
 */
const Editor: FC = () => {

    const { value, setValue, hasUndo, hasRedo, undo, redo } = useStateWithHistory({ blocks: [] });
    const [blocks, updateBlocks] = useState<BlockInstance<{ [k: string]: any; }>[]>([]);

    useEffect(() => {
        registerCoreBlocks();
    }, []);

    return (
        <div className="playground">
            <div className="interface-interface-skeleton__body">
                <BlockEditorProvider
                    settings={EDITOR_SETTINGS}
                    value={value.blocks}
                    selection={value.selection}
                    onInput={(blocks, selection) =>
                        setValue({ blocks, selection }, true)
                    }
                    onChange={(blocks, selection) =>
                        setValue({ blocks, selection }, false)
                    }
                >
                    <div className="playground__content editor-editor-interface interface-interface-skeleton__content">
                        <div className="editor-undo-redo__toolbar">
                            <Button
                                onClick={undo}
                                disabled={!hasUndo}
                                accessibleWhenDisabled
                                icon={undoIcon}
                                label="Undo"
                            />
                            <Button
                                onClick={redo}
                                disabled={!hasRedo}
                                accessibleWhenDisabled
                                icon={redoIcon}
                                label="Redo"
                            />
                        </div>
                        <BlockCanvas height="100%" styles={editorStyles} />
                    </div>

                    <div className="playground__sidebar interface-navigable-region interface-interface-skeleton__sidebar">
                        <BlockInspector />
                    </div>

                    <Popover.Slot />
                </BlockEditorProvider>
            </div>
        </div>
    );
}

export default Editor;

export { Editor };