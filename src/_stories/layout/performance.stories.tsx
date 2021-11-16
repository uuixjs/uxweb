import * as React from "react";

import {
  AlignContent,
  AlignItems,
  AlignSelf,
  Background,
  BorderRadius,
  Color,
  Cursor,
  Display,
  FlexDirection,
  FlexWrap,
  FontSize,
  FontWeight,
  InjectLayout,
  JustifyContent,
  Layout,
  Overflow,
  Position,
  TextAlign,
  VerticalAlign,
  Visibility,
  ZIndex,
} from "v2";

export default { title: "Performance | Layout" };

/**
 * Just a bunch of nested components.
 *
 */
export function FiftyLayouts() {
  return (
    <>
      This story renders 50 Layouts:
      {[...Array(50)].map((_, i) => (
        <Layout key={i}>{i + 1}</Layout>
      ))}
    </>
  );
}

/**
 * Just a bunch of nested components.
 *
 */
export function FiftyInjectLayouts() {
  return (
    <>
      This story renders 50 InjectLayouts:
      {[...Array(50)].map((_, i) => (
        <InjectLayout key={i}>
          <div>{i + 1}</div>
        </InjectLayout>
      ))}
    </>
  );
}

/**
 * Test performance of simple prop usage.
 *
 * Spec:
 *   - Each layout uses zero to three props
 *   - No breakpoint props
 *   - Should render about 50 components in total
 */
export function SimpleProps() {
  return (
    <Layout>
      <Layout borderMarked margin={{ bottom: 2 }}>
        <Layout background={Background.Alt} padding={1}>
          <Layout
            display={Display.Flex}
            justifyContent={JustifyContent.Between}
          >
            <Layout padding={3} background={Background.Accent} />
            <Layout padding={3} background={Background.Accent} />
            <Layout padding={3} background={Background.Accent} />
            <Layout padding={3} background={Background.Accent} />
          </Layout>
        </Layout>
      </Layout>

      <Layout borderMarked margin={{ bottom: 2 }}>
        <Layout background={Background.Alt} padding={1}>
          <Layout
            display={Display.Flex}
            justifyContent={JustifyContent.Between}
          >
            <Layout
              borderRadius={BorderRadius.Rounded}
              overflow={Overflow.Hidden}
            >
              <Layout padding={3} background={Background.AccentAlt2} />
            </Layout>
            <Layout
              borderRadius={BorderRadius.Rounded}
              overflow={Overflow.Hidden}
            >
              <Layout padding={3} background={Background.AccentAlt2} />
            </Layout>
            <Layout
              borderRadius={BorderRadius.Rounded}
              overflow={Overflow.Hidden}
            >
              <Layout padding={3} background={Background.AccentAlt2} />
            </Layout>
            <Layout
              borderRadius={BorderRadius.Rounded}
              overflow={Overflow.Hidden}
            >
              <Layout padding={3} background={Background.AccentAlt2} />
            </Layout>
          </Layout>
        </Layout>
      </Layout>

      <Layout border margin={{ bottom: 2 }} background={Background.Alt}>
        <Layout padding={2}>
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Layout borderLeft borderTop padding={1} />
            <Layout borderLeft borderBottom padding={1} />
            <Layout borderLeft borderTop padding={1} />
            <Layout borderLeft borderBottom padding={1} />
            <Layout borderLeft borderTop padding={1} />
            <Layout borderLeft borderBottom padding={1} />
            <Layout borderLeft borderTop padding={1} />
            <Layout borderLeft borderBottom padding={1} />
            <Layout borderLeft borderTop padding={1} />
            <Layout borderLeft borderBottom padding={1} />
            <Layout borderLeft borderTop padding={1} />
            <Layout borderLeft borderBottom padding={1} />
            <Layout borderLeft borderTop padding={1} />
            <Layout borderLeft borderBottom padding={1} />
            <Layout borderLeft borderTop padding={1} />
            <Layout borderLeft borderBottom padding={1} />
            <Layout borderLeft borderTop padding={1} />
            <Layout borderLeft borderBottom padding={1} />
          </Layout>
        </Layout>
      </Layout>

      <Layout border margin={{ bottom: 2 }}>
        <Layout padding={2} background={Background.Alt}>
          <Layout fontSize={FontSize.Size4}>
            <Layout color={Color.Alt2}>
              <Layout ellipsis>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </Layout>

      <Layout position={Position.Absolute} attachBottom>
        <Layout background={Background.Accent} color={Color.Overlay}>
          <Layout padding={1} margin={{ bottom: 2 }}>
            <Layout cursor={Cursor.Pointer} visibility={Visibility.Visible}>
              Absolute Bottom Left
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
}

/**
 * Test performance of complex prop usage.
 *
 * Spec:
 *   - Each layout uses at least five props
 *   - Half of the layouts should use at least ten props
 *   - No breakpoint props
 *   - Should render about 50 components in total
 */
export function ComplexProps() {
  return (
    <Layout>
      <Layout
        border
        margin={{ bottom: 2 }}
        background={Background.Alt}
        padding={2}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
      >
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderTop
          padding={1}
        />
        <Layout
          background={Background.Alt2}
          margin={0}
          position={Position.Relative}
          visibility={Visibility.Visible}
          flexGrow={1}
          flexShrink={0}
          borderLeft
          borderBottom
          padding={1}
        />
      </Layout>

      <Layout
        className="test"
        fullWidth
        border
        padding={1}
        background={Background.Alt}
        borderRadius={BorderRadius.Medium}
        display={Display.Flex}
        justifyContent={JustifyContent.Between}
      >
        <Layout
          className="test"
          padding={3}
          margin={0}
          background={Background.Accent}
          border
          alignSelf={AlignSelf.Start}
          borderRadius={BorderRadius.Medium}
          elevation={2}
        />
        <Layout
          className="test"
          padding={3}
          margin={0}
          background={Background.Accent}
          border
          alignSelf={AlignSelf.Start}
          borderRadius={BorderRadius.Medium}
          elevation={2}
        />
        <Layout
          className="test"
          padding={3}
          margin={0}
          background={Background.Accent}
          border
          alignSelf={AlignSelf.Start}
          borderRadius={BorderRadius.Medium}
          elevation={2}
        />
        <Layout
          className="test"
          padding={3}
          margin={0}
          background={Background.Accent}
          border
          alignSelf={AlignSelf.Start}
          borderRadius={BorderRadius.Medium}
          elevation={2}
        />
        <Layout
          className="test"
          padding={3}
          margin={0}
          background={Background.Accent}
          border
          alignSelf={AlignSelf.Start}
          borderRadius={BorderRadius.Medium}
          elevation={2}
        />
      </Layout>

      <Layout
        className="test"
        fullWidth
        border
        padding={1}
        margin={{ top: 2 }}
        background={Background.Alt}
        borderRadius={BorderRadius.Medium}
        display={Display.Flex}
        justifyContent={JustifyContent.Between}
      >
        <Layout
          className="foobar"
          padding={3}
          margin={{ top: 0, bottom: 0, x: 0 }}
          background={Background.AccentAlt2}
          border
          alignSelf={AlignSelf.Start}
          borderRadius={BorderRadius.Rounded}
          overflow={Overflow.Hidden}
        />
        <Layout
          className="foobar"
          padding={3}
          margin={{ top: 0, bottom: 0, x: 0 }}
          background={Background.AccentAlt2}
          border
          alignSelf={AlignSelf.Start}
          borderRadius={BorderRadius.Rounded}
          overflow={Overflow.Hidden}
        />
        <Layout
          className="foobar"
          padding={3}
          margin={{ top: 0, bottom: 0, x: 0 }}
          background={Background.AccentAlt2}
          border
          alignSelf={AlignSelf.Start}
          borderRadius={BorderRadius.Rounded}
          overflow={Overflow.Hidden}
        />
        <Layout
          className="foobar"
          padding={3}
          margin={{ top: 0, bottom: 0, x: 0 }}
          background={Background.AccentAlt2}
          border
          alignSelf={AlignSelf.Start}
          borderRadius={BorderRadius.Rounded}
          overflow={Overflow.Hidden}
        />
        <Layout
          className="foobar"
          padding={3}
          margin={{ top: 0, bottom: 0, x: 0 }}
          background={Background.AccentAlt2}
          border
          alignSelf={AlignSelf.Start}
          borderRadius={BorderRadius.Rounded}
          overflow={Overflow.Hidden}
        />
      </Layout>

      <Layout
        position={Position.Absolute}
        attachBottom
        attachLeft
        padding={{ x: 1, y: 0.5 }}
        elevation={2}
        margin={2}
        background={Background.AccentAlt}
        color={Color.Overlay}
        borderRadius={BorderRadius.Large}
        zIndex={ZIndex.Above}
        fontWeight={FontWeight.Bold}
      >
        Absolute Bottom Left
      </Layout>

      <Layout
        position={Position.Absolute}
        attachBottom
        attachRight
        padding={{ x: 1, y: 0.5 }}
        elevation={2}
        margin={2}
        background={Background.Alt2}
        color={Color.Alt2}
        borderRadius={BorderRadius.Large}
        zIndex={ZIndex.Above}
        fontWeight={FontWeight.SemiBold}
      >
        Absolute Bottom Right
      </Layout>

      <Layout
        position={Position.Absolute}
        attachTop
        attachLeft
        fullWidth
        fullHeight
        background={Background.Overlay}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        cursor={Cursor.NotAllowed}
      >
        <Layout
          cursor={Cursor.Auto}
          background={Background.Base}
          color={Color.Base}
          padding={2}
          borderRadius={BorderRadius.Large}
          elevation={3}
          fontSize={FontSize.Size4}
          verticalAlign={VerticalAlign.Middle}
          ellipsis
        >
          This is some modal-like content
          <Layout
            className="some-class-name"
            margin={{ y: 2 }}
            display={Display.Flex}
            alignItems={AlignItems.Center}
            background={Background.Alt}
            textAlign={TextAlign.Center}
          >
            <Layout
              ellipsis
              border
              padding={0.5}
              flexGrow={1}
              flexShrink={0}
              alignSelf={AlignSelf.Center}
            >
              Hearthstone
            </Layout>
            <Layout
              ellipsis
              border
              padding={0.5}
              flexGrow={1}
              flexShrink={0}
              alignSelf={AlignSelf.Center}
            >
              Fortnite
            </Layout>
            <Layout
              ellipsis
              border
              padding={0.5}
              flexGrow={1}
              flexShrink={0}
              alignSelf={AlignSelf.Center}
            >
              Overwatch
            </Layout>
          </Layout>
          <Layout
            display={Display.Flex}
            flexDirection={FlexDirection.Row}
            justifyContent={JustifyContent.End}
            flexWrap={FlexWrap.NoWrap}
            alignItems={AlignItems.Center}
            margin={{ top: 2 }}
            padding={0}
            overflow={Overflow.Scroll}
            zIndex={ZIndex.Above}
          >
            <Layout
              background={Background.Alt2}
              margin={{ right: 1 }}
              padding={{ y: 0.5, x: 1 }}
              borderRadius={BorderRadius.Medium}
              fontSize={FontSize.Size5}
              textAlign={TextAlign.Center}
              flexShrink={0}
              flexGrow={0}
              flexOrder={0}
              cursor={Cursor.Pointer}
            >
              Cancel
            </Layout>

            <Layout
              background={Background.Accent}
              color={Color.Overlay}
              padding={{ y: 0.5, x: 1 }}
              borderRadius={BorderRadius.Medium}
              fontSize={FontSize.Size5}
              textAlign={TextAlign.Center}
              flexShrink={0}
              flexGrow={0}
              flexOrder={0}
              cursor={Cursor.Pointer}
            >
              Confirm
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
}

/**
 * Test performance of breakpoint prop usage.
 *
 * Spec:
 *   - Majority of components use breakpoint props
 *   - Should render about 50 components in total
 */
export function BreakpointProps() {
  return (
    <Layout>
      <Layout
        border
        padding={1}
        background={Background.Alt}
        textAlign={TextAlign.Center}
        display={Display.Flex}
        color={Color.Overlay}
        flexWrap={FlexWrap.Wrap}
        flexDirection={FlexDirection.Column}
        breakpointExtraSmall={{
          flexDirection: FlexDirection.Row,
          alignContent: AlignContent.Center,
          justifyContent: JustifyContent.Center,
        }}
      >
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          flexGrow={1}
          breakpointSmall={{ padding: 2, margin: 1 }}
          breakpointMedium={{ padding: 3 }}
          breakpointLarge={{ padding: 4 }}
        >
          Box
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          flexGrow={1}
          breakpointSmall={{ padding: 2, margin: 1 }}
          breakpointMedium={{ padding: 3 }}
          breakpointLarge={{ padding: 4 }}
        >
          Box
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          flexGrow={1}
          breakpointSmall={{ padding: 2, margin: 1 }}
          breakpointMedium={{ padding: 3 }}
          breakpointLarge={{ padding: 4 }}
        >
          Box
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          flexGrow={1}
          breakpointSmall={{ padding: 2, margin: 1 }}
          breakpointMedium={{ padding: 3 }}
          breakpointLarge={{ padding: 4 }}
        >
          Box
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          flexGrow={1}
          breakpointSmall={{ padding: 2, margin: 1 }}
          breakpointMedium={{ padding: 3 }}
          breakpointLarge={{ padding: 4 }}
        >
          Box
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          flexGrow={1}
          breakpointSmall={{ padding: 2, margin: 1 }}
          breakpointMedium={{ padding: 3 }}
          breakpointLarge={{ padding: 4 }}
        >
          Box
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          flexGrow={1}
          breakpointSmall={{ padding: 2, margin: 1 }}
          breakpointMedium={{ padding: 3 }}
          breakpointLarge={{ padding: 4 }}
        >
          Box
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          flexGrow={1}
          breakpointSmall={{ padding: 2, margin: 1 }}
          breakpointMedium={{ padding: 3 }}
          breakpointLarge={{ padding: 4 }}
        >
          Box
        </Layout>
      </Layout>
      <Layout
        border
        margin={{ top: 2 }}
        padding={1}
        background={Background.Alt}
        textAlign={TextAlign.Center}
        display={Display.Flex}
        alignItems={AlignItems.Center}
        verticalAlign={VerticalAlign.Baseline}
        breakpointExtraSmall={{
          flexDirection: FlexDirection.Row,
          alignContent: AlignContent.Center,
          justifyContent: JustifyContent.Center,
        }}
      >
        <Layout
          margin={0.5}
          fontSize={FontSize.Size5}
          breakpointExtraSmall={{ fontSize: FontSize.Size4 }}
          breakpointSmall={{ fontSize: FontSize.Size3 }}
          breakpointMedium={{ fontSize: FontSize.Size2 }}
          breakpointLarge={{ fontSize: FontSize.Size1 }}
        >
          This
        </Layout>
        <Layout
          margin={0.5}
          fontSize={FontSize.Size5}
          breakpointSmall={{ fontSize: FontSize.Size4 }}
          breakpointMedium={{ fontSize: FontSize.Size3 }}
          breakpointLarge={{ fontSize: FontSize.Size2 }}
        >
          text
        </Layout>
        <Layout
          margin={0.5}
          fontSize={FontSize.Size5}
          breakpointMedium={{ fontSize: FontSize.Size4 }}
          breakpointLarge={{ fontSize: FontSize.Size3 }}
        >
          responds
        </Layout>
        <Layout
          margin={0.5}
          fontSize={FontSize.Size5}
          breakpointLarge={{ fontSize: FontSize.Size4 }}
        >
          to
        </Layout>
        <Layout
          margin={0.5}
          fontSize={FontSize.Size5}
          breakpointLarge={{ fontSize: FontSize.Size4 }}
        >
          resize...
        </Layout>
      </Layout>
      <Layout
        border
        margin={{ top: 2 }}
        padding={1}
        background={Background.Alt}
        display={Display.Flex}
        color={Color.Overlay}
        flexWrap={FlexWrap.Wrap}
        flexDirection={FlexDirection.Column}
        justifyContent={JustifyContent.Center}
        breakpointExtraSmall={{
          flexDirection: FlexDirection.Row,
        }}
      >
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          breakpointExtraSmall={{ flexOrder: 0 }}
          breakpointSmall={{ flexOrder: 4 }}
        >
          A
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          breakpointExtraSmall={{ flexOrder: 1 }}
          breakpointSmall={{ flexOrder: 4 }}
        >
          B
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          breakpointExtraSmall={{ flexOrder: 0 }}
          breakpointSmall={{ flexOrder: 3 }}
        >
          C
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          breakpointExtraSmall={{ flexOrder: 1 }}
          breakpointSmall={{ flexOrder: 3 }}
        >
          D
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          breakpointExtraSmall={{ flexOrder: 0 }}
          breakpointSmall={{ flexOrder: 2 }}
        >
          E
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          breakpointExtraSmall={{ flexOrder: 1 }}
          breakpointSmall={{ flexOrder: 2 }}
        >
          F
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          breakpointExtraSmall={{ flexOrder: 0 }}
          breakpointSmall={{ flexOrder: 1 }}
        >
          G
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          breakpointExtraSmall={{ flexOrder: 1 }}
          breakpointSmall={{ flexOrder: 1 }}
        >
          H
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          breakpointExtraSmall={{ flexOrder: 0 }}
          breakpointSmall={{ flexOrder: 0 }}
        >
          I
        </Layout>
        <Layout
          background={Background.Accent}
          margin={0.5}
          padding={1}
          breakpointExtraSmall={{ flexOrder: 1 }}
          breakpointSmall={{ flexOrder: 0 }}
        >
          J
        </Layout>
      </Layout>
      <Layout
        margin={{ top: 2 }}
        border
        padding={0}
        breakpointSmall={{ padding: 0.5 }}
        breakpointMedium={{ padding: 1 }}
      >
        <Layout
          border
          padding={0}
          breakpointSmall={{ padding: 0.5 }}
          breakpointMedium={{ padding: 1 }}
        >
          <Layout
            border
            padding={0}
            breakpointSmall={{ padding: 0.5 }}
            breakpointMedium={{ padding: 1 }}
          >
            <Layout
              border
              padding={0}
              breakpointSmall={{ padding: 0.5 }}
              breakpointMedium={{ padding: 1 }}
            >
              <Layout
                border
                padding={0}
                breakpointSmall={{ padding: 0.5 }}
                breakpointMedium={{ padding: 1 }}
              >
                <Layout
                  border
                  padding={0}
                  breakpointSmall={{ padding: 0.5 }}
                  breakpointMedium={{ padding: 1 }}
                >
                  <Layout
                    border
                    padding={0}
                    breakpointSmall={{ padding: 0.5 }}
                    breakpointMedium={{ padding: 1 }}
                  >
                    <Layout
                      border
                      padding={0}
                      breakpointSmall={{ padding: 0.5 }}
                      breakpointMedium={{ padding: 1 }}
                    >
                      <Layout
                        border
                        padding={0}
                        breakpointSmall={{ padding: 0.5 }}
                        breakpointMedium={{ padding: 1 }}
                      >
                        <Layout
                          border
                          padding={0}
                          breakpointSmall={{ padding: 0.5 }}
                          breakpointMedium={{ padding: 1 }}
                        >
                          <Layout
                            border
                            padding={0}
                            breakpointSmall={{ padding: 0.5 }}
                            breakpointMedium={{ padding: 1 }}
                          >
                            <Layout
                              border
                              padding={0}
                              breakpointSmall={{ padding: 0.5 }}
                              breakpointMedium={{ padding: 1 }}
                            >
                              <Layout
                                border
                                padding={0}
                                textAlign={TextAlign.Center}
                                breakpointSmall={{ padding: 0.5 }}
                                breakpointMedium={{ padding: 1 }}
                              >
                                <Layout
                                  border
                                  padding={0}
                                  textAlign={TextAlign.Center}
                                  breakpointSmall={{ padding: 0.5 }}
                                  breakpointMedium={{ padding: 1 }}
                                >
                                  <Layout
                                    border
                                    padding={0}
                                    textAlign={TextAlign.Center}
                                    breakpointSmall={{ padding: 0.5 }}
                                    breakpointMedium={{ padding: 1 }}
                                  >
                                    <Layout
                                      border
                                      padding={0}
                                      textAlign={TextAlign.Center}
                                      breakpointSmall={{ padding: 0.5 }}
                                      breakpointMedium={{ padding: 1 }}
                                    >
                                      This box will collapse.
                                    </Layout>
                                  </Layout>
                                </Layout>
                              </Layout>
                            </Layout>
                          </Layout>
                        </Layout>
                      </Layout>
                    </Layout>
                  </Layout>
                </Layout>
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </Layout>

      <Layout
        border
        margin={{ top: 2 }}
        padding={5}
        background={Background.Alt}
        position={Position.Relative}
        textAlign={TextAlign.Center}
        breakpointSmall={{ position: Position.Relative }}
      >
        <Layout margin={1} breakpointSmall={{ fontSize: FontSize.Size4 }}>
          This text never moves
        </Layout>
        <Layout
          background={Background.Alt2}
          padding={0.5}
          attachTop
          attachLeft
          breakpointExtraSmall={{
            fontSize: FontSize.Size5,
          }}
          breakpointSmall={{
            textAlign: TextAlign.Left,
            position: Position.Absolute,
          }}
          breakpointMedium={{
            fontSize: FontSize.Size4,
          }}
          breakpointLarge={{
            fontSize: FontSize.Size3,
          }}
          breakpointExtraLarge={{
            fontSize: FontSize.Size2,
          }}
        >
          This label moves
        </Layout>
        <Layout
          background={Background.Alt2}
          padding={0.5}
          attachTop
          attachRight
          breakpointExtraSmall={{
            fontSize: FontSize.Size5,
          }}
          breakpointSmall={{
            textAlign: TextAlign.Left,
            position: Position.Absolute,
          }}
          breakpointMedium={{
            fontSize: FontSize.Size4,
          }}
          breakpointLarge={{
            fontSize: FontSize.Size3,
          }}
          breakpointExtraLarge={{
            fontSize: FontSize.Size2,
          }}
        >
          This label moves
        </Layout>
        <Layout
          background={Background.Alt2}
          padding={0.5}
          attachBottom
          attachLeft
          breakpointExtraSmall={{
            fontSize: FontSize.Size5,
          }}
          breakpointSmall={{
            textAlign: TextAlign.Left,
            position: Position.Absolute,
          }}
          breakpointMedium={{
            fontSize: FontSize.Size4,
          }}
          breakpointLarge={{
            fontSize: FontSize.Size3,
          }}
          breakpointExtraLarge={{
            fontSize: FontSize.Size2,
          }}
        >
          This label moves
        </Layout>
        <Layout
          background={Background.Alt2}
          padding={0.5}
          attachBottom
          attachRight
          breakpointExtraSmall={{
            fontSize: FontSize.Size5,
          }}
          breakpointSmall={{
            textAlign: TextAlign.Left,
            position: Position.Absolute,
          }}
          breakpointMedium={{
            fontSize: FontSize.Size4,
          }}
          breakpointLarge={{
            fontSize: FontSize.Size3,
          }}
          breakpointExtraLarge={{
            fontSize: FontSize.Size2,
          }}
        >
          This label moves
        </Layout>
      </Layout>
    </Layout>
  );
}
