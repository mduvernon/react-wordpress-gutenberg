import { FC, useEffect } from "react";
import { serialize, parse } from '@wordpress/blocks';
import {
    BlockEditorProvider,
    BlockInspector,
    BlockCanvas,
} from "@wordpress/block-editor";
import { BlockInstance } from "@wordpress/blocks";
import { Button } from '@wordpress/components';
import { Popover } from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";
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
import { EDITOR_SETTINGS } from "../../common/constants/editor-settings";
import { editorStyles } from "../../common/constants/editor-styles";
// Styles
import "./styles.scss";

type OwnProps = {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
};

const WordpressGutembergEditor: FC<OwnProps> = ({
    className = "",
    value: inputValue,
    onChange,
}) => {

    const { value, setValue, hasUndo, hasRedo, undo, redo } = useStateWithHistory({ blocks: [] });

    useEffect(() => {
        registerCoreBlocks();
    }, []);

    useEffect(() => {
        if (inputValue?.length > 0) {
            setValue({ blocks: parse(inputValue) }, false);
        }
    }, [inputValue]);

    const _handleEditorInput = (blocks: BlockInstance[]) => {
        setValue({ blocks }, false);
    };

    const _handleEditorChange = (blocks: BlockInstance[]) => {
        setValue({ blocks }, true);

        const newValue = serialize(blocks);

        if (newValue !== inputValue && typeof onChange === "function") {
            onChange(newValue);
        }
    }

    return (
        <div className={`react-wordpress-gutemberg playground ${className}`}>
            <div className="interface-interface-skeleton__body">
                <BlockEditorProvider
                    settings={EDITOR_SETTINGS}
                    value={(value as any).blocks}
                    onChange={_handleEditorChange}
                    onInput={_handleEditorInput}
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

export default WordpressGutembergEditor;

export { WordpressGutembergEditor };