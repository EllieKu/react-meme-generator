import React, { useState, useRef, DragEvent, WheelEvent } from "react"
import Draggable from "react-draggable"

type DraggableImageProps = {
  value: string
}

export default function DraggableImage({ value }: DraggableImageProps) {
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * https://github.com/react-grid-layout/react-draggable/blob/v4.4.2/lib/DraggableCore.js#L159-L171
   */
  const nodeRef = useRef<HTMLDivElement>(null)
  const [activeDrags, setActiveDrags] = useState(0)
  const [src, setSrc] = useState("")
  const [scale, setScale] = useState(1)

  const onStart = () => {
    setActiveDrags(prev => prev + 1)
  }

  const onStop = () => {
    setActiveDrags(prev => prev - 1)
  }

  const preventDragHandler = (e: DragEvent<HTMLImageElement>) => {
    e.preventDefault()
  }

  const changeScale = (e: WheelEvent<HTMLImageElement>) => {
    const amount = e.deltaY > 0 ? -0.05 : 0.05
    setScale((prev) => {
      if (prev + amount <= 0.1) {
        return prev
      }
      return prev + amount
    })
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      onStart={onStart}
      onStop={onStop}
    >
      <div ref={nodeRef}>
        <img
          className="absolute"
          src={value}
          onDragStart={preventDragHandler}
          onWheel={changeScale}
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </Draggable>
  )
}