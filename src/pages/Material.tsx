import React from 'react';
import { Container, ImageList, ImageListItem, Tooltip, IconButton, Box } from '@mui/material'

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

export default function Material() {
  const imgList = generateImageList({ start: 0, end: 63, baseURL: BASE_URL })

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
              src={`${img}?w=161&crop&auto=format`}
              srcSet={`${img}?w=161&&auto=format&dpr=2 2x`}
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
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
}
