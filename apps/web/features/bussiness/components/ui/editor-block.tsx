import { cn } from "@app/ui/lib/utils"
import { ChevronDown, GripVertical } from "lucide-react"
import { createContext, memo, useCallback, useContext, useMemo, useRef, useState } from "react"

// Context Separation: Distinguishing Read (item) from Write (setItem)
// Only components consuming setItem (like EditorBlockTrigger) will not re-render
// on changes to `item`, as they solely subscribe to the stable dispatch context.

type EditorBlockDispatchContextProps = {
  setItem: (value: string) => void
}

type EditorBlockStateContextProps = {
  item: string
}

type EditorBlockItemContextProps = {
  value: string
}

const EditorBlockItemContext = createContext<EditorBlockItemContextProps | null>(null)
const EditorBlockStateContext = createContext<EditorBlockStateContextProps | null>(null)
const EditorBlockDispatchContext = createContext<EditorBlockDispatchContextProps | null>(null)

function useEditorBlockStateContext() {
  const context = useContext(EditorBlockStateContext)
  if (!context) throw new Error("Must be used within EditorBlock")
  return context
}

function useEditorBlockDispatchContext() {
  const context = useContext(EditorBlockDispatchContext)
  if (!context) throw new Error("Must be used within EditorBlock")
  return context
}

function useEditorBlockItemContext() {
  const context = useContext(EditorBlockItemContext)
  if (!context) throw new Error("Must be used within EditorBlockItem")
  return context
}

export const EditorBlock = memo(
  ({
    className,
    children,
    defaultValue,
    ...props
  }: React.ComponentProps<"ul"> & { defaultValue?: string }) => {
    const [item, setItemState] = useState(defaultValue ?? "")

    // Ensures synchronization when defaultValue changes, replacing useEffect to prevent double renders.
    const prevDefaultRef = useRef(defaultValue)
    if (prevDefaultRef.current !== defaultValue) {
      prevDefaultRef.current = defaultValue
      setItemState(defaultValue ?? "")
    }

    // Provides a stable toggle/set handler; its reference never changes,
    // shielding dispatch context consumers from state-driven re-renders.
    const setItem = useCallback((value: string) => {
      setItemState(value)
    }, [])

    const stateValue = useMemo(() => ({ item }), [item])
    // The dispatch value is referentially stable, since setItem is memoized.
    const dispatchValue = useMemo(() => ({ setItem }), [setItem])

    return (
      <EditorBlockStateContext.Provider value={stateValue}>
        <EditorBlockDispatchContext.Provider value={dispatchValue}>
          <ul
            className={cn(
              "space-y-3 animate-in fade-in transition-opacity duration-400 will-change-[opacity]",
              className,
            )}
            {...props}
          >
            {children}
          </ul>
        </EditorBlockDispatchContext.Provider>
      </EditorBlockStateContext.Provider>
    )
  },
)

// EditorBlockItem Component
// This component subscribes to the state context to access `item` for determining
// its open state. The item context provided is memoized based only on `value`.

export const EditorBlockItem = memo(
  ({
    value,
    className,
    children,
    isGrabbing = false,
    isDragging = false,
    ...props
  }: React.ComponentProps<"li"> & {
    isGrabbing?: boolean
    isDragging?: boolean
    value: string
  }) => {
    const { item } = useEditorBlockStateContext()
    const open = item === value

    const contextValue = useMemo(() => ({ value }), [value])

    return (
      <EditorBlockItemContext.Provider value={contextValue}>
        <li
          data-dragging={isDragging}
          data-grabbing={isGrabbing}
          data-slot="editor-block-item"
          data-state={open ? "open" : "closed"}
          className={cn(
            "border rounded-xl bg-background overflow-hidden group/editor-block-item",
            "data-[dragging=true]:border-primary",
            "has-[data-slot=editor-block-content]:overflow-visible",
            "data-[grabbing=true]:pointer-events-none data-[grabbing=true]:cursor-grabbing data-[grabbing=true]:opacity-60",
            className,
          )}
          {...props}
        >
          {children}
        </li>
      </EditorBlockItemContext.Provider>
    )
  },
)

// Presentational Components (No Context Access)
// As these components only consume primitive props and receive no context, they are wrapped with memoization for performance.

export const EditorBlockHeader = memo(({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="editor-block-header"
    className={cn(
      "w-full bg-muted p-5 flex items-center gap-2 justify-between",
      "group-data-[state=open]/editor-block-item:border-b",
      className,
    )}
    {...props}
  />
))

export const EditorBlockGroup = memo(({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="editor-block-group"
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))

export const EditorBlockTitle = memo(({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    data-slot="editor-block-title"
    className={cn("text-sm font-medium text-foreground", className)}
    {...props}
  />
))

export const EditorBlockGrip = memo(
  ({ className, children, ...props }: React.ComponentProps<"span">) => (
    <span
      data-slot="editor-block-grip"
      className={cn(
        "size-8 bg-white border border-gray-300 rounded-full cursor-grab flex-center",
        className,
      )}
      {...props}
    >
      {children ?? <GripVertical className="size-5 shrink-0 text-muted-foreground" />}
    </span>
  ),
)

// EditorBlockTrigger Component
// This component subscribes exclusively to the DISPATCH context, not the state context.
// As a result, it will not re-render in response to changes to `item`, but only if
// the reference to setItem changes (which is prevented by useCallback).

export const EditorBlockTrigger = memo(
  ({ children, className, ...props }: React.ComponentProps<"button">) => {
    const { setItem } = useEditorBlockDispatchContext()
    const { value } = useEditorBlockItemContext()

    // NOTE: Toggle behavior (prev === value ? "" : value) is implemented here
    // using the functional updater form, so the handler does not need to access
    // potentially stale state directly. This keeps setItem in EditorBlock as a
    // straightforward setter, and the toggle logic is localized here.
    const handleToggle = useCallback(() => {
      // Access to the current `item` state for toggling is achieved via the
      // functional updater pattern. This avoids resubscribing to the state context.
      // Internally, we use a cast to call setItem as a function updater.
      ;(setItem as any)((prev: string) => (prev === value ? "" : value))
    }, [setItem, value])

    return (
      <button
        type="button"
        onClick={handleToggle}
        data-slot="editor-block-trigger"
        className={cn("size-8 bg-white border border-gray-300 rounded-full flex-center", className)}
        {...props}
      >
        {children ?? (
          <ChevronDown
            className={cn(
              "transition-transform text-muted-foreground",
              "group-data-[state=open]/editor-block-item:rotate-180",
            )}
          />
        )}
      </button>
    )
  },
)

export const EditorBlockContent = memo(
  ({ className, children, ...props }: React.ComponentProps<"div">) => (
    <div
      data-slot="editor-block-content"
      className={cn(
        "group-data-[state=open]/editor-block-item:max-h-500",
        "group-data-[state=closed]/editor-block-item:max-h-0",
        "transition-[max-height] duration-200 ease-in-out overflow-hidden",
      )}
      {...props}
    >
      <div
        className={cn(
          "@container/editor-block-content p-5 has-[>[data-slot=editor-block-footer]]:p-0",
          className,
        )}
      >
        {children}
      </div>
    </div>
  ),
)

export const EditorBlockFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="editor-block-footer"
    className={cn("px-5 py-4 border-t border-border", className)}
    {...props}
  />
)
