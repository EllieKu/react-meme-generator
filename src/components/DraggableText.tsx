import React, { useState, useRef } from "react"
import { css, jsx } from '@emotion/react'
import Draggable from 'react-draggable'

type DraggableTextProps = {
  content: string,
  fontFamily:string,
  fontSize:number,
  color:string,
}

export default function DraggableText({ content, fontFamily, fontSize, color }: DraggableTextProps) {
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * https://github.com/react-grid-layout/react-draggable/blob/v4.4.2/lib/DraggableCore.js#L159-L171
   */
  const nodeRef = useRef(null);
  const [activeDrags, setActiveDrags] = useState(0)

  const onStart = () => {
    setActiveDrags(prev => prev += 1)
  }

  const onStop = () => {
    setActiveDrags(prev => prev -= 1)
  }

  const colorProps = color

  return (
    <Draggable
      nodeRef={nodeRef}
      onStart={() => onStart()}
      onStop={() => onStop()}
    >
      <span
        className="absolute cursor-move text"
        ref={nodeRef}
        css={{
          color: `${colorProps}`,
          fontFamily: `${fontFamily}`,
          fontSize: `${fontSize}px`
        }}
      >
        {content}
      </span>
    </Draggable>
  )
}