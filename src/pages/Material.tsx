import React, { FC, useState } from 'react';
import {
  Container,
  ImageList,
  ImageListItem,
  Box,
} from '@mui/material';
import BaseDialog from '../components/Dialog';

interface ImageProps {
  start: number;
  end: number;
  baseURL: string;
}

const generateImageList = ({ start, end, baseURL }: ImageProps) => {
  const imgList: string[] = [];
  for (let index = start; index <= end; index += 1) {
    const img = `${baseURL}${index}.jpg`;
    imgList.push(img);
  }
  return imgList;
}

const BASE_URL = '/src/assets/images/yinwuBrothers/jpg/'

const Material: FC = () => {
  const imgList = generateImageList({ start: 0, end: 63, baseURL: BASE_URL })
  const [dialogVisible, setDialogVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const showImage = (img: string) => {
    setSelectedImage(img)
    setDialogVisible(true)
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: '40px',
      }}
    >
      <ImageList
        variant="masonry"
        cols={5}
        gap={18}
      >
        {imgList.map((img) => (
          <ImageListItem key={img}>
            <Box
              component="img"
              src={img}
              srcSet={img}
              alt={img}
              loading="lazy"
              sx={{
                width: '100%',
                borderRadius: '4px',
                transition: 'transform 0.3s',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => showImage(img)}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <BaseDialog
        content={
          <Box
            component="img"
            src={selectedImage}
            alt={selectedImage}
          />
        }
        open={dialogVisible}
        confirm={() => setDialogVisible(false)}
      />
    </Container>
  )
}

export default Material