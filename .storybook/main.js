module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  /*
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    optimizeDeps: { ...viteConfig.optimizeDeps },
    define: {
      ...viteConfig.define,
      global: {},
    },
  }),
  // */
}
