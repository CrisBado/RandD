import * as React from "react";
import { TextField } from "@radix-ui/themes";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  withClearButton: boolean;
  onChange: (value: string, event?: InputEvent) => void;
}

export default React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, placeholder, value, onChange, withClearButton = false },
    ref
  ) => {
    const clearInput = () => {
      onChange("");
    };

    return (
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          ref={ref}
          size="3"
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <TextField.Slot>
          {withClearButton && value && (
            <button type="button" onClick={clearInput}>
              Clear
            </button>
          )}
        </TextField.Slot>
      </TextField.Root>
    );
  }
);
