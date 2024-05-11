import { Theme } from '@aws-amplify/ui-react';

export const appTheme: Theme = {
  name: 'app-theme',
  tokens: {
    colors: {
      font: {
        primary: { value: 'black' },
        onImage: { value: 'white' }
      },
      primary: { 1: { value: '{colors.orange.10}' } },
      secondary: { 1: { value: '{colors.orange.100}' } },
      neutral: { 1: { value: '{colors.orange.10}' } }
    },
    fontWeights: {
      primary: { value: 100 },
      highlighted: { value: 200 },
      exclaim: { value: 500 }
    },
    fontSizes: {
      landingPageHeaderPrimary: { value: '2rem' },
      landingPageHeaderSecondary: { value: '1.1rem' },
      landingPagePrimary: { value: '1.5rem' },
      landingPageSecondary: { value: '2.5rem' },
      landingPageSmallest: { base: '1rem', sm: '1rem', md: '1rem', lg: '1.2rem', xl: '1.2rem' },
      landingPageLargest: { base: '2.5rem', large: '3.5rem' }
    },
    space: {
      landingPageGridGap: { value: '2rem' },
      landingPageHeaderItemIconGap: { value: '0.5rem' }
    }
  }
};
