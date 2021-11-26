import { Grid, GridProps, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

type CardProps = GridProps;

const Card = ({ children, ...props }: CardProps) => {
  const backgroundColor = useColorModeValue(undefined, "gray.700");

  const contraGridStyle: Partial<GridProps> = {
    padding: 4,
    borderRadius: 16,
    borderWidth: `2px`,
    borderColor: "black",
    boxShadow: "0px 6px 0px black",
    backgroundColor,
  };

  return (
    <Grid {...contraGridStyle} {...props}>
      {children}
    </Grid>
  );
};

export default Card;
