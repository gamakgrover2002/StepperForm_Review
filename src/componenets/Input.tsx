import { Data } from "../model/Data";
import { ControllerRenderProps } from "react-hook-form";

interface InputProps {
  type: string;
  className: string;
  placeholder: string;
  field: ControllerRenderProps<Data, className>;
}

const Input: React.FC<InputProps> = ({
  type,
  className,
  placeholder,
  field,
}) => {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      {...field}
    />
  );
};

export default Input;
