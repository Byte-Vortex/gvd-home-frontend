import { Controller } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import { cn } from "@/lib/utils"
import { FieldErrorView } from "../ui/field-error-view"


export const ControlledLabeledCheckbox = (props) => {
  return (
    <Controller
      shouldUnregister={props.shouldUnregister}
      rules={props.rules}
      name={props.name}
      control={props.control}
      render={({
        field: { value, onChange, ref, disabled: fieldDisabled },
        fieldState: { error },
      }) => {
        const internalDisabled = props.disabled || fieldDisabled
        return (
          <label className={cn("relative", props.className)}>
            {props.label && (
              <div className="text-sm font-medium mb-1">
                <span>{props.label}</span>
              </div>
            )}

            <div
              className={cn(
                "flex h-10 items-center gap-2 rounded-md bg-background px-2 text-sm duration-150",
                internalDisabled
                  ? "cursor-not-allowed text-muted-foreground opacity-50"
                  : "cursor-pointer",
              )}>
              <Checkbox
                checked={!!value}
                ref={ref}
                onCheckedChange={onChange}
                disabled={internalDisabled}
              />
              <div>Yes</div>
            </div>

            <FieldErrorView error={error} />
          </label>
        )
      }}
    />
  )
}
