import { Template } from 'tinacms';

// FigmaSync component template - simplified for better compatibility
export const figmaSyncTemplate: Template = {
  name: 'FigmaSync',
  label: 'Figma Sync',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Section Title',
      description: 'Optional title to display above the Figma sync component'
    },
    {
      type: 'string',
      name: 'description',
      label: 'Description',
      description: 'Optional description or instructions'
    },
    {
      type: 'boolean',
      name: 'showInstructions',
      label: 'Show Instructions',
      description: 'Display the "How to use" instructions card'
    }
  ]
};

// Live Example component template
export const liveExampleTemplate: Template = {
  name: 'LiveExample',
  label: 'Live Example',
  ui: {
    itemProps: (item) => ({
      label: item.title || 'Live Example'
    })
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Example Title',
      required: true
    },
    {
      type: 'string',
      name: 'description',
      label: 'Description'
    },
    {
      type: 'string',
      name: 'code',
      label: 'Code Example',
      ui: {
        component: 'textarea'
      }
    },
    {
      type: 'string',
      name: 'language',
      label: 'Language',
      options: ['tsx', 'jsx', 'typescript', 'javascript', 'html', 'css']
    },
    {
      type: 'boolean',
      name: 'showPreview',
      label: 'Show Live Preview'
    }
  ]
};

// Component Preview template
export const componentPreviewTemplate: Template = {
  name: 'ComponentPreview',
  label: 'Component Preview',
  ui: {
    itemProps: (item) => ({
      label: `${item.componentName || 'Component'} Preview`
    })
  },
  fields: [
    {
      type: 'string',
      name: 'componentName',
      label: 'Component Name',
      required: true,
      description: 'Name of the component to preview (must exist in your component library)'
    },
    {
      type: 'object',
      name: 'props',
      label: 'Component Props',
      fields: [
        {
          type: 'string',
          name: 'variant',
          label: 'Variant'
        },
        {
          type: 'string',
          name: 'size',
          label: 'Size'
        },
        {
          type: 'string',
          name: 'children',
          label: 'Children/Content'
        },
        {
          type: 'boolean',
          name: 'disabled',
          label: 'Disabled'
        }
      ]
    },
    {
      type: 'string',
      name: 'title',
      label: 'Preview Title'
    },
    {
      type: 'string',
      name: 'description',
      label: 'Preview Description'
    }
  ]
};

// Simple callout template for testing
export const calloutTemplate: Template = {
  name: 'Callout',
  label: 'Callout',
  fields: [
    {
      type: 'string',
      name: 'type',
      label: 'Type',
      options: ['info', 'warning', 'error', 'success']
    },
    {
      type: 'string',
      name: 'title',
      label: 'Title'
    },
    {
      type: 'string',
      name: 'content',
      label: 'Content',
      ui: {
        component: 'textarea'
      }
    }
  ]
};

// Export simplified templates for testing
export const richTextTemplates = [
  figmaSyncTemplate,
  liveExampleTemplate,
  componentPreviewTemplate,
  calloutTemplate
]; 