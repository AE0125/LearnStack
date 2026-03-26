"use client"

import React, { useMemo, useState, useCallback } from 'react'
import { createEditor, Descendant, Editor, Element as SlateElement, Transforms } from 'slate'
import { Slate, Editable, withReact, useSlate, RenderElementProps, RenderLeafProps } from 'slate-react'
import { withHistory } from 'slate-history'
import { Bold, Italic, Heading1, Heading2, List } from 'lucide-react'
import { serializeMarkdown, deserializeMarkdown } from '@/lib/markdown'
import { Button } from '@/components/ui/button'

type RichTextEditorProps = {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  
  const [initialValue] = useState<Descendant[]>(
    deserializeMarkdown(value || '')
  )

  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])

  const handleChange = (val: Descendant[]) => {
    const isAstChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if (isAstChange) {
      const md = serializeMarkdown(val)
      onChange(md)
    }
  }

  return (
    <div className="border rounded-md overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <Slate 
        editor={editor} 
        initialValue={initialValue}
        onChange={handleChange}
      >
        <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-1 flex gap-1 items-center">
          <MarkButton format="bold" icon={<Bold className="w-4 h-4" />} />
          <MarkButton format="italic" icon={<Italic className="w-4 h-4" />} />
          <div className="w-px h-4 bg-slate-300 mx-1"></div>
          <BlockButton format="heading-one" icon={<Heading1 className="w-4 h-4" />} />
          <BlockButton format="heading-two" icon={<Heading2 className="w-4 h-4" />} />
          <div className="w-px h-4 bg-slate-300 mx-1"></div>
          <BlockButton format="bulleted-list" icon={<List className="w-4 h-4" />} />
        </div>
        <div className="p-4 min-h-[250px] cursor-text">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Kursbeschreibung eingeben..."
            spellCheck
            className="focus:outline-hidden prose dark:prose-invert max-w-none"
          />
        </div>
      </Slate>
    </div>
  )
}

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format)
  const isList = format === 'bulleted-list'

  Transforms.unwrapNodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as { type?: string }).type === 'bulleted-list',
    split: true,
  })

  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  } as Partial<SlateElement>

  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block as SlateElement)
  }
}

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as { type?: string }).type === format,
    })
  )
  return !!match
}

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as Record<string, boolean> | null
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch ((element as { type?: string }).type) {
    case 'heading-one':
      return <h1 {...attributes} className="text-3xl font-bold mt-4 mb-2">{children}</h1>
    case 'heading-two':
      return <h2 {...attributes} className="text-2xl font-bold mt-3 mb-2">{children}</h2>
    case 'bulleted-list':
      return <ul {...attributes} className="list-disc pl-5 my-2 space-y-1">{children}</ul>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    default:
      return <p {...attributes} className="mb-2 min-h-[24px]">{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const customLeaf = leaf as { bold?: boolean; italic?: boolean }
  if (customLeaf.bold) children = <strong>{children}</strong>
  if (customLeaf.italic) children = <em>{children}</em>
  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }: { format: string; icon: React.ReactNode }) => {
  const editor = useSlate()
  const isActive = isBlockActive(editor, format)
  
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${isActive ? 'bg-slate-200 dark:bg-slate-800' : ''}`}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}

const MarkButton = ({ format, icon }: { format: string; icon: React.ReactNode }) => {
  const editor = useSlate()
  const isActive = isMarkActive(editor, format)
  
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${isActive ? 'bg-slate-200 dark:bg-slate-800' : ''}`}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}
