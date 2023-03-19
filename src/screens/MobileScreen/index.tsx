import React from "react";
import MobileParent from "./MobileParent";
import MobileChild from "./MobileChild";

export const MobileScreen: React.FC = props => {
  return (
    <MobileParent {...props}>
      <MobileChild />
    </MobileParent>
  );
};
