import React from 'react'
import styled from 'styled-components'
import { Button } from 'pcln-design-system'
import { Redirect } from 'react-router-dom'
import history from '../history'

import { Consumer } from '../AppContext'
import { timeTypes } from '../helpers/time-functions'

const StyledButton = styled(Button)`
 margin-right: ${props => props.theme.space[2]}px;
 text-transform: capitalize;
 outline: none;
`

const redirectTo = e => {
  const redirectName = `/form/${e.currentTarget.name.replace(/\s/g, '_')}`
  console.log(e.currentTarget.name, redirectName, history)
  // return <Redirect to={redirectName} />
  history.push(redirectName, {})
}

const TypeButtons = () => (
  <Consumer>
    { context => timeTypes.map((t, i) => 
      <StyledButton name={t} key={i} size="small" onClick={redirectTo}>Add {t}</StyledButton>
    )}
  </Consumer>
)

export default TypeButtons