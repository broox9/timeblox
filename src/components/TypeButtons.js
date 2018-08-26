import React from 'react'
import styled from 'styled-components'
import { Button } from 'pcln-design-system'

import { Consumer } from '../AppContext'
import { timeTypes } from '../time-functions'

const StyledButton = styled(Button)`
 margin-right: ${props => props.theme.space[2]}px;
 text-transform: capitalize;
 outline: none;
`

const TypeButtons = () => (
  <Consumer>
    { context => timeTypes.map((t, i) => 
    <StyledButton name={t} key={i} size="small" onClick={context.openForm}>Add {t}</StyledButton>) }
  </Consumer>
)

export default TypeButtons