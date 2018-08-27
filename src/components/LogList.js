import React from 'react'
import PropTypes from 'prop-types'
import { Container, Icon, IconButton } from 'pcln-design-system'
import styled from 'styled-components'

import { today, months } from '../time-functions'

const StyledTable = styled.table`
  width: 100%;
  font-size: 0.75rem;
  border-collapse: collapse;

  tr {
    vertical-align: middle;
    &:nth-child(2n+1) {
      background-color: ${props => props.theme.colors.darkGray};
    }
  }

  th {
    padding: ${props => props.theme.space[2]}px;
    color: ${props => props.theme.colors.green};
    text-align: left;
  }

  td {
    padding: ${props => props.theme.space[1]}px ${props => props.theme.space[2]}px;
  }
`

const columnHeaders = [
  'Date', 'Start Time', 'End Time', 'Type', 'Notes', 'Distraction', 'edit'
].map((txt, i) => <th key={i}>{txt}</th>)

const alertFn = e => alert(e.target.id + ' to delete')

export default class LogList extends React.Component {
  static propTypes = {
    logs: PropTypes.array,
    editFn: PropTypes.func.isRequired
  }

  makeRows = () => {
    return this.props.logs.length && this.props.logs.map((log, i) => {
      const { event_date, event_time_start, event_time_end, event_type, event_details, event_distraction } = log
      return <tr key={i} data-id={i}>
        <td>{event_date}</td>
        <td>{event_time_start}</td>
        <td>{event_time_end}</td>
        <td>{event_type}</td>
        <td>{event_details}</td>
        <td>{event_distraction}</td>
        <td>
          <IconButton size={12} title="edit" name="edit" id={i} onClick={this.props.editFn} />
          <IconButton size={12} title="delete" name="radioMinus" id={i} onClick={alertFn} />
        </td>
      </tr>
    }) || <tr><td colSpan={columnHeaders.length}>No Log Entries</td></tr>
  }
  render() {
    return (
      <Container>
        <StyledTable>
          <caption>Time Logs</caption>
          <tbody>
            <tr>
              {columnHeaders}
            </tr>
            {this.makeRows()}
          </tbody>
        </StyledTable>
      </Container>
    )
  }
}