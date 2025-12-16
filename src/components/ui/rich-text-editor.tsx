import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import './rich-text-editor.css'; // Importa estilos CSS globais

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  darkMode?: boolean;
}

export const RichTextEditor = ({
  content,
  onChange,
  placeholder = 'Escreva aqui...',
  className,
  darkMode = false,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-lg max-w-none min-h-[300px] px-4 py-3 focus:outline-none',
          darkMode
            ? `prose-invert text-white
               prose-headings:text-white prose-headings:font-extrabold prose-headings:mb-4 prose-headings:mt-6 prose-headings:tracking-tight
               prose-h1:text-4xl prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-3
               prose-h2:text-3xl
               prose-h3:text-2xl prose-h3:text-[#3B4BA8]
               prose-p:text-white prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
               prose-li:text-white prose-li:my-2 prose-li:text-base
               prose-strong:text-white prose-strong:font-extrabold
               prose-em:text-white prose-em:italic
               prose-s:line-through prose-s:opacity-70
               prose-code:text-[#3B4BA8] prose-code:bg-[#0D1528] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
               prose-a:text-[#3B4BA8] prose-a:underline prose-a:cursor-pointer hover:prose-a:text-[#4C5EBF] prose-a:font-medium
               prose-blockquote:border-l-4 prose-blockquote:border-[#3B4BA8] prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-gray-300 prose-blockquote:bg-[#0D1528]/50 prose-blockquote:rounded-r-lg
               prose-ul:list-disc prose-ul:pl-8 prose-ul:my-4 prose-ul:space-y-2
               prose-ol:list-decimal prose-ol:pl-8 prose-ol:my-4 prose-ol:space-y-2
               prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-6 prose-img:border prose-img:border-white/10`
            : `text-gray-900
               prose-headings:font-extrabold prose-headings:mb-4 prose-headings:mt-6 prose-headings:tracking-tight
               prose-h1:text-4xl prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-3
               prose-h2:text-3xl
               prose-h3:text-2xl prose-h3:text-blue-600
               prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
               prose-li:my-2 prose-li:text-base
               prose-strong:font-extrabold
               prose-s:line-through prose-s:opacity-70
               prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
               prose-a:text-blue-600 prose-a:underline prose-a:cursor-pointer hover:prose-a:text-blue-700 prose-a:font-medium
               prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg
               prose-ul:list-disc prose-ul:pl-8 prose-ul:my-4 prose-ul:space-y-2
               prose-ol:list-decimal prose-ol:pl-8 prose-ol:my-4 prose-ol:space-y-2
               prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-6 prose-img:border prose-img:border-gray-200`
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('URL da imagem');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const MenuButton = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        'h-8 w-8 p-0',
        active
          ? darkMode
            ? 'bg-[#3B4BA8] text-white'
            : 'bg-slate-200 text-slate-900'
          : darkMode
          ? 'text-gray-400 hover:text-white hover:bg-[#0D1528]'
          : 'text-slate-600 hover:text-slate-900'
      )}
      title={title}
    >
      {children}
    </Button>
  );

  return (
    <div
      className={cn(
        'rounded-xl border overflow-hidden',
        darkMode
          ? 'bg-[#0B1220] border-[rgba(255,255,255,0.05)]'
          : 'bg-white border-gray-200',
        className
      )}
    >
      {/* Toolbar */}
      <div
        className={cn(
          'flex flex-wrap gap-1 p-2 border-b',
          darkMode ? 'border-[rgba(255,255,255,0.05)]' : 'border-gray-200'
        )}
      >
        {/* Text Formatting */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Negrito (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Itálico (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Sublinhado (Ctrl+U)"
        >
          <UnderlineIcon className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="Tachado"
        >
          <Strikethrough className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
          title="Código"
        >
          <Code className="h-4 w-4" />
        </MenuButton>

        <div className={cn('w-px h-6 mx-1', darkMode ? 'bg-[rgba(255,255,255,0.05)]' : 'bg-gray-200')} />

        {/* Headings */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          title="Título 1"
        >
          <Heading1 className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="Título 2"
        >
          <Heading2 className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="Título 3"
        >
          <Heading3 className="h-4 w-4" />
        </MenuButton>

        <div className={cn('w-px h-6 mx-1', darkMode ? 'bg-[rgba(255,255,255,0.05)]' : 'bg-gray-200')} />

        {/* Lists */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Lista com marcadores"
        >
          <List className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Lista numerada"
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Citação"
        >
          <Quote className="h-4 w-4" />
        </MenuButton>

        <div className={cn('w-px h-6 mx-1', darkMode ? 'bg-[rgba(255,255,255,0.05)]' : 'bg-gray-200')} />

        {/* Alignment */}
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          title="Alinhar à esquerda"
        >
          <AlignLeft className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          title="Centralizar"
        >
          <AlignCenter className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          title="Alinhar à direita"
        >
          <AlignRight className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          active={editor.isActive({ textAlign: 'justify' })}
          title="Justificar"
        >
          <AlignJustify className="h-4 w-4" />
        </MenuButton>

        <div className={cn('w-px h-6 mx-1', darkMode ? 'bg-[rgba(255,255,255,0.05)]' : 'bg-gray-200')} />

        {/* Links & Images */}
        <MenuButton onClick={setLink} active={editor.isActive('link')} title="Inserir link">
          <Link2 className="h-4 w-4" />
        </MenuButton>

        <MenuButton onClick={addImage} title="Inserir imagem">
          <ImageIcon className="h-4 w-4" />
        </MenuButton>

        <div className={cn('w-px h-6 mx-1', darkMode ? 'bg-[rgba(255,255,255,0.05)]' : 'bg-gray-200')} />

        {/* Undo/Redo */}
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Desfazer (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Refazer (Ctrl+Shift+Z)"
        >
          <Redo className="h-4 w-4" />
        </MenuButton>
      </div>

      {/* Editor Content */}
      <div
        className={cn(
          'overflow-auto',
          darkMode ? 'bg-[#0D1528]' : 'bg-white'
        )}
      >
        <EditorContent editor={editor} />
        {editor.isEmpty && (
          <p
            className={cn(
              'absolute top-14 left-4 pointer-events-none',
              darkMode ? 'text-gray-500' : 'text-gray-400'
            )}
          >
            {placeholder}
          </p>
        )}
      </div>
    </div>
  );
};
