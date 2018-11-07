import React from 'React'
import PropTypes from 'prop-types'
import { Box, Input, FormField, Label, InputGroup, Button, Icon, Heading } from 'pcln-design-system'
// import Icon from 'feather-icons-react'
import settings from 'electron-settings'
import styled from 'styled-components'
import { remote } from 'electron'

import PageTitle from '../atoms/PageTitle'

export default class Settings extends React.Component {
  openDialog = e => {
    e.preventDefault()
    console.log(remote.dialog)
    remote.dialog.showOpenDialog({
      defaultPath: `${process.env.HOME}/Desktop`,
      buttonLabel: 'Select A Folder',
      properties: ['openDirectory', 'createDirectory'],
      message: 'Set The folder to save Your files'
    }, this.setFilePath)
  }

  chooseFile = e => {
    e.preventDefault()
    remote.dialog.showOpenDialog({
      defaultPath: `${process.env.HOME}/Desktop`,
      buttonLabel: 'Select A Folder',
      properties: ['openFile', 'createFile'],
      message: 'Set The folder to save Your files'
    }, this.setFile)
  }

  state = {
    defaultFolder: settings.get('defaultFolder')
  }

  setFile = file => console.log(file)

  setFilePath = fp => {
    settings.set('defaultFolder', fp)
    this.setState({defaultFolder: fp})
  }
  render() {
    return (
      <Box width={1} >
        <PageTitle>Settings</PageTitle>
        <form>
          <InputGroup>
            <FormField>
              <Label htmlFor="uname">name</Label>
              <Icon name="user" />
              <Input type="text" id="uname" />
            </FormField>
            <FormField>
              <Label htmlFor="email">email</Label>
              <Icon name="email" />
              <Input type="email" id="email" />
            </FormField>
          </InputGroup>
          <InputGroup>
            <FormField>
              <Label htmlFor="folder">default folder</Label>
              <Icon name="laptop" />
              <Input readonly type="text" id="folder" value={this.state.defaultFolder} placeholder="set default folder"/>
            </FormField>
            <Button size="small" onClick={this.openDialog}>change</Button>
          </InputGroup>
        </form>


        <Button onClick={this.chooseFile}>Change Data</Button>
      </Box>
    )
  }
}
