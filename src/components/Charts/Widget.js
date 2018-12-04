import React from 'react'
import styled from 'styled-components'
import {Box} from 'pcln-design-system'

const WidgetBox = styled(Box)`
  background-color: rgba(0,0,0, 0.05);
  margin: 8px;
  border: 1px solid #212121;
  /* border: 1px solid #ccc; */

  h3, h5 {
    text-align: center;
    margin: 4px auto;
  }
`

export default function Widget(props) {
  return (
    <WidgetBox>
      <h3 className="widget-title">{props.title}</h3>
      <h5>{props.totalsTitle}</h5>
      {props.children}
    </WidgetBox>
  )
}