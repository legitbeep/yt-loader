import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  HelpTextProps,
  Input,
  InputProps,
} from "@chakra-ui/react";

type CustomInputProps = {
  helperText?: HelpTextProps["children"];
  formControlWidth?: FormControlProps["width"];
} & Pick<FormControlProps, "label" | "isInvalid"> &
  InputProps;

export const contraInputStyle: Partial<InputProps> = {
  borderColor: "black",
  borderRadius: 12,
  borderWidth: 2,
  size: "lg",
};

const CustomInput = ({
  label,
  formControlWidth,
  isInvalid,
  helperText,
  ...inputProps
}: CustomInputProps) => (
  <FormControl isInvalid={isInvalid} width={formControlWidth}>
    {label && <FormLabel>{label}</FormLabel>}
    <Input {...contraInputStyle} {...inputProps} />
    {helperText && (
      <FormHelperText color="red.400">{helperText}</FormHelperText>
    )}
  </FormControl>
);

export default CustomInput;
