import React, { useState, useRef, ChangeEvent, useEffect } from "react"
import DraggableText from '../components/DraggableText'
import DraggableImage from '../components/DraggableImage'
import { FormControl, MenuItem, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const config = {
  content: '範例文字',
  fontFamily: [
    {
      label: "微軟雅黑",
      value: "Microsoft YaHei"
    },
    {
      label: "草書",
      value: "cursive"
    },
  ],
  color: '#000000'
}
interface TextSettingProps extends Setting{
  changeText: (newSetting: Setting) => void
}

type Setting = {
  content:string,
  fontFamily:string
  color:string,
}

const TextSetting = (
  {
    color:colorProps,
    content: contentProps,
    fontFamily: fontFamilyProps,
    changeText
  }: TextSettingProps
) => {
  const [content, setContent] = useState(contentProps)
  const [color, setColor] = useState(colorProps)
  const [fontFamily, setFontFamily] = useState(fontFamilyProps);

  const changeFontFamily = (event: SelectChangeEvent) => {
    setFontFamily(event.target.value as string);
  };

  useEffect(() => {
    changeText({
      color,
      content,
      fontFamily,
    })
  }, [color, content, fontFamily])

  return (
    <>
      <div className="flex flex-row mb-2 items-center">
        <label className="pr-3 basis-24">內容</label>
        <TextField
          id="standard-basic"
          variant="standard"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex flex-row mb-2 items-center">
        <label className="pr-3 basis-24">字型</label>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={fontFamily}
            onChange={changeFontFamily}
            sx={{padding: 'unset'}}
          >
            {
              config.fontFamily.map(el => (
                <MenuItem
                  key={el.value}
                  value={el.value}>{el.label}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-row mb-2">
        <label className="pr-3 basis-24">顏色</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </>
  )
}

export default function Create() {
  const [imgSrc, setImgSrc] = useState("")
  const [textSetting, setTextSetting] = useState({
    content: config.content,
    fontFamily: config.fontFamily[0].value,
    color: config.color
  })
  const inputRef = useRef<HTMLInputElement>(null)

  function upload(event: ChangeEvent): void {
    const fileList = (event.target as HTMLInputElement).files as FileList
    const file: File = fileList[0]

    setImgSrc(window.URL.createObjectURL(file))
  }

  function invokeInput(): void {
    inputRef.current!.click()
  }

  const changeTextSetting = (newSetting:Setting) => {
    setTextSetting(newSetting)
  }

  return (
    <div className="container flex m-5">
      <section>
        <div className="box-border h-56 w-56 border-4 overflow-hidden static">
          <div className="h-96 w-96 relative object-center">
            <DraggableImage value={imgSrc} />
            <DraggableText
              content={textSetting.content}
              fontFamily={textSetting.fontFamily}
              color={textSetting.color}
            />
          </div>
          <input
            type="file"
            id="fileItem"
            accept="image/*"
            ref={inputRef}
            onChange={(e) => upload(e)}
            style={{display: 'none'}}
          />
        </div>
        <button className="w-14 bg-500" onClick={() => invokeInput()}>
          上傳
        </button>
      </section>
      <section className="pr-4 pl-4 grow">
        <TextSetting
          content={textSetting.content}
          fontFamily={textSetting.fontFamily}
          color={textSetting.color}
          changeText={changeTextSetting}
        />
      </section>
    </div>
  )
}
