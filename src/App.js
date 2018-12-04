import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'pcln-design-system'

import AppContext, { Consumer } from './AppContext'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import DragRegion from './atoms/DragRegion'


const FlexWrap = styled(Flex)`
  flex-grow: 1;
  padding: 0;
  height: 100vh;

  * {
    box-sizing: border-box;
  }
`

export default class App extends React.Component {
  render() {
    return (
      <AppContext>
        <FlexWrap flexDirection='row' justify="flex-start" align="stretch">
          <Toolbar />
          <Box p={3} width={1} mx={3} style={{overflowY: 'auto'}}>
            <DragRegion>
                <Header />
            </DragRegion>
            <Consumer>
              {context => context.state.currentPage}
            </Consumer>
          </Box>
        </FlexWrap>
      </AppContext>
    )
  }
}
