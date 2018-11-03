import React from 'react'
import { VictoryChart, VictoryBar, VictoryPie } from 'victory'
import { Box, Flex } from 'pcln-design-system'
import styled from 'styled-components'
import PageTitle from '../atoms/PageTitle'
import { colorScale } from '../helpers/chart-functions'
import { compareAsc } from 'date-fns';

const labelStyle = { fontSize: 12, fill: 'white'}

/** @TODO: Do this Async with WebWorkers and/or Promises */
export default class extends React.Component {
  pieChartLabel = ({x, y, total}) => {
    console.log(x, (y/total) * 100)
    return `
    ${x}
    ${Math.round((y/total) * 100)}% (${y})
  `}
  render() {
    console.log('Visual', this.props)
    return (
      <Box>
        <PageTitle>Time Data</PageTitle>
        <Flex>
          <Box>
            <h3>Data for the Day</h3>
            <VictoryPie
              data={this.props.pieDataToday}
              colorScale={colorScale}
              height={300}
              name="Today by Type"
              standalone={true}
              style={{ labels: labelStyle }}
              labels={this.pieChartLabel}
            />
          </Box>
          <Box>
            <h3>Data for the Week</h3>
            <VictoryPie
              data={this.props.pieDataWeek}
              colorScale={colorScale}
              height={300}
              name="Today by Type"
              standalone={true}
              style={{ labels: labelStyle }}
              labels={this.pieChartLabel}
            />
          </Box>           
        </Flex>
        <Flex>
          <Box width={1/2}>
            <h3>Data for the Month</h3>
            <VictoryPie
              data={this.props.pieData}
              colorScale={colorScale}
              height={300}
              name="Month by Type"
              standalone={true}
              style={{ labels: labelStyle }}
              labels={this.pieChartLabel}
            />
          </Box>
          <Box>
            <h3>Minutes by Time Type</h3>
            <VictoryChart domainPadding={8}>
              <VictoryBar 
                style={{ data: {fill: 'green'}, labels: labelStyle }}
                data={this.props.barDataMonth}
              />
            </VictoryChart>
          </Box>
        </Flex>
      </Box>

    )
  }
}