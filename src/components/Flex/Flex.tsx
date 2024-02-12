import { ReactNode, CSSProperties } from "react";

interface Props extends CSSProperties {
  children: ReactNode;
}

const Flex = ({ children, ...rest }: Props) => {
  const flexContainerStyle: CSSProperties = {
    display: "flex",
    ...rest,
  };

  return <div style={flexContainerStyle}>{children}</div>;
};

export default Flex;
