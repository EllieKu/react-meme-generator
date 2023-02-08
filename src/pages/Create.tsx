function Create() {
  function upload() {
    const file = document.getElementById('fileItem') as HTMLElement
    console.log(file)
  }

  return (
    <>
      <div>圖片框</div>
      <input
        type="file"
        id="fileItem"
        accept="image/*"
        onChange={() => upload()}
      />
    </>
  )
}

export default Create