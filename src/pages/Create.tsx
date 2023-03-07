import React, { ChangeEvent, ReactNode, useState, useRef } from "react"
import DraggableText from '../components/DraggableText'
import DraggableImage from '../components/DraggableImage'
import { Button, Container, FormControl, Input, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';

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
  color: '#000000',
  width: 300,
  height: 200,
}

type TextSettingProps = {
  content:string,
  fontFamily:string
  color:string,
  changeSetting: (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void
}

type RowProps = {
  children: ReactNode,
}

const Row = ({ children }:RowProps) => {
  return (
    <div className="flex flex-row items-center mb-2">
      {children}
    </div>
  )
}

const TextSetting = (
  {
    color,
    content,
    fontFamily,
    changeSetting,
  }: TextSettingProps
) => {

  return (
    <Grid>
      <Row>
        <label className="pr-3 basis-24">內容</label>
        <TextField
          name="content"
          variant="standard"
          value={content}
          onChange={(e) => changeSetting(e)}
        />
      </Row>
      <Row>
        <label className="pr-3 basis-24">字型</label>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            name="fontFamily"
            value={fontFamily}
            onChange={(e) => changeSetting(e)}
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
      </Row>
      <Row>
        <label className="pr-3 basis-24">顏色</label>
        <input
          name="color"
          type="color"
          value={color}
          onChange={(e) => changeSetting(e)}
        />
      </Row>
    </Grid>
  )
}

export default function Create() {
  const [imgSrc, setImgSrc] = useState("")
  const [params, setParams] = useState({
    content: config.content,
    fontFamily: config.fontFamily[0].value,
    color: config.color,
    width: config.width,
    height: config.height,
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

  const changeParam = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target

    setParams((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: '40px',
      }}
    >
      <Grid container spacing={2}>
        <Grid sm={10} md={6}>
          <div className="box-border h-56 w-56 border-4 overflow-hidden relative">
            <DraggableImage value={imgSrc} />
            <DraggableText
              content={params.content}
              fontFamily={params.fontFamily}
              color={params.color}
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
          <Button
            variant="contained"
            onClick={() => invokeInput()}
          >
            上傳
          </Button>
        </Grid>
        <Grid>
          <TextSetting
            content={params.content}
            fontFamily={params.fontFamily}
            color={params.color}
            changeSetting={changeParam}
          />
          <Row>
            <label className="pr-3 basis-24">圖片尺寸</label>
            <FormControl
              sx={{ mr: 3, width: 120 }}
              variant="standard"
            >
              <Input
                name="width"
                startAdornment={<InputAdornment position="start">寬</InputAdornment>}
                endAdornment={<InputAdornment position="end">px</InputAdornment>}
                value={params.width}
                onChange={(e) => changeParam(e)}
              />
            </FormControl>
            <FormControl
              sx={{ width: 120 }}
              variant="standard"
            >
              <Input
                name="height"
                startAdornment={<InputAdornment position="start">高</InputAdornment>}
                endAdornment={<InputAdornment position="end">px</InputAdornment>}
                value={params.height}
                onChange={(e) => changeParam(e)}
              />
            </FormControl>
          </Row>
        </Grid>
      </Grid>
    </Container>
  )
}
