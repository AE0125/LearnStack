import { Descendant } from 'slate';

export const deserializeMarkdown = (markdown: string): Descendant[] => {
  if (!markdown) {
    return [{ type: 'paragraph', children: [{ text: '' }] } as unknown as Descendant];
  }
  const lines = markdown.split('\n');
  const items: Descendant[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Quick parse for strong formatting at beginning of line or simple strings
    // A fully compliant parsing would need remark, this is a basic stub as required
    
    // In a real scenario, you'd regex replace bold tokens into separate text leaf objects.
    // For simplicity we just return raw text or blocks here.
    
    if (line.startsWith('# ')) {
      items.push({ type: 'heading-one', children: [{ text: line.slice(2) }] } as unknown as Descendant);
    } else if (line.startsWith('## ')) {
      items.push({ type: 'heading-two', children: [{ text: line.slice(3) }] } as unknown as Descendant);
    } else if (line.startsWith('- ')) {
      items.push({ type: 'list-item', children: [{ text: line.slice(2) }] } as unknown as Descendant);
    } else if (line.trim() !== '') {
      items.push({ type: 'paragraph', children: [{ text: line }] } as unknown as Descendant);
    } else {
      items.push({ type: 'paragraph', children: [{ text: '' }] } as unknown as Descendant);
    }
  }

  // Wrap lists
  const result: Descendant[] = [];
  let currentList: Descendant[] | null = null;
  
  items.forEach(item => {
    if ((item as { type?: string }).type === 'list-item') {
      if (!currentList) {
        currentList = [];
        result.push({ type: 'bulleted-list', children: currentList } as unknown as Descendant);
      }
      currentList.push(item);
    } else {
      currentList = null;
      result.push(item);
    }
  });

  return result.length > 0 ? result : [{ type: 'paragraph', children: [{ text: '' }] } as unknown as Descendant];
}

export const serializeMarkdown = (nodes: Descendant[]): string => {
  return nodes.map(n => serializeNode(n)).join('\n');
}

const serializeNode = (node: Descendant): string => {
  if ('text' in node) {
    const textNode = node as { text: string; bold?: boolean; italic?: boolean };
    let string = textNode.text;
    if (textNode.bold) {
      string = `**${string}**`;
    }
    if (textNode.italic) {
      string = `*${string}*`;
    }
    return string;
  }
  
  const elementNode = node as { children: Descendant[], type?: string };
  const children = elementNode.children.map((n: Descendant) => serializeNode(n)).join('');
  
  switch (elementNode.type) {
    case 'heading-one':
      return `# ${children}\n`;
    case 'heading-two':
      return `## ${children}\n`;
    case 'bulleted-list':
      return `${children}\n`;
    case 'list-item':
      return `- ${children}`;
    case 'paragraph':
      return `${children}\n`;
    default:
      return children;
  }
}
