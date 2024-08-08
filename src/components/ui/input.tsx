import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // You can extend InputProps if needed
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [filled, setFilled] = React.useState<boolean>(false);

    // Update filled state based on value prop
    React.useEffect(() => {
      setFilled(value !== "" && value !== undefined);
    }, [value]);

    // Handle input change and update filled state
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilled(event.target.value !== "");
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <input
        {...props}
        ref={ref}
        value={value} // Ensure the value prop is passed down
        onChange={handleInputChange}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 focus:outline-none",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
