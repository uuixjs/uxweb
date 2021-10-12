import * as React from "react";

import {
  AlignItems,
  Background,
  BorderRadius,
  Button,
  Color,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
  ModalWrapper,
  Overflow,
  Position,
  TextType,
  Typeset,
} from "v2";
import { Component, MouseEvent } from "react";

import { ExampleThumbnails } from "../assets";

const STATIC_HEIGHT = "500px";

export default {
  title: "Modal / ModalWrapper",
};

export const examples = () => <ModalPage />;

export const fullHeight = () => (
  <>
    <div style={{ height: STATIC_HEIGHT }}>
      <Layout
        overflow={Overflow.Hidden}
        background={Background.Overlay}
        color={Color.Base}
        padding={2}
        fullHeight
        border
      >
        <ModalWrapper fullHeight>
          <ModalHeader title="Log In or Register" />
          <ModalBody>
            <div />
          </ModalBody>
          <ModalFooter
            primaryButtonProps={{
              children: "Log In",
            }}
            secondaryButtonProps={{
              children: "Cancel",
            }}
          />
        </ModalWrapper>
      </Layout>
    </div>
    <br />
    <CoreText>
      Container height is {STATIC_HEIGHT}. The modal height is calculated
      relative to its container.
    </CoreText>
  </>
);

export const fullHeightWithOverflow = () => (
  <>
    <div style={{ height: STATIC_HEIGHT }}>
      <Layout
        overflow={Overflow.Hidden}
        background={Background.Overlay}
        color={Color.Base}
        padding={2}
        fullHeight
        border
      >
        <ModalWrapper fullHeight>
          <ModalHeader title="Cookie Policy" />
          <ModalBody>
            <Layout padding={{ x: 1 }}>
              <Typeset>
                <p>
                  Twitch Interactive, Inc. (with its affiliates, “Twitch”) uses
                  certain technologies on its network of websites, software
                  applications, or any other products offered by Twitch(the
                  “Twitch Services”) to collect information that helps us
                  improve your online experience. In this Cookie Policy, we
                  refer to these technologies, which include cookies, pixels,
                  web beacons, and gifs, collectively as “cookies.” This policy
                  explains the different types of cookies used on the Twitch
                  Services and how you can control them. We may change this
                  Cookie Policy at any time: please take a look at the “last
                  modified” legend at the top of this page to see when this
                  Cookie Policy was last revised. Any changes in this Cookie
                  Policy will become effective when we make the revised Cookie
                  Policy available on or through the Twitch Services.
                </p>
                <p>
                  By agreeing to this Cookie Policy, or by using the Twitch
                  Services or any service of ours that links to this Cookie
                  Policy, you expressly consent to information handling
                  practices and storage and access of cookies as described in
                  this policy.
                </p>
                <p>
                  We hope that this policy helps you understand, and feel more
                  confident about, our use of cookies. If you have any further
                  queries, please contact us at privacy@twitch.tv.
                </p>
                <h4>What is a Cookie?</h4>
                <p>
                  Cookies are small text files that are stored on your computer
                  or mobile device. They are widely used in order to make
                  websites and software applications work, or work in a better,
                  more efficient way. They can do this because websites and
                  software applications can read and write these files, enabling
                  them to recognize you and remember important information that
                  will make your use of a website or software application more
                  convenient (e.g., by remembering your user preferences).
                </p>
                <h4>What Cookies do we use?</h4>
                <p>
                  Below we list the different types of cookies we may use on the
                  Twitch Services.
                </p>
                <p>
                  <strong>Essential Cookies</strong> These cookies are essential
                  to the operation of the Twitch Services in order to enable you
                  to move around it and to use its features. Without these
                  cookies, services you have asked for, such as accessing secure
                  areas of the website or paid for content, cannot be provided.
                  These cookies are essential for using the website and
                  therefore cannot be turned off without severely affecting your
                  use of the website.
                </p>
                <p>
                  <strong>Performance Cookies</strong> Performance cookies,
                  which often include analytics cookies, collect information
                  about your use of this Twitch Services and enable us to
                  improve the way it works. For example, performance cookies
                  show us which are the most frequently visited pages on the
                  website, allow us to see the overall patterns of usage on the
                  Twitch Services, help us record any difficulties you have with
                  the Twitch Services and show us whether our advertising is
                  effective or not.
                </p>
              </Typeset>
            </Layout>
          </ModalBody>
          <ModalFooter
            primaryButtonProps={{
              children: "I Accept",
            }}
            secondaryButtonProps={{
              children: "I Do Not Accept",
            }}
          />
        </ModalWrapper>
      </Layout>
    </div>
    <br />
    <CoreText>
      Container height is {STATIC_HEIGHT}. The modal height is calculated
      relative to its container.
    </CoreText>
  </>
);

export const fullHeightWithCustomBorderRadius = () => (
  <>
    <div style={{ height: STATIC_HEIGHT }}>
      <Layout
        overflow={Overflow.Hidden}
        background={Background.Overlay}
        color={Color.Base}
        padding={{ x: 5 }}
        fullHeight
        border
      >
        <ModalWrapper borderRadius={BorderRadius.None} fullHeight>
          <ModalHeader title="Log In or Register" />
          <ModalBody>
            <div />
          </ModalBody>
          <ModalFooter
            primaryButtonProps={{
              children: "Log In",
            }}
            secondaryButtonProps={{
              children: "Cancel",
            }}
          />
        </ModalWrapper>
      </Layout>
    </div>
    <br />
    <CoreText>
      Container height is {STATIC_HEIGHT}. The modal height is calculated
      relative to its container. The border radius can be removed if the modal
      will touch the ends of its container (or the viewport).
    </CoreText>
  </>
);

interface Props {}

type State = {
  showModal?: ModalSize;
};

class ModalPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showModal: undefined,
    };
  }
  public render() {
    return (
      <Layout margin={{ bottom: 2 }} fullWidth>
        <CoreText type={TextType.H2}>Modal Examples</CoreText>

        <Layout display={Display.Flex} margin={{ y: 3 }}>
          <Layout margin={{ right: 1 }}>
            <Button onClick={this.showSmallModal}>Launch Small Modal</Button>
          </Layout>
          <Layout margin={{ right: 1 }}>
            <Button onClick={this.showMediumModal}>Launch Medium Modal</Button>
          </Layout>
          <Layout margin={{ right: 1 }}>
            <Button onClick={this.showLargeModal}>Launch Large Modal</Button>
          </Layout>
        </Layout>

        {this.state.showModal && this.renderModalOverlay(this.state.showModal)}
        <Layout background={Background.Alt} fullWidth>
          <Layout
            display={Display.Flex}
            flexDirection={FlexDirection.Row}
            padding={1}
          >
            <ModalWrapper>
              <ModalHeader
                title="Log In or Register"
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout />
              </ModalBody>
              <ModalFooter
                primaryButtonProps={{
                  children: "Log In",
                }}
                secondaryButtonProps={{
                  children: "Cancel",
                }}
              />
            </ModalWrapper>
            <ModalWrapper>
              <ModalHeader
                title="Log In or Register"
                imageSrc={ExampleThumbnails.stream3}
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout padding={2} />
              </ModalBody>
              <ModalFooter
                primaryButtonProps={{
                  children: "Log In",
                }}
                secondaryButtonProps={{
                  children: "Cancel",
                }}
              />
            </ModalWrapper>
            <ModalWrapper>
              <ModalHeader
                title="Log In or Register"
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout />
              </ModalBody>
              <ModalFooter
                primaryButtonProps={{
                  children: "Log In",
                }}
              />
            </ModalWrapper>
          </Layout>
          <Layout
            display={Display.Flex}
            flexDirection={FlexDirection.Row}
            padding={1}
          >
            <ModalWrapper size={ModalSize.Small}>
              <ModalHeader
                size={ModalSize.Small}
                title="Log In or Register"
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout padding={2} />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Small}
                primaryButtonProps={{
                  children: "Log In",
                }}
                secondaryButtonProps={{
                  children: "Cancel",
                }}
              />
            </ModalWrapper>
            <ModalWrapper size={ModalSize.Small}>
              <ModalHeader
                size={ModalSize.Small}
                title="Log In or Register"
                imageSrc={ExampleThumbnails.stream4}
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout padding={2} />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Small}
                primaryButtonProps={{
                  children: "Log In",
                }}
                secondaryButtonProps={{
                  children: "Cancel",
                }}
              />
            </ModalWrapper>
            <ModalWrapper size={ModalSize.Small}>
              <ModalHeader
                size={ModalSize.Small}
                title="Log In or Register"
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Small}
                primaryButtonProps={{
                  children: "Log In",
                }}
              />
            </ModalWrapper>
          </Layout>
          <Layout
            display={Display.Flex}
            flexDirection={FlexDirection.Row}
            padding={1}
          >
            <ModalWrapper size={ModalSize.Medium}>
              <ModalHeader
                size={ModalSize.Medium}
                title="Log In or Register"
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout padding={2} />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Medium}
                primaryButtonProps={{
                  children: "Log In",
                }}
                secondaryButtonProps={{
                  children: "Cancel",
                }}
              />
            </ModalWrapper>
            <ModalWrapper size={ModalSize.Medium}>
              <ModalHeader
                size={ModalSize.Medium}
                title="Log In or Register"
                imageSrc={ExampleThumbnails.stream5}
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout padding={2} />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Medium}
                primaryButtonProps={{
                  children: "Log In",
                }}
                secondaryButtonProps={{
                  children: "Cancel",
                }}
              />
            </ModalWrapper>
            <ModalWrapper size={ModalSize.Medium}>
              <ModalHeader
                size={ModalSize.Medium}
                title="Log In or Register"
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout padding={2} />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Medium}
                primaryButtonProps={{
                  children: "Log In",
                }}
              />
            </ModalWrapper>
          </Layout>
          <Layout
            display={Display.Flex}
            flexDirection={FlexDirection.Row}
            padding={1}
          >
            <ModalWrapper size={ModalSize.Large}>
              <ModalHeader
                size={ModalSize.Large}
                title="Log In or Register"
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout padding={2} />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Large}
                primaryButtonProps={{
                  children: "Log In",
                }}
                secondaryButtonProps={{
                  children: "Cancel",
                }}
              />
            </ModalWrapper>
            <ModalWrapper size={ModalSize.Large}>
              <ModalHeader
                size={ModalSize.Large}
                title="Log In or Register"
                imageSrc={ExampleThumbnails.stream1}
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout padding={2} />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Large}
                primaryButtonProps={{
                  children: "Log In",
                }}
                secondaryButtonProps={{
                  children: "Cancel",
                }}
              />
            </ModalWrapper>
            <ModalWrapper size={ModalSize.Large}>
              <ModalHeader
                size={ModalSize.Large}
                title="Log In or Register"
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Large}
                primaryButtonProps={{
                  children: "Log In",
                }}
              />
            </ModalWrapper>
          </Layout>
          <Layout
            display={Display.Flex}
            flexDirection={FlexDirection.Row}
            padding={1}
          >
            <ModalWrapper
              size={ModalSize.Large}
              borderRadius={BorderRadius.None}
            >
              <ModalHeader
                size={ModalSize.Large}
                title="Log In or Register"
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Large}
                primaryButtonProps={{
                  children: "Log In",
                }}
                secondaryButtonProps={{
                  children: "Cancel",
                }}
              />
            </ModalWrapper>
            <ModalWrapper
              size={ModalSize.Large}
              borderRadius={BorderRadius.None}
            >
              <ModalHeader
                size={ModalSize.Large}
                title="Log In or Register"
                imageSrc={ExampleThumbnails.stream2}
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Large}
                primaryButtonProps={{
                  children: "Log In",
                }}
                secondaryButtonProps={{
                  children: "Cancel",
                }}
              />
            </ModalWrapper>
            <ModalWrapper
              size={ModalSize.Large}
              borderRadius={BorderRadius.None}
            >
              <ModalHeader
                size={ModalSize.Large}
                title="Log In or Register"
                closeButton={{
                  "aria-label": "Close",
                  onClick: this.handleClickClose,
                }}
              />
              <ModalBody>
                <Layout />
              </ModalBody>
              <ModalFooter
                size={ModalSize.Large}
                primaryButtonProps={{
                  children: "Log In",
                }}
              />
            </ModalWrapper>
          </Layout>
        </Layout>

        <Layout padding={1} margin={{ top: 4 }}>
          <ModalWrapper borderRadius={BorderRadius.None} size={ModalSize.Small}>
            <ModalHeader
              size={ModalSize.Small}
              padding={0}
              title="Log In or Register"
            />
            <ModalBody>
              <Layout>
                <Typeset>
                  <p>
                    This Twitch Privacy Policy applies to your use of
                    www.twitch.tv, and any other websites, applications, or
                    services provided, owned, or operated by Twitch Interactive,
                    Inc. (with its affiliates, “Twitch”) that link to this
                    Privacy Policy (collectively, the “Twitch Services”). Twitch
                    values the privacy of users, subscribers, publishers,
                    members, and others who visit and use the Twitch Services
                    (collectively or individually, “you” or “users”) and wants
                    you to be familiar with how we collect, use, and disclose
                    personal information from and about you.
                  </p>
                  <p>
                    For purposes of data protection laws, Twitch Interactive,
                    Inc., located at 350 Bush Street, 2nd Floor, San Francisco,
                    CA 94104, is the “data controller” of your information; with
                    respect to data collected by Curse LLC in connection with
                    the Curse websites and/or services, Curse LLC, located at
                    350 Bush Street, 2nd Floor, San Francisco, CA 94104, is the
                    “data controller” of your information.
                  </p>
                  <p>
                    You may share personal information when using the Twitch
                    Services. One example is when you provide information about
                    yourself as part of the Twitch account creation process.
                    Another is when you take certain actions on the Twitch
                    Services that are public or intended to be public in nature,
                    such as when you broadcast content, participate in a chat
                    room, post profile information, follow a channel, or
                    subscribe to a broadcast channel. Given the social nature of
                    some of the Twitch Services, that information may be
                    collected, used, or disclosed by others who are part of that
                    social interaction. In addition, some features of the Twitch
                    Services are designed to provide others with information
                    about user activity, such as identifying the user who
                    created a particular Clip or the subscription status of
                    users for a given channel. We encourage you to be mindful of
                    this when considering your activity on the Twitch Services.
                  </p>
                  <p>
                    By agreeing to this Privacy Policy in your Twitch account
                    setup, or by using the Twitch Services, you consent to the
                    extent permitted by law to the information handling
                    practices described in this Policy. Storage and access to
                    cookies that are set in connection with the Twitch Services
                    are governed by the Twitch Cookie Policy (“Cookie Policy”).
                  </p>
                </Typeset>
              </Layout>
            </ModalBody>
            <ModalFooter
              size={ModalSize.Small}
              primaryButtonProps={{
                children: "Log In",
              }}
              secondaryButtonProps={{
                children: "Cancel",
              }}
            />
          </ModalWrapper>
        </Layout>
      </Layout>
    );
  }

  private handleClickClose = (e: MouseEvent<HTMLElement>) => {
    return e;
  };

  private showSmallModal = () => this.setState({ showModal: ModalSize.Small });
  private showMediumModal = () =>
    this.setState({ showModal: ModalSize.Medium });
  private showLargeModal = () => this.setState({ showModal: ModalSize.Large });

  private renderModalOverlay = (size: ModalSize) => {
    return (
      <Layout
        className="modal-page__overlay"
        background={Background.Overlay}
        color={Color.Base}
        display={Display.Flex}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.Center}
        position={Position.Fixed}
        padding={5}
        attachTop
        attachRight
        fullWidth
        fullHeight
      >
        <ModalWrapper size={size} aria-labelledby="header-id">
          <ModalHeader
            size={size}
            title="Privacy Policy"
            closeButton={{
              "aria-label": "Close",
              onClick: () => this.setState({ showModal: undefined }),
            }}
            id="header-id"
          />
          <ModalBody>
            <Layout>
              <Typeset>
                <p>
                  This Twitch Privacy Policy applies to your use of
                  www.twitch.tv, and any other websites, applications, or
                  services provided, owned, or operated by Twitch Interactive,
                  Inc. (with its affiliates, “Twitch”) that link to this Privacy
                  Policy (collectively, the “Twitch Services”). Twitch values
                  the privacy of users, subscribers, publishers, members, and
                  others who visit and use the Twitch Services (collectively or
                  individually, “you” or “users”) and wants you to be familiar
                  with how we collect, use, and disclose personal information
                  from and about you.
                </p>
                <p>
                  For purposes of data protection laws, Twitch Interactive,
                  Inc., located at 350 Bush Street, 2nd Floor, San Francisco, CA
                  94104, is the “data controller” of your information; with
                  respect to data collected by Curse LLC in connection with the
                  Curse websites and/or services, Curse LLC, located at 350 Bush
                  Street, 2nd Floor, San Francisco, CA 94104, is the “data
                  controller” of your information.
                </p>
                <p>
                  You may share personal information when using the Twitch
                  Services. One example is when you provide information about
                  yourself as part of the Twitch account creation process.
                  Another is when you take certain actions on the Twitch
                  Services that are public or intended to be public in nature,
                  such as when you broadcast content, participate in a chat
                  room, post profile information, follow a channel, or subscribe
                  to a broadcast channel. Given the social nature of some of the
                  Twitch Services, that information may be collected, used, or
                  disclosed by others who are part of that social interaction.
                  In addition, some features of the Twitch Services are designed
                  to provide others with information about user activity, such
                  as identifying the user who created a particular Clip or the
                  subscription status of users for a given channel. We encourage
                  you to be mindful of this when considering your activity on
                  the Twitch Services.
                </p>
                <p>
                  By agreeing to this Privacy Policy in your Twitch account
                  setup, or by using the Twitch Services, you consent to the
                  extent permitted by law to the information handling practices
                  described in this Policy. Storage and access to cookies that
                  are set in connection with the Twitch Services are governed by
                  the Twitch Cookie Policy (“Cookie Policy”).
                </p>
              </Typeset>
            </Layout>
          </ModalBody>
          <ModalFooter
            size={size}
            primaryButtonProps={{
              children: "Accept",
            }}
            secondaryButtonProps={{
              children: "Cancel",
            }}
          />
        </ModalWrapper>
      </Layout>
    );
  };
}
