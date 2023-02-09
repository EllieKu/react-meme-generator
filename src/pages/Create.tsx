function Create() {
  const file = document.getElementById('fileItem') as HTMLElement

  function upload(e) {
    console.log(e.target.files[0])
  }

  return (
    <>
      <img id="previewImage" src="" alt="Image Preview"/>
      <input
        type="file"
        id="fileItem"
        accept="image/*"
        onChange={(e) => upload(e)}
      />
    </>
  )
}

export default Create