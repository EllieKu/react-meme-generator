import React, { ChangeEvent, ReactNode, useState, useRef } from "react"
import DraggableText from '../components/DraggableText'
import DraggableImage from '../components/DraggableImage'
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  Slider,
  TextField
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import Dialog from '../components/Dialog'
import domToImage from 'dom-to-image'

const config = {
  content: '範例文字',
  color: '#000000',
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
  fontSize: 22,
  width: 300,
  height: 200,
}

type TextSettingProps = {
  content:string,
  color:string,
  fontFamily:string,
  fontSize:number,
  changeSetting:(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void,
  changeFontSize: (event: Event, value: number | number[]) => void
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
    fontSize,
    changeSetting,
    changeFontSize,
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
      <Row>
        <label className="pr-3 basis-24">文字大小</label>
        <Box sx={{ width: 200 }}>
          <Slider
            name="fontSize"
            defaultValue={config.fontSize}
            min={12}
            max={40}
            valueLabelDisplay="on"
            onChange={changeFontSize}
          >
          </Slider>
        </Box>
      </Row>
    </Grid>
  )
}

export default function Create() {
  const [imgSrc, setImgSrc] = useState("")
  const [params, setParams] = useState({
    content: config.content,
    color: config.color,
    fontFamily: config.fontFamily[0].value,
    fontSize: config.fontSize,
    width: config.width,
    height: config.height,
  })
  const [dialogVisible, setDialogVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function upload(event: ChangeEvent): void {
    const fileList = (event.target as HTMLInputElement).files as FileList
    const file: File = fileList[0]

    setImgSrc(window.URL.createObjectURL(file))
  }

  function invokeInput(): void {
    inputRef.current!.click()
  }

  const changeParam = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent ) => {
    const { name, value } = e.target

    setParams((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const changeFontSize = (event: Event, value: number | number[]) => {
    setParams((prev) => ({
      ...prev,
      fontSize: value as number
    }))
  }

  const createMeme = () => {
    if (!imgSrc) {
      return setDialogVisible(true)
    }
    const imgNode = document.getElementById("meme") as HTMLElement
    const config = {
      width: params.width,
      height: params.height
    }
    domToImage.toPng(imgNode, config)
      .then((dataUrl:string) => {
        const link = document.createElement('a');
        link.download = 'my-image.png';
        link.href = dataUrl;
        link.click()
      })
      .catch((error:any) => {
        console.error('oops, something went wrong!', error);
      })
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: '40px',
      }}
    >
      <Grid container>
        <Grid sm={10} md={6} mdOffset={1}>
          <div
            css={{
              width: `${params.width}px`,
              height: `${params.height}px`,
              transition: 'all 0.3s ease-in-out',
            }}
            className="border-4 relative box-content"
          >
            <div
              className="h-full w-full relative overflow-hidden"
              id="meme"
            >
              <DraggableImage value={imgSrc} />
              <DraggableText
                content={params.content}
                fontFamily={params.fontFamily}
                fontSize={params.fontSize}
                color={params.color}
              />
            </div>
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
            上傳圖片
          </Button>
          <Button
            variant="contained"
            onClick={createMeme}
          >
            產生梗圖
          </Button>
        </Grid>
        <Grid mdOffset={1}>
          <TextSetting
            content={params.content}
            color={params.color}
            fontFamily={params.fontFamily}
            fontSize={params.fontSize}
            changeSetting={changeParam}
            changeFontSize={changeFontSize}
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
      <Dialog
        title={''}
        content={'請先上傳圖片'}
        open={dialogVisible}
        confirm={(e) => setDialogVisible(e)}
      />
    </Container>
  )
}
