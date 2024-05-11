import { Card, Flex, Grid, Icon, Text, useTheme } from '@aws-amplify/ui-react';
import { HiMiniWrenchScrewdriver } from 'react-icons/hi2';

export const FeaturePack = () => {
  const { tokens } = useTheme();
  return (
    <Grid
      templateColumns={{ base: '1fr', large: '1fr 1fr 1fr' }}
      templateRows={{ base: '1fr 1fr 1fr 1fr 1fr 1fr', large: '1fr 1fr' }}
      gap={tokens.space.xl}
    >
      <FeatureCard
        topic="Customer Classification"
        text="Unlock the power of customer insights through customer classification to drive targeted marketing strategies."
      />
      <FeatureCard
        topic="Email Templates"
        text="Elevate your communication game with our pre-made tradie email templates, designed to impress clients."
      />
      <FeatureCard
        topic="AI Based Email Contents"
        text="Transform your email game with AI-generated content tailored to engage your audience like never before."
      />
      <FeatureCard
        topic="Reminders"
        text="Never miss a beat again as our intuitive system reminds you of important deadlines, milestones, and tasks."
      />
      <FeatureCard
        topic="Discount Codes"
        text="Unlock customer loyalty and boost sales with our dynamic discount code generation feature."
      />
      <FeatureCard
        topic="Stay Tuned for MT-360"
        text="Prepare to revolutionize your workflow with MT-360, our groundbreaking upcoming feature."
      />
    </Grid>
  );
};

interface FeatureCardProps {
  topic: string;
  text: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ topic, text }) => {
  const { tokens } = useTheme();
  return (
    <Card
      backgroundColor={'white'}
      borderRadius="20px"
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxShadow: '0px 0px 1px rgba(77, 38, 0, 0.8)'
      }}
      padding={'5rem 2rem 5rem 2rem'}
    >
      <Flex direction="row" alignItems="flex-start">
        <Icon
          color={tokens.colors.secondary[1]}
          alignSelf="center"
          ariaLabel="Feature"
          as={HiMiniWrenchScrewdriver}
          style={{ fontSize: '5rem' }}
        />
        <Flex direction="column" alignItems="flex-start">
          <Text fontWeight={tokens.fontWeights.exclaim} fontSize={tokens.fontSizes.landingPagePrimary}>
            {topic}
          </Text>
          <Text fontWeight={tokens.fontWeights.primary} fontSize={tokens.fontSizes.landingPageSmallest}>
            {text}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
