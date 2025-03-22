import { cn } from "@/lib/utils"
import { Transition, TransitionChild, Dialog as _Dialog } from "@headlessui/react"
import { Slot } from "@radix-ui/react-slot"
import { X } from "lucide-react"
import { Fragment, createContext, forwardRef, useContext, useEffect, useState } from "react"


const DialogContext = createContext({})

const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within an DialogContextProvider")
  }
  return context
}


const Dialog = (props) => {
  const [internalOpenState, setInternalOpenState] = useState(!!props.open)

  useEffect(() => {
    if (props.open !== undefined) {
      setInternalOpenState(props.open)
    }
  }, [props.open])

  function handleOnChange(val) {
    setInternalOpenState(val)
    if (props.onClose) {
      props.onClose(val)
    }
  }

  const isDialogOpen = !!props.open || internalOpenState

  return (
    <DialogContext.Provider value={{ isDialogOpen, handleOnChange }}>
      {props.children}
    </DialogContext.Provider>
  )
}



const DialogPanel = (props) => {
  const { handleOnChange, isDialogOpen } = useDialog()
  return (
    <Transition as={Fragment} show={isDialogOpen}>
      <_Dialog as={"div"} onClose={handleOnChange}>
        <TransitionChild
          as={"div"}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute top-0 z-50 h-screen w-screen items-center justify-center overflow-auto bg-background/90">
          <div className="flex min-h-full w-full items-center justify-center px-4 py-8">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <_Dialog.Panel
                className={cn(
                  "w-full max-w-md transform rounded-2xl border bg-background p-6 text-left align-middle shadow-xl transition-all",
                  props.className,
                )}>
                {props.children}

                <button
                  onClick={() => {
                    handleOnChange(false)
                  }}
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </_Dialog.Panel>
            </TransitionChild>
          </div>
        </TransitionChild>
      </_Dialog>
    </Transition>
  )
}



const DialogTitle = (props) => {
  return (
    <_Dialog.Title
      as="h3"
      className={cn("text-lg font-semibold leading-none tracking-tight", props.className)}>
      {props.children}
    </_Dialog.Title>
  )
}


export const DialogDescription = ({ className, ...props }) => {
  return (
    <_Dialog.Description className={cn("text-sm text-muted-foreground", className)}>
      {props.children}
    </_Dialog.Description>
  )
}



const DialogTrigger = forwardRef(
  ({ asChild, children, ...props }, ref) => {
    const { handleOnChange } = useDialog();

    const Comp = asChild ? Slot : "button"
    return (
      <Comp onClick={handleOnChange.bind(null, true)} ref={ref} type="button" {...props}>
        {children}
      </Comp>
    )
  },
)

DialogTrigger.displayName = "DialogTrigger"

export { Dialog, DialogPanel, DialogTitle, DialogTrigger }
