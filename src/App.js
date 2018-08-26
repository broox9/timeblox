import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Heading, Container, Icon } from 'pcln-design-system'

import AppContext, { Consumer } from './AppContext'
import Toolbar from './components/Toolbar'
import TypeButtons from './components/TypeButtons'


const FlexWrap = styled(Flex)`
  flex-grow: 1;
  padding: 0;
  height: 100vh;
`

export default class App extends React.Component {
  
  createLog = data => {
    console.log('SAVING', data)
    // const logs = saveLog(data)
    // if (logs) {
    //  this.setState({logs, currentPage: <LogList logs={logs} />})
    // }
  }

  render() {
    return(
      <AppContext>
        <FlexWrap flexDirection='row' justify="flex-start" align="stretch">
          <Toolbar />
          <Container p={2} maxWidth={800} mx="auto" style={{overflowY: 'scroll'}}>
            <Flex justify="flex-start" my={2} align="center">
              <Icon name="timer" size={30} color="orange" />
              <Heading.h4 ml={2}>TimeBlox</Heading.h4>
            </Flex>
            <Box my={2}>
              <TypeButtons />
            </Box>
            <Consumer>
              { context => context.state.currentPage }
            </Consumer>
          </Container>
        </FlexWrap>
      </AppContext>
    )
  }
}
