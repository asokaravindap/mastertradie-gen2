import { Flex, View, useTheme, Text, Icon } from '@aws-amplify/ui-react';
import { GoHomeFill } from 'react-icons/go';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { RiVideoFill } from 'react-icons/ri';
import { BiSolidLogInCircle } from 'react-icons/bi';
import { IconType } from 'react-icons/lib';

function LandingPageHeader() {
  const { tokens } = useTheme();

  return (
    <Flex
      backgroundColor={tokens.colors.white}
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      width="100%"
      position="fixed"
      style={{ boxShadow: '0px 0px 8px rgba(77, 38, 0, 0.8)' }}
    >
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
        height="4.5rem"
      >
        <Text
          marginLeft="8rem"
          color={tokens.colors.secondary[1]}
          fontWeight={tokens.fontWeights.exclaim}
          fontSize={tokens.fontSizes.landingPageHeaderPrimary}
        >
          MasterTradie
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <HeaderItem icon={GoHomeFill} itemText="Home" />
        <HeaderItem icon={RiVideoFill} itemText="Guide" />
        <HeaderItem icon={RiMoneyDollarCircleFill} itemText="Pricing" />
        <HeaderItem icon={BiSolidLogInCircle} itemText="Login" baseDisplay="block" baseWidth="5rem" />
      </View>
    </Flex>
  );
}

interface HeaderItemProps {
  icon: IconType;
  itemText: string;
  baseDisplay?: string;
  baseWidth?: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({ icon, itemText, baseDisplay = 'none', baseWidth = '3rem' }) => {
  const { tokens } = useTheme();
  return (
    <View
      height="4.5rem"
      width={{ base: baseWidth, large: '8rem' }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Flex direction="row" gap={tokens.space.landingPageHeaderItemIconGap}>
        <Icon
          color={tokens.colors.black}
          alignSelf="center"
          ariaLabel="Home"
          as={icon}
          style={{ fontSize: '1.2rem' }}
        />
        <Text
          fontWeight={tokens.fontWeights.highlighted}
          fontSize={tokens.fontSizes.landingPageHeaderSecondary}
          display={{ base: baseDisplay, large: 'block' }}
        >
          {itemText}
        </Text>
      </Flex>
    </View>
  );
};
export default LandingPageHeader;
