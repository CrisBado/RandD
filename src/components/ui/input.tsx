import * as React from "react";
import { TextField } from "@radix-ui/themes";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, value, onChange, ...props }, ref) => {
    return (
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          size="3"
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />
      </TextField.Root>
    );
  }
);
