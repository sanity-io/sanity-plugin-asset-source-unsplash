import { initialize, mswDecorator } from 'msw-storybook-addon'
import { studio } from './layout'

// Initialize MSW
initialize({ onUnhandledRequest: 'bypass' })

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator, studio]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
