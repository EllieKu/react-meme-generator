import { Container, Tabs, Tab } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [path, setPath] = useState('home')
  const navigate = useNavigate()

  function changePath(path: string):void {
    setPath(path)
    navigate(path)
  }

  return (
    <Container maxWidth="lg">
      <Tabs value={path} aria-label="disabled tabs example">
        <Tab onClick={() => changePath('home')} value="home" label="home" />
        <Tab onClick={() => changePath('create')} value="create" label="create" />
        <Tab onClick={() => changePath('material')} value="material" label="material" />
      </Tabs>
    </Container>
  )
}