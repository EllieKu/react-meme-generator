import { ImageList, ImageListItem } from '@mui/material'

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
    <>
      <h1>Material</h1>
      <ImageList variant="masonry" cols={3} gap={8}>
        {img_list.map((img) => (
          <ImageListItem key={img}>
            <img
              src={`${img}?w=161&crop&auto=format`}
              srcSet={`${img}?w=161&&auto=format&dpr=2 2x`}
              alt={img}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  )
}
