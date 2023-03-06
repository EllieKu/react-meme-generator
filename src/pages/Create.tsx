import React, { ChangeEvent, ReactNode, useState, useRef, useEffect } from "react"
import DraggableText from '../components/DraggableText'
import DraggableImage from '../components/DraggableImage'
import { Button, FormControl, Input, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
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

interface TextSettingProps extends Setting{
  changeSetting: (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  changeFont: (e:SelectChangeEvent) => void

}

type Setting = {
  content:string,
  fontFamily:string
  color:string,
}

interface RowProps {
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
    changeFont
  }: TextSettingProps
) => {

  return (
    <Grid>
      <Row>
        <label className="pr-3 basis-24">內容</label>
        <TextField
          id="param-content"
          variant="standard"
          value={content}
          onChange={(e) => changeSetting(e)}
        />
      </Row>
      <Row>
        <label className="pr-3 basis-24">字型</label>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            value={fontFamily}
            onChange={(e) => changeFont(e)}
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
          id="param-color"
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

  const changeFontFamily = (e: SelectChangeEvent) => {
    const newParam = {
      fontFamily: e.target.value
    }

    setParams((prev) => {
      return {
        ...prev,
        ...newParam
      }
    })
  }

  const changeParam = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newParam = {}

    if (e.target.id === 'param-content') {
      newParam = {
        content: e.target.value
      }
    } else if (e.target.id === 'param-color') {
      newParam = {
        color: e.target.value
      }
    } else if (e.target.id === 'param-height') {
      newParam = {
        height: e.target.value
      }
    } else if (e.target.id === 'param-width') {
      newParam = {
        width: e.target.value
      }
    }

    setParams((prev) => {
      return {
        ...prev,
        ...newParam
      }
    })
  }

  return (
    <div className="container flex m-5">
      <section>
        <div className="box-border h-56 w-56 border-4 overflow-hidden static">
          <div className="h-96 w-96 relative object-center">
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
        </div>
        <Button
          variant="contained"
          onClick={() => invokeInput()}
        >
          上傳
        </Button>
      </section>
      <section className="pr-4 pl-4 grow">
        <TextSetting
          content={params.content}
          fontFamily={params.fontFamily}
          color={params.color}
          changeSetting={changeParam}
          changeFont={changeFontFamily}
        />
        <Row>
          <label className="pr-3 basis-24">圖片尺寸</label>
          <FormControl
            sx={{ mr: 3, width: 120 }}
            variant="standard"
          >
            <Input
              id="param-width"
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
              id="param-height"
              startAdornment={<InputAdornment position="start">高</InputAdornment>}
              endAdornment={<InputAdornment position="end">px</InputAdornment>}
              value={params.height}
              onChange={(e) => changeParam(e)}
            />
          </FormControl>
        </Row>
      </section>
    </div>
  )
}
