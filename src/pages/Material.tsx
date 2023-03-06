import React, { Container, ImageList, ImageListItem, Tooltip, IconButton, Box } from '@mui/material'
import { StarOutline } from '@mui/icons-material';
// full of icons: https://mui.com/material-ui/material-icons/

export default function Material() {
  let img_list: string[] = []
  let index: number = 0
  let index_last: number = 63
  let img: string = ''
  const BASE_URL = '/src/assets/images/yinwuBrothers/jpg/'

  while (index <= index_last ) {
    img = `${BASE_URL}${index}.jpg`
    img_list.push(img)
    index += 1
  }

  return (
    <Container maxWidth="md">
      <ImageList variant="masonry" cols={6} gap={8}>
        {img_list.map((img) => (
          <ImageListItem key={img}>
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}
            >
              <Tooltip title="collect">
                <IconButton>
                  <StarOutline />
                </IconButton>
              </Tooltip>
            </Box>
            <img
              src={`${img}?w=161&crop&auto=format`}
              srcSet={`${img}?w=161&&auto=format&dpr=2 2x`}
              alt={img}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
}
