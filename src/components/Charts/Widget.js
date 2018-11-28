import React from 'react'
import styled from 'styled-components'
import {Box} from 'pcln-design-system'

const WidgetBox = styled(Box)`
  background-color: #001833;
  margin: 0;
  border: 1px solid #ccc;

  h3 {
    text-align: center;
  }
`

export default function Widget(props) {
  return (
    <WidgetBox>
      <h3 className="widget-title">{props.title}</h3>
      {props.children}
    </WidgetBox>
  )
}