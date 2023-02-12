import { useState, useRef, ChangeEvent } from "react"
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
      <img
        src={src}
        alt="Image Preview"
        onLoad={() => loaded()}
      />
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