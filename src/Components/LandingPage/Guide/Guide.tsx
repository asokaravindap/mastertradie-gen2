import { Flex, View, Text, useTheme, Button, Icon } from '@aws-amplify/ui-react';
import { BiLogoYoutube } from 'react-icons/bi';
import Video from './Video';

function Guide() {
  const { tokens } = useTheme();

  const handleNavigate = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Flex direction="row" justifyContent="center" alignItems="center" gap={10}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Flex direction="column" gap={10}>
          <Text fontWeight={tokens.fontWeights.primary} fontSize={tokens.fontSizes.landingPageSecondary}>
            Video Tutorials
          </Text>
          <Text fontWeight={tokens.fontWeights.primary} fontSize={tokens.fontSizes.landingPagePrimary}>
            We provide simple yet comprehensive tutorial pack available to you to get familiarized with MasterTradie.
          </Text>
          <Text fontWeight={tokens.fontWeights.primary} fontSize={tokens.fontSizes.landingPagePrimary}>
            Subscribe to our YouTube channel and stay upto date with the tutorials.
          </Text>
          <Text
            alignSelf="center"
            fontWeight={tokens.fontWeights.highlighted}
            fontSize={tokens.fontSizes.landingPagePrimary}
          >
            <Button
              backgroundColor={tokens.colors.secondary[1]}
              fontWeight={tokens.fontWeights.primary}
              borderRadius="20px"
              gap="0.5rem"
              onClick={() => handleNavigate('https://www.youtube.com/channel/UCc4K7bAqpdBP8jh1j9XZAww')}
              style={{ width: '300px', height: '40px' }}
            >
              <Text
                color={tokens.colors.font.onImage}
                fontWeight={tokens.fontWeights.highlighted}
                fontSize={tokens.fontSizes.landingPageSmallest}
              >
                MasterTradie YouTube
              </Text>
              <Icon
                color={tokens.colors.neutral[1]}
                alignSelf="center"
                ariaLabel="Home"
                as={BiLogoYoutube}
                style={{ fontSize: '2rem' }}
              />
            </Button>
          </Text>
        </Flex>
      </View>
      <View display={{ base: 'none', large: 'block' }}>
        <Video />
      </View>
    </Flex>
  );
}

export default Guide;
