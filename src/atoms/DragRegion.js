import React from 'react';
import { Box } from 'pcln-design-system';
import styled from 'styled-components'

const DragRegion = styled(Box)`
  cursor: grab;
  -webkit-app-region: drag;

  &:active {
    cursor: grabbing;
  }
`

export default DragRegion
