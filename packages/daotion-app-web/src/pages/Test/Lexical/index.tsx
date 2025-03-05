export const LexicalEditorTest = reaxper(() => {
	
	
	return (
		<LexicalComposer 
			initialConfig = { initialConfig }
		>
			<PlainTextPlugin
				contentEditable = { <ContentEditable /> }
				placeholder = { <div>Enter some text...</div> }
				ErrorBoundary = { LexicalErrorBoundary }
			/>
			<RichTextPlugin
				contentEditable = { <ContentEditable /> }
				placeholder = { <div>Enter some text...</div> }
				ErrorBoundary = { LexicalErrorBoundary }
			/>
			<OnChangePlugin
				onChange = { (editorState , editor) => {
					editorState.read(() => {
						// Read the contents of the EditorState here.
						const root = $getRoot();
						const selection = $getSelection();
						
						console.log(root , selection);
					});
				} }
			/>
			<HistoryPlugin />
		</LexicalComposer>
	);
});

const initialConfig = {
	namespace : 'MyEditor' ,
	theme : {} ,
	onError(error){
		console.error(error);
	} ,
};

const reaxel = function(){
	return () => {
		return {};
	};
}();


import {
	$getRoot ,
	$getSelection ,
	createEditor,
} from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
