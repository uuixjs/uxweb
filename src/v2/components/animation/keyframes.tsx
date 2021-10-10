import { StaticTokenMap } from "lib/ui-tokens";
import { keyframes } from "lib/ui-utils";

const space_2 = StaticTokenMap["space-2"];

export const bounce = keyframes`
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.7rem);
  }

  60% {
    transform: translateY(-0.35rem);
  }

  70% {
    transform: translateY(0);
  }

  80% {
    transform: translateY(-0.125rem);
  }

  100% {
    transform: translateY(0);
  }
`;

export const bounceIn = keyframes`
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    transform: scale3d(0.3, 0.3, 0.3);
    opacity: 0;
  }

  60% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
`;

export const bounceOut = keyframes`
 20% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  50%,
  55% {
    transform: scale3d(1.1, 1.1, 1.1);
    opacity: 1;
  }

  to {
    transform: scale3d(0.3, 0.3, 0.3);
    opacity: 0;
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const slideInBottom = keyframes`
  0% {
    transform: translate3d(0, ${space_2}, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

export const slideInLeft = keyframes`
  0% {
    transform: translate3d(-${space_2}, 0, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

export const slideInRight = keyframes`
  0% {
    transform: translate3d(${space_2}, 0, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

export const slideInTop = keyframes`
  0% {
    transform: translate3d(0, -${space_2}, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

export const slideOutBottom = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(0, ${space_2}, 0);
    opacity: 0;
  }
`;

export const slideOutLeft = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(-${space_2}, 0, 0);
    opacity: 0;
  }
`;

export const slideOutRight = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(${space_2}, 0, 0);
    opacity: 0;
  }
`;

export const slideOutTop = keyframes`
 0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(0, -${space_2}, 0);
    opacity: 0;
  }
`;
