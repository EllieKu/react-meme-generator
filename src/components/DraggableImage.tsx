import { useState, useRef } from "react"
import Draggable from 'react-draggable'
import WithDraggableMethod from "./WithDraggableMethod";

type DraggableImageProps = {
  value: string
}

function DraggableImage({ value }: DraggableImageProps) {
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * Unfortunately, in order for <Draggable> to work properly, we need raw access
   * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
   * https://github.com/react-grid-layout/react-draggable/blob/v4.4.2/lib/DraggableCore.js#L159-L171
   */
  const [src, setSrc] = useState("")
  
  const nodeRef = useRef(null);

  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault()
  }

  function loaded(): void {
    window.URL.revokeObjectURL(value)
  }

  return (
    <Draggable
      bounds="parent"
      nodeRef={nodeRef}
    >
      <img
        className="w-6/12 h-6/12 absolute"
        ref={nodeRef}
        src={value}
        onDragStart={(e) => preventDragHandler(e)}
        onLoad={() => loaded()}
      />
    </Draggable>
  )
}

const FinalComponent = WithDraggableMethod(DraggableImage)
export default FinalComponent