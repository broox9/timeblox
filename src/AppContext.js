import React from 'react'

import { getData, saveLog, setTestMode, saveAll } from './helpers/csv-functions'
import {
  prepData,
  pieChartByType,
  pieChartByTypeToday,
  pieChartByTypeThisWeek,
} from './helpers/chart-functions'
import LogList from './components/LogList'
import LogForm from './components/LogForm'
import Settings from './components/Settings'
import Visualizations from './components/Visualizations'

const { Provider, Consumer } = React.createContext()

export { Consumer }

export default class AppContext extends React.Component {
  state = {
    testMode: false,
    currentPage: null,
    logs: []
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.logs) {
      window.setTimeout(prepData, 0, this.state.logs);
    }
  }
  toggleTestMode = () => {
    const testMode = !this.state.testMode;
    setTestMode(testMode)
    const logs = getData();
    return <LogList logs={logs} editFn={this.openEdit} />

    // this.setState({ testMode, currentPage, logs })
  }

  openSettings = props => {
    return <Settings />
  }

  openLogs = props => {
    console.log('logs', this.state.logs)
    return <LogList logs={this.state.logs} editFn={this.openEdit} />
  }

  openForm = props => {
    console.log('props', props)
    return <LogForm event_type={props.match.params.type} handleSubmit={this.processLogs} />
  }

  openEdit = props => {
    console.log('edit props', props)
    const event_index = parseInt(props.match.params.id)
    const log = this.state.logs[event_index]
    console.log('EDIT LOG', typeof event_index, event_index, log)
    return <LogForm {...log} event_index={event_index} handleSubmit={this.processLogs} />
  }

  openVisualizations = props => {
    const pieData = pieChartByType(this.state.logs)
    const pieDataToday = pieChartByTypeToday(this.state.logs)
    const pieDataWeek = pieChartByTypeThisWeek(this.state.logs)
    const barDataMonth = pieChartByType(this.state.logs)
    return (
      <Visualizations
        pieData={pieData}
        pieDataToday={pieDataToday}
        pieDataWeek={pieDataWeek}
        barDataMonth={barDataMonth}
      />
    )
    this.setState({ currentPage })
  }

  processLogs = data => {
    const { event_index } = data
    const logs = this.state.logs.slice(0)
    if (event_index < 0) {
      logs.push(data)
      saveLog(data)
    } else {
      logs[parseInt(event_index)] = data
      saveAll(logs)
    }
    console.log('save', data)
    this.setState({ logs }, () => this.openLogs())
  }

  componentDidMount() {
    const logs = getData()
    this.setState({ logs })
    // prepData(logs)
    console.log(' by type ', pieChartByType(logs))
  }

  render() {
    const { openForm, openEdit, toggleTestMode, openLogs, openSettings, openVisualizations, processLogs } = this
    const valueObj = {
      state: this.state,
      toggleTestMode,
      openForm,
      openLogs,
      openEdit,
      openVisualizations,
      openSettings,
      processLogs,
    }
    return (
      <Provider value={valueObj}>
        {this.props.children}
      </Provider>
    )
  }
}