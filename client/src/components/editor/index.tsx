import { EditorContent, EditorRoot, JSONContent } from 'novel';
import { StarterKit, handleCommandNavigation } from 'novel/extensions';
import './prosemirror.css';

export function Editor({
  value,
  disabled,
  onChange,
  setContentInMd,
}: {
  value: JSONContent;
  disabled: boolean;
  onChange: (...event: unknown[]) => void;
  setContentInMd?: React.Dispatch<React.SetStateAction<string>>;
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
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full border rounded-md border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950`,
          },
        }}
        editable={!disabled}
        onUpdate={({ editor }) => {
          onChange(editor.getJSON());
          setContentInMd && setContentInMd(editor.getText());
        }}
      />
    </EditorRoot>
  );
}
