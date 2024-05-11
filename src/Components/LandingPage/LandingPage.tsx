import {
  Button,
  Text,
  View,
  Grid,
  Flex,
  useTheme,
  Icon,
} from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import LandingPageHeader from "./Header/Header";
import { ImFacebook2 } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { FeaturePack } from "./FeaturePack/FeaturePack";
import Guide from "./Guide/Guide";

const LandingPage = () => {
  const navigate = useNavigate();

  const letsGoButtonFnc = () => {
    navigate("/dashboard");
  };

  const { tokens } = useTheme();
  return (
    <View style={{ backgroundColor: "white", overflow: "scroll" }}>
      <View style={{ width: "auto", alignItems: "start" }}>
        <LandingPageHeader />
      </View>

      <View style={{ width: "auto", height: "100vh", alignItems: "start" }}>
        <Grid
          padding="2em 10em 2em 10em"
          templateColumns={{ base: "1fr", large: "2fr 3fr" }}
          templateRows={{ base: "1rem 40rem 30rem", large: "5rem 40rem" }}
          gap={tokens.space.landingPageGridGap}
        >
          <View
            // An empty View providing the gap due to the header
            columnSpan={{ base: 1, large: 2 }} // Based on templateColumns
            rowSpan={{ base: 1, large: 1 }} // Based on templateRows
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />

          <View
            rowSpan={{ base: 1, large: 1 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Flex direction="column" gap={20}>
              <Text
                fontWeight={tokens.fontWeights.exclaim}
                fontSize={tokens.fontSizes.landingPageSecondary}
              >
                MasterTradie : Our offer to you
              </Text>
              <Text
                fontWeight={tokens.fontWeights.primary}
                fontSize={tokens.fontSizes.landingPagePrimary}
              >
                As a hard working tradesperson, you deserve the best. You have
                to know your customers and prospects, keep in touch with them
                and attract them to you in order to deliver your masterworks.
              </Text>
              <Text
                fontWeight={tokens.fontWeights.primary}
                fontSize={tokens.fontSizes.landingPagePrimary}
              >
                MasterTradie is design to accomplish that exact objective.
              </Text>
              <Text
                alignSelf="center"
                fontWeight={tokens.fontWeights.highlighted}
                fontSize={tokens.fontSizes.landingPagePrimary}
              >
                "Helping you to grow"
              </Text>
              <View alignSelf="center">
                <Button
                  backgroundColor={tokens.colors.secondary[1]}
                  fontWeight={tokens.fontWeights.primary}
                  borderRadius="20px"
                  onClick={letsGoButtonFnc}
                  style={{ width: "300px", height: "60px" }}
                >
                  <Text
                    color={tokens.colors.font.onImage}
                    fontWeight={tokens.fontWeights.highlighted}
                    fontSize={tokens.fontSizes.landingPagePrimary}
                  >
                    Let's Start
                  </Text>
                </Button>
              </View>
            </Flex>
          </View>

          <View
            rowSpan={{ base: 1, large: 1 }}
            borderRadius="30px"
            backgroundImage="url('src/assets/landing-page-image.jpg')"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Flex direction="column" gap={10} height="100%">
              <View
                flex="2"
                alignSelf="center"
                width="80%"
                style={{
                  display: "flex",
                }}
              >
                <Text
                  alignSelf="flex-end"
                  fontWeight={tokens.fontWeights.primary}
                  color={tokens.colors.font.onImage}
                  textAlign="center"
                  fontSize={tokens.fontSizes.landingPageLargest}
                >
                  We've got your back in ensuring top-notch customer management
                </Text>
              </View>
              <View
                backgroundImage="url('src/assets/MTLogo.png')"
                display={{ base: "none", large: "block" }}
                width="46%"
                alignSelf="center"
                flex="2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundSize: "100% 100%",
                }}
              />
              <View
                alignSelf="center"
                flex="0.5"
                style={{
                  display: "flex",
                }}
              >
                <Flex direction="row" gap={10} alignSelf="center">
                  <Text
                    fontWeight={tokens.fontWeights.highlighted}
                    fontSize={tokens.fontSizes.landingPagePrimary}
                    color={tokens.colors.font.onImage}
                  >
                    Join us today
                  </Text>
                  <Icon
                    color={tokens.colors.primary[1]}
                    alignSelf="center"
                    ariaLabel="Facebook"
                    as={ImFacebook2}
                    style={{ fontSize: "3rem" }}
                  />
                  <Icon
                    color={tokens.colors.primary[1]}
                    alignSelf="center"
                    ariaLabel="Twitter"
                    as={BsTwitterX}
                    style={{ fontSize: "3rem" }}
                  />
                  <Icon
                    color={tokens.colors.primary[1]}
                    alignSelf="center"
                    ariaLabel="Linkedin"
                    as={ImLinkedin}
                    style={{ fontSize: "3rem" }}
                  />
                </Flex>
              </View>
            </Flex>
          </View>
        </Grid>
        <View
          paddingLeft="10em"
          paddingRight="10em"
          style={{ alignItems: "start" }}
        >
          <FeaturePack />
        </View>
        <View
          padding="4em 10em 4em 10em"
          style={{ width: "auto", alignItems: "start" }}
        >
          <Guide />
        </View>
      </View>
    </View>
  );
};

export default LandingPage;
