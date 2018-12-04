import React from 'react'
import { VictoryChart, VictoryBar, VictoryPie } from 'victory'
import { Box, Flex } from 'pcln-design-system'
import { compareAsc } from 'date-fns';
import styled from 'styled-components'
import PageTitle from '../atoms/PageTitle'
import { colorScale } from '../helpers/chart-functions'

import Widget from './Charts/Widget'

const labelStyle = { fontSize: 12, fill: 'white' }

const GridParent = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: 48% 48%;
  grid-template-rows: 48% 48%;
`

const hoursAndMinutes = (minutes) => `${parseInt(minutes/60)}h ${minutes % 60}m`
const daysHoursMinutes = (minutes) => {
  const day = 60 * 8
  return `${parseInt(minutes / day)} work days ${hoursAndMinutes(minutes % day)}`
}

/** @TODO: Do this Async with WebWorkers and/or Promises */
export default class extends React.Component {
  pieChartLabel = ({x, y, total}) => `
    ${x}
    ${Math.round((y/total) * 100)}% (${hoursAndMinutes(y)})
  `
  
  render() {
    console.log('Visual', this.props)
    const {pieDataToday, pieDataWeek, pieData, barDataMonth} = this.props;
    const dayHoursMinutes = hoursAndMinutes(pieDataToday[0].total)
    const weekHoursMinutes = hoursAndMinutes(pieDataWeek[0].total)
    const monthHoursMinutes = daysHoursMinutes(pieData[0].total)

    return (
      <Box>
        <PageTitle>Time Data</PageTitle>
        <GridParent>
          <Widget title="Data for the Day" totalsTitle={dayHoursMinutes}>
            <VictoryPie
              data={this.props.pieDataToday}
              colorScale={colorScale}
              height={300}
              name="Today by Type"
              standalone={true}
              style={{ labels: labelStyle }}
              labels={this.pieChartLabel}
            />
          </Widget>
          <Widget title="Data for the Week" totalsTitle={weekHoursMinutes}>
            <VictoryPie
              data={this.props.pieDataWeek}
              colorScale={colorScale}
              height={300}
              name="Today by Type"
              standalone={true}
              style={{ labels: labelStyle }}
              labels={this.pieChartLabel}
            />
          </Widget>           
          <Widget title="Data for the Month" totalsTitle={monthHoursMinutes}>
            <VictoryPie
              data={this.props.pieData}
              colorScale={colorScale}
              height={300}
              name="Month by Type"
              standalone={true}
              style={{ labels: labelStyle }}
              labels={this.pieChartLabel}
            />
          </Widget>
          <Widget title="Minutes by Time Type">
            <VictoryChart domainPadding={8}>
              <VictoryBar 
                style={{ data: {fill: 'green'}, labels: labelStyle }}
                data={this.props.barDataMonth}
              />
            </VictoryChart>
          </Widget>
        </GridParent>
      </Box>

    )
  }
}