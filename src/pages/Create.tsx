import { useState, useRef, ChangeEvent } from "react"
import Draggable from 'react-draggable'

function Create() {
  const [src, setSrc] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function upload(event: ChangeEvent): void {
    const fileList = (event.target as HTMLInputElement).files as FileList
    const file: File = fileList[0]

    setSrc(window.URL.createObjectURL(file))
  }

  function loaded(): void {
    window.URL.revokeObjectURL(src)
  }

  function click(): void {
    inputRef.current!.click()
  }

  return (
    <>
      <div className="box-border h-56 w-56 border-4 overflow-hidden">
        <div className="h-96 w-96">
          <Draggable bounds="parent">
            <img
              src={src}
              alt="Image Preview"
              onLoad={() => loaded()}
            />
          </Draggable>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={(e) => upload(e)}
        style={{display: 'none'}}
      />
      <button onClick={() => click()}>上傳</button>
    </>
  )
}

export default Create