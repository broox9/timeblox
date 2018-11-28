import React from 'react'
import { VictoryChart, VictoryBar, VictoryPie } from 'victory'
import { Box, Flex } from 'pcln-design-system'
import { compareAsc } from 'date-fns';
import styled from 'styled-components'
import PageTitle from '../atoms/PageTitle'
import { colorScale } from '../helpers/chart-functions'

import Widget from './Charts/Widget'

const labelStyle = { fontSize: 12, fill: 'white'}

const GridParent = styled(Box)`
  display: grid;
  grid-template-columns: 45%  45%;
  grid-template-rows: 45% 45%;
`

/** @TODO: Do this Async with WebWorkers and/or Promises */
export default class extends React.Component {
  pieChartLabel = ({x, y, total}) => {
    console.log(x, y, total, (y/total) * 100)
    return `
    ${x}
    ${Math.round((y/total) * 100)}% (${y})
  `}
  render() {
    console.log('Visual', this.props)
    return (
      <Box>
        <PageTitle>Time Data</PageTitle>
        <GridParent>
          <Widget title="Data for the Day">
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
          <Widget title="Data for the Week">
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
          <Widget title="Data for the Month">
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