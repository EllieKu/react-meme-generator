import React, { useState, useRef } from "react"
import Draggable from 'react-draggable'

type DraggableImageProps = {
  value: string
}

export default function DraggableImage({ value }: DraggableImageProps) {
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * https://github.com/react-grid-layout/react-draggable/blob/v4.4.2/lib/DraggableCore.js#L159-L171
   */
  const nodeRef = useRef(null);
  const [activeDrags, setActiveDrags] = useState(0)
  const [src, setSrc] = useState("")
  
  const onStart = () => {
    setActiveDrags(prev => prev += 1)
  }

  const onStop = () => {
    setActiveDrags(prev => prev -= 1)
  }

  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault()
  }


  return (
    <Draggable
      nodeRef={nodeRef}
      onStart={() => onStart()}
      onStop={() => onStop()}
    >
      <img
        className="absolute w-full"
        ref={nodeRef}
        src={value}
        onDragStart={(e) => preventDragHandler(e)}
      />
    </Draggable>
  )
}