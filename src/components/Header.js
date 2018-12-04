import React from 'react';
import styled from 'styled-components'
import { Flex, Icon, Heading } from 'pcln-design-system'

const StickyFlex = styled(Flex)`
  position: sticky;
`

export default function Header() {
  return (
    <StickyFlex justify="center" my={2} align="center" style={{ position: 'sticky' }}>
      <Icon name="timer" size={30} color="orange" />
      <Heading.h2 ml={2}>TimeBlox</Heading.h2>
    </StickyFlex>
  )
}