import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Badge, Icon } from 'pcln-design-system'

import { Consumer } from '../AppContext'

const ToolBarWrapper = styled(Box)`
  background-color: ${props => props.theme.colors.darkGray};
  flex-grow: 0;
`

const TestMode = styled(Badge)`
  cursor: pointer;
  margin-bottom: 16px;
  align-self: 'flex-end';

  &:hover {
    background-color: ${props => props.theme.colors.black}
  }
`

const NavIcon = styled(Icon)`
  color: ${props => props.theme.colors.lightGray};
  cursor: pointer;
  margin-bottom: 16px;
`

export default class ToolBar extends React.Component {
  render() {

    return (
      <Consumer>
        {context => {
          const bg = context.state.testMode ? 'gray' : 'darkGray'
          return (
            <ToolBarWrapper width={65} py={2} px={1}>
              <Flex flexDirection='column' align='center' >
                <TestMode bg={bg} onClick={context.toggleTestMode}>test</TestMode>
                <NavIcon name="list" size={24} onClick={context.openLogs} />
                <NavIcon name="tune" size={20} onClick={context.openSettings} />
                <NavIcon name="searchRecent" size={20} onClick={context.openSettings} />
              </Flex>
            </ToolBarWrapper>
          )
        }
        }
      </Consumer>
    )
  }
}