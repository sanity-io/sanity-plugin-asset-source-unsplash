import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { Studio, defineConfig, defineField } from 'sanity'
import { within, userEvent } from '@storybook/testing-library'

import { deskTool } from 'sanity/desk'
import { unsplashAssetSource, unsplashImageAsset } from '..'

const projectId = import.meta.env.STORYBOOK_SANITY_PROJECT_ID
const dataset = import.meta.env.STORYBOOK_SANITY_DATASET

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Studio',
  component: Studio,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    unstable_globalStyles: true,
  },
} as Meta<typeof Studio>

const Template: StoryFn<typeof Studio> = (args) => <Studio {...args} />

export const Default = Template.bind({})
Default.args = {
  config: defineConfig({
    projectId,
    dataset,
    plugins: [deskTool(), unsplashImageAsset()],
    schema: {
      types: [
        {
          title: 'Unsplash image post',
          name: 'unsplashImagePostSimple',
          type: 'document',
          fields: [
            defineField({ title: 'Title', name: 'title', type: 'string' }),
            defineField({
              title: 'Image',
              name: 'image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        },
      ],
    },
  }),
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const collapseMenu = await canvas.findByTestId('tool-collapse-menu')
  const deskButton = await within(collapseMenu).findAllByText('Desk')

  await userEvent.click(deskButton[0])

  const documentList = await canvas.findByTestId('default-preview')
  await userEvent.click(documentList)

  const newDocumentButton = await canvas.findByLabelText('New document…')
  await userEvent.click(newDocumentButton)
}

export const OnlyUnsplash = Template.bind({})
OnlyUnsplash.args = {
  config: defineConfig({
    projectId,
    dataset,
    plugins: [deskTool()],
    form: {
      file: {
        // Necessary due to https://github.com/sanity-io/sanity/blob/f70736f2de07d08bf303d83429b28d44bb451fc9/packages/sanity/src/core/config/prepareConfig.ts#L494
        directUploads: false,
      },
      image: {
        assetSources: () => [unsplashAssetSource],
        directUploads: false,
      },
    },
    schema: {
      types: [
        {
          title: 'Unsplash image post',
          name: 'unsplashImagePostSimple',
          type: 'document',
          fields: [
            defineField({ title: 'Title', name: 'title', type: 'string' }),
            defineField({
              title: 'Image',
              name: 'image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        },
      ],
    },
  }),
}
