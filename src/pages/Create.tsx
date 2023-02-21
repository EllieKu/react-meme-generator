<<<<<<< Updated upstream
function Create() {
  function upload() {
    const file = document.getElementById('fileItem') as HTMLElement
    console.log(file)
  }

  return (
    <>
      <div>圖片框</div>
=======
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
>>>>>>> Stashed changes
      <input
        type="file"
        id="fileItem"
        accept="image/*"
        onChange={() => upload()}
      />
<<<<<<< Updated upstream
    </>
=======
      <button
        className="w-14 bg-emerald-500"
        onClick={() => click()}
      >
        上傳
      </button>
    </div>
>>>>>>> Stashed changes
  )
}
