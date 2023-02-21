import { useState, useRef, ChangeEvent } from "react"
import Draggable from 'react-draggable'
import WithDraggableMethod from "./WithDraggableMethod";

type DraggableTextProps = {
  value: string
}

function DraggableText({ value }: DraggableTextProps) {
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * Unfortunately, in order for <Draggable> to work properly, we need raw access
   * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
   * https://github.com/react-grid-layout/react-draggable/blob/v4.4.2/lib/DraggableCore.js#L159-L171
   */
  const [text, setText] = useState(value)
  
  const nodeRef = useRef(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <Draggable
      bounds="parent"
      nodeRef={nodeRef}
    >
      <input
        className="absolute cursor-move text"
        ref={nodeRef}
        value={text}
        onChange={(e) => onChange(e)}
      />
    </Draggable>
  )
}

const FinalComponent = WithDraggableMethod(DraggableText)
export default FinalComponent