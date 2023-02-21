import Draggable from 'react-draggable'
import { Component } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

type WithDraggableMethodProps = {
  value: string
}

type MyState = {
  activeDrags: number
}

export default function WithDraggableMethod(WrappedComponent: ReactJSXElement) {
  return class extends Component<MyProps, MyState> {
    state: MyState = { 
      activeDrags: 0
    }

    onStart() {
      this.setState((state) => ({
        activeDrags: ++state.activeDrags
      }))
    }
  
    onStop() {
      this.setState((state) => ({
        activeDrags: --state.activeDrags
      }))
    }
  

    render() {
      return (
        <WrappedComponent
          onStart={this.onStart}
          onStop={this.onStop}
          {...this.props}
        />
      )
    }
  }
}