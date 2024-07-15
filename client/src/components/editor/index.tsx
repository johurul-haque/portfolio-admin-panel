import { EditorContent, EditorRoot, JSONContent } from 'novel';
import { StarterKit, handleCommandNavigation } from 'novel/extensions';
import './prosemirror.css';

export function Editor({
  value,
  disabled,
  onChange,
}: {
  value: JSONContent;
  disabled: boolean;
  onChange: (...event: unknown[]) => void;
}) {
  return (
    <EditorRoot>
      <EditorContent
        extensions={[StarterKit]}
        initialContent={value}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
        editable={!disabled}
        onUpdate={({ editor }) => {
          onChange(editor.getJSON());
        }}
      />
    </EditorRoot>
  );
}
