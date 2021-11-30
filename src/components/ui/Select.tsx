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

type Option = {
  name: string;
  value: string;
  id?: string;
};

type CustomSelectProps = {
  helperText?: HelpTextProps["children"];
  formControlWidth?: FormControlProps["width"];
  options: Array<Option>;
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
  options,
  ...selectProps
}: CustomSelectProps) => (
  <FormControl isInvalid={isInvalid} width={formControlWidth}>
    {label && <FormLabel>{label}</FormLabel>}
    <Select {...contraSelectStyle} {...selectProps}>
      {options.map((op) => (
        <option key={op.value} value={op.value}>
          {op.name}
        </option>
      ))}
    </Select>
    {helperText && (
      <FormHelperText color="red.400">{helperText}</FormHelperText>
    )}
  </FormControl>
);

export default CustomSelect;
