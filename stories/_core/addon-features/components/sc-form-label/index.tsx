import { styled } from "@storybook/theming";

export const ScFormLabel = styled.label`
  font-size: ${(props) => props.theme.typography.size.s2}px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 0.5rem;

  input {
    cursor: pointer;
    margin-right: 0.5rem;
  }
`;
