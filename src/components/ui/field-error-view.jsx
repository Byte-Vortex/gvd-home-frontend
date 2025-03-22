import { useMemo } from "react"
import { Dialog, DialogPanel, DialogTitle, DialogTrigger } from "./dialog"

export function FieldErrorView({ error }) {

  const flatErrors = useMemo(() => {
    const errorArr = [];

    if (error?.types) {
      Object.values(error.types).forEach((err) => {
        if (!Array.isArray(err)) return errorArr.push(err)
        err.forEach((entry) => errorArr.push(entry))
      })
    }
    return errorArr
  }, [error])

  if (!error?.types && !error?.message) return null;


  if ((flatErrors.length === 0 && error.message) || flatErrors.length === 1) {
    const err = flatErrors?.[0] ?? error.message
    return <span className="-bottom-5 text-xs font-medium text-destructive">{err}</span>
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="-bottom-5 text-xs font-medium text-destructive">
          There are {flatErrors.length} errors! view
        </button>
      </DialogTrigger>
      <DialogPanel className="flex flex-col gap-6">
        <DialogTitle>Field Errors</DialogTitle>
        <ul className="text-destructive list-disc list-inside">
          {flatErrors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      </DialogPanel>
    </Dialog>
  )
}
