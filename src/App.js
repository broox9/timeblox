import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Container, Icon } from 'pcln-design-system'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './history'

import AppContext, { Consumer } from './AppContext'
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
        <Router history={history}>
          <FlexWrap flexDirection='row' justify="flex-start" align="stretch">
            <Toolbar />
            <Container p={3} width={1} mx={2} style={{ overflowY: 'auto' }}>
              <DragRegion>
                <Flex justify="center" my={2} align="center">
                  <Icon name="timer" size={30} color="orange" />
                  <Heading.h2 ml={2}>TimeBlox</Heading.h2>
                </Flex>
              </DragRegion>
              <Consumer>
                {context => (
                  <Switch>
                    <Route path="/" exact render={context.openLogs}/>
                    <Route path="/form/:type" render={context.openForm}/>
                    <Route path="/edit/:id" render={context.openEdit}/>
                    <Route path="/charts" render={context.openVisualizations}/>
                    <Route path="/settings" render={context.openSettings} /> 
                    {/* <Redirect to="/" />    */}
                  </Switch>
                )}
              </Consumer>
            </Container>
         </FlexWrap>
        </Router>
      </AppContext>
    )
  }
}
