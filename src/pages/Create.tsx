import { useState, useRef, ChangeEvent } from "react"
import DraggableText from '../components/DraggableText'
import DraggableImage from '../components/DraggableImage'

export default function Create() {
  const [src, setSrc] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function upload(event: ChangeEvent): void {
    const fileList = (event.target as HTMLInputElement).files as FileList
    const file: File = fileList[0]

    setSrc(window.URL.createObjectURL(file))
  }

  function click(): void {
    inputRef.current!.click()
  }

  return (
    <div className="container">
      <div className="box-border h-56 w-56 border-4 overflow-hidden static">
        <div className="h-96 w-96 relative object-center">
          <DraggableImage value={src} />
          <DraggableText value="父層"/>
          <DraggableText value="父層2"/>
        </div>
      </div>
      <input
        type="file"
        id="fileItem"
        accept="image/*"
        onChange={() => upload()}
      />
      <button
        className="w-14 bg-emerald-500"
        onClick={() => click()}
      >
        上傳
      </button>
    </div>
  )
}
