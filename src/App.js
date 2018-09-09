import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Container, Icon } from 'pcln-design-system'

import AppContext, { Consumer } from './AppContext'
import Toolbar from './components/Toolbar'


const FlexWrap = styled(Flex)`
  flex-grow: 1;
  padding: 0;
  height: 100vh;
`

export default class App extends React.Component {

  render() {
    return (
      <AppContext>
        <FlexWrap flexDirection='row' justify="flex-start" align="stretch">
          <Toolbar />
          <Container p={2} width="90%" mx="auto" style={{ overflowY: 'auto' }}>
            <Flex justify="center" my={2} align="center">
              <Icon name="timer" size={30} color="orange" />
              <Heading.h2 ml={2}>TimeBlox</Heading.h2>
            </Flex>
            <Consumer>
              {context => context.state.currentPage}
            </Consumer>
          </Container>
        </FlexWrap>
      </AppContext>
    )
  }
}
