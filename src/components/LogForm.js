import React from 'React'
import PropTypes from 'prop-types'
import { GreenButton, Input, Label, InputField, InputGroup, Icon, Select } from 'pcln-design-system'

import { timeTypes, today } from '../time-functions'

export default class LogForm extends React.Component {

  static propTypes = {
    event_type: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    event_index: PropTypes.number,
    event_distraction: PropTypes.string,
    event_details: PropTypes.string,
    event_date: PropTypes.string,
    event_time_start: PropTypes.string,
    event_time_end: PropTypes.string,
  }

  static defaultProps = {
    event_index: -1,
    event_type: '',
    index: null,
    event_distraction: '0',
    event_details: '',
    event_date: today(),
    event_time_start: '',
    eventTimeEnd: '',
  }

  state = {
    event_index: this.props.event_index,
    event_type: this.props.event_type,
    event_distraction: this.props.event_distraction,
    event_details: this.props.event_details,
    event_date: this.props.event_date,
    event_time_start: this.props.event_time_start,
    event_time_end: this.props.event_time_end,
  }

  onInput = e => this.setState({ [e.target.id]: e.target.value })

  setTimeTypeOptions = () => timeTypes.map(t => <option value={t}>{t}</option>)

  handleFormSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <InputGroup my={2}>
          <InputField alwaysShowLabel>
            <Label htmlFor="event_type">Event Type</Label>
            <Icon name="event" />
            <Select id="event_type" value={this.state.event_type} onChange={this.onInput}>
              <option>select a type</option>
              {this.setTimeTypeOptions()}
            </Select>
          </InputField>

          <InputField alwaysShowLabel>
            <Label htmlFor="event_distraction">Distraction Level</Label>
            <Icon name="warningOutline" />
            <Select id="event_distraction" value={this.state.event_distraction} onChange={this.onInput}>
              <option value="0">0 - None/Very little</option>
              <option value="1">1 - Medium</option>
              <option value="2">2 - Significant</option>
            </Select>
          </InputField>
        </InputGroup>

        <InputGroup my={2}>
          <InputField>
            <Label htmlFor="event_details">Details</Label>
            <Icon name="coupon" />
            <Input type="text" id="event_details" value={this.state.event_details} onInput={this.onInput} placeholder="meeting name, details, etc" />
          </InputField>

          <InputField>
            <Label htmlFor="event_date">Date</Label>
            <Icon name="calendar" />
            <Input type="date" id="event_date" onInput={this.onInput} value={this.state.event_date} />
          </InputField>
        </InputGroup>

        <InputGroup my={2}>
          <InputField alwaysShowLabel>
            <Label htmlFor="event_time_start">Time Start</Label>
            <Icon name="clock" />
            <Input type="time" id="event_time_start" value={this.state.event_time_start} onChange={this.onInput} />
          </InputField>

          <InputField alwaysShowLabel >
            <Label htmlFor="event_time_end">Time End</Label>
            <Icon name="clock" />
            <Input type="time" id="event_time_end" value={this.state.event_time_end} onInput={this.onInput} />
          </InputField>
        </InputGroup>

        <p>
          <GreenButton fullWidth size="large">Submit Log</GreenButton>
        </p>
      </form>
    )
  }
}
