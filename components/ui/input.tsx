import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    setValue: React.Dispatch<React.SetStateAction<any>>
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, setValue, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium " htmlFor={label?.toLowerCase()}>
          {label}
        </Label>
        <input
          type={type}
          id={label?.toLowerCase()}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
            )}
            ref={ref}
            onChange={e => setValue(e.target.value)}
          {...props}
          />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
