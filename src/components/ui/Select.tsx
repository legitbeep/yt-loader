import {
  FormControl,
  Select,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  SelectProps,
  HelpTextProps,
  FormControlProps,
} from "@chakra-ui/react";

type CustomSelectProps = {
  helperText?: HelpTextProps["children"];
  formControlWidth?: FormControlProps["width"];
} & Pick<FormControlProps, "isInvalid" | "label"> &
  SelectProps;

const contraSelectStyle: Partial<SelectProps> = {
  borderWidth: "2px",
  borderRadius: "12",
  size: "lg",
  borderColor: "black",
};

const CustomSelect = ({
  label,
  isInvalid,
  helperText,
  formControlWidth,
  ...selectProps
}: CustomSelectProps) => (
  <FormControl isInvalid={isInvalid} width={formControlWidth}>
    {label && <FormLabel>{label}</FormLabel>}
    <Select {...contraSelectStyle} {...selectProps}>
      <option value="mp4">MP4 / Video</option>
      <option value="mp3">MP3 / Audio</option>
    </Select>
    {helperText && (
      <FormHelperText color="red.400">{helperText}</FormHelperText>
    )}
  </FormControl>
);

export default CustomSelect;
