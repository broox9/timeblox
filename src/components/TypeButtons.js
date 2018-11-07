import React from 'react'
import styled from 'styled-components'
import { Button } from 'pcln-design-system'
import { Redirect } from 'react-router-dom'

import { Consumer } from '../AppContext'
import { timeTypes } from '../helpers/time-functions'

const StyledButton = styled(Button)`
 margin-right: ${props => props.theme.space[2]}px;
 text-transform: capitalize;
 outline: none;
`

const redirectTo = e => {
  console.log(e.currentTarget.name)
  const redirectName = `/form/${e.currentTarget.name.replace(/\s/g, '_')}`
  return <Redirect to={redirectName} />
}

const TypeButtons = () => (
  <Consumer>
    { context => timeTypes.map((t, i) => 
      <StyledButton name={t} key={i} size="small" onClick={redirectTo}>Add {t}</StyledButton>
    )}
  </Consumer>
)

export default TypeButtons