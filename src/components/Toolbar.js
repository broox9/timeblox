import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Badge } from 'pcln-design-system'
import Icon from 'feather-icons-react'
import { Link } from 'react-router-dom'

import { Consumer } from '../AppContext'
import DragRegion from '../atoms/DragRegion'

const ToolBarWrapper = styled(Flex)`
  background-color: ${props => props.theme.colors.darkGray};
  flex-grow: 0;
  min-width: 72px;
  height: 100%;
`

const TestMode = styled(Badge)`
  cursor: pointer;
  margin-top: 16px;
  justify-self: flex-end;

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
            <DragRegion>
              <ToolBarWrapper pt="40px" px={2} justify="flex-start" flexDirection='column' align='center'>
                <Link to="/"><NavIcon icon="list" size={24} onClick={context.openLogs} /></Link>
                <Link to="/settings"><NavIcon icon="settings" size={20} /></Link>
                <Link to="/charts"><NavIcon icon="pie-chart" size={20} /></Link>
                <TestMode bg={bg} onClick={context.toggleTestMode}>test</TestMode>
              </ToolBarWrapper>
            </DragRegion>
          )
        }
        }
      </Consumer>
    )
  }
}
