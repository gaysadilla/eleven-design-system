import { Template } from 'tinacms';

// Rich Text Block
export const richTextBlock: Template = {
  name: 'RichTextBlock',
  label: 'Rich Text',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Section Title (Optional)',
    },
    {
      type: 'rich-text',
      name: 'content',
      label: 'Content',
      description: 'Rich text content with formatting',
    },
  ],
};

// Figma Sync Block
export const figmaSyncBlock: Template = {
  name: 'FigmaSyncBlock',
  label: 'Figma Sync',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Section Title',
      description: 'Title for this Figma sync section',
    },
    {
      type: 'string',
      name: 'description',
      label: 'Description',
      description: 'Optional description or instructions',
    },
    {
      type: 'string',
      name: 'figmaUrl',
      label: 'Figma URL',
      description: 'Direct link to Figma file or component',
    },
    {
      type: 'string',
      name: 'componentName',
      label: 'Component Name',
      description: 'Name of the component in Figma (optional)',
    },
    {
      type: 'boolean',
      name: 'showInstructions',
      label: 'Show Instructions',
      description: 'Display the "How to use" instructions card when no URL is provided',
    },
  ],
};

// Live Example Block
export const liveExampleBlock: Template = {
  name: 'LiveExampleBlock',
  label: 'Live Example',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Example Title',
    },
    {
      type: 'string',
      name: 'description',
      label: 'Description',
      description: 'Brief description of this example',
    },
    {
      type: 'string',
      name: 'code',
      label: 'Code Example',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      name: 'language',
      label: 'Code Language',
      options: ['tsx', 'jsx', 'typescript', 'javascript', 'html', 'css'],
    },
    {
      type: 'boolean',
      name: 'showPreview',
      label: 'Show Live Preview',
      description: 'Render a live preview of the component',
    },
    {
      type: 'boolean',
      name: 'copyable',
      label: 'Enable Copy Button',
      description: 'Show copy to clipboard button',
    },
  ],
};

// Component API Block
export const componentApiBlock: Template = {
  name: 'ComponentApiBlock',
  label: 'Component API',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Section Title',
    },
    {
      type: 'object',
      name: 'properties',
      label: 'Properties',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Property Name',
        },
        {
          type: 'string',
          name: 'type',
          label: 'Type',
        },
        {
          type: 'string',
          name: 'default',
          label: 'Default Value',
        },
        {
          type: 'string',
          name: 'description',
          label: 'Description',
        },
        {
          type: 'boolean',
          name: 'required',
          label: 'Required',
        },
      ],
    },
  ],
};

// Design Specs Block
export const designSpecsBlock: Template = {
  name: 'DesignSpecsBlock',
  label: 'Design Specifications',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Section Title',
    },
    {
      type: 'object',
      name: 'measurements',
      label: 'Measurements',
      fields: [
        {
          type: 'string',
          name: 'minHeight',
          label: 'Minimum Height',
        },
        {
          type: 'string',
          name: 'padding',
          label: 'Padding',
        },
        {
          type: 'string',
          name: 'margin',
          label: 'Margin',
        },
        {
          type: 'string',
          name: 'borderRadius',
          label: 'Border Radius',
        },
      ],
    },
    {
      type: 'object',
      name: 'tokens',
      label: 'Design Tokens',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Token Name',
        },
        {
          type: 'string',
          name: 'value',
          label: 'Value',
        },
        {
          type: 'string',
          name: 'description',
          label: 'Description',
        },
      ],
    },
  ],
};

// Guidelines Block
export const guidelinesBlock: Template = {
  name: 'GuidelinesBlock',
  label: 'Guidelines',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Section Title',
    },
    {
      type: 'object',
      name: 'dos',
      label: "Do's",
      list: true,
      fields: [
        {
          type: 'string',
          name: 'text',
          label: 'Do This',
        },
        {
          type: 'string',
          name: 'example',
          label: 'Example (optional)',
        },
      ],
    },
    {
      type: 'object',
      name: 'donts',
      label: "Don'ts",
      list: true,
      fields: [
        {
          type: 'string',
          name: 'text',
          label: "Don't Do This",
        },
        {
          type: 'string',
          name: 'example',
          label: 'Example (optional)',
        },
      ],
    },
  ],
};

// Callout Block (for important notes, warnings, etc.)
export const calloutBlock: Template = {
  name: 'CalloutBlock',
  label: 'Callout',
  fields: [
    {
      type: 'string',
      name: 'type',
      label: 'Callout Type',
      options: ['info', 'warning', 'error', 'success', 'note'],
    },
    {
      type: 'string',
      name: 'title',
      label: 'Title (Optional)',
    },
    {
      type: 'rich-text',
      name: 'content',
      label: 'Content',
    },
  ],
};

// Export all block templates
export const contentBlocks = [
  richTextBlock,
  figmaSyncBlock,
  liveExampleBlock,
  componentApiBlock,
  designSpecsBlock,
  guidelinesBlock,
  calloutBlock,
]; 