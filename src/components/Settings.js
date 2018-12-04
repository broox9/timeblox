import React from 'React'
import PropTypes from 'prop-types'
import { Box, Input, FormField, Label, InputGroup, Button, Icon } from 'pcln-design-system'
// import Icon from 'feather-icons-react'
import settings from 'electron-settings'
import styled from 'styled-components'
import { remote } from 'electron'

import { setCurrentFile, getCurrentFile } from '../helpers/csv-functions';
import PageTitle from '../atoms/PageTitle'

export default class Settings extends React.Component {
  openFolderDialog = e => {
    e.preventDefault()
    console.log(remote.dialog)
    remote.dialog.showOpenDialog({
      defaultPath: `${process.env.HOME}/Desktop`,
      buttonLabel: 'Select A Folder',
      properties: ['openDirectory', 'createDirectory'],
      message: 'Set The folder to save Your files'
    }, this.setFilePath)
  }

  openFileDialog = e => {
    e.preventDefault()
    remote.dialog.showOpenDialog({
      defaultPath: `${process.env.HOME}/Desktop`,
      buttonLabel: 'Select A File',
      properties: ['openFile'],
      message: 'Set file to use'
    }, this.setCurrentFile)    
  }

  state = {
    defaultFolder: settings.get('defaultFolder'),
    currentFile: getCurrentFile()
  }

  setFilePath = fp => {
    settings.set('defaultFolder', fp)
    this.setState({defaultFolder: fp})
  }

  setCurrentFile = file => {
    this.setState({currentFile: file}, () => {
      setCurrentFile(file, true);
      this.props.handleSubmit()
    });
    
  }
  render() {
    return (
      <Box style={{maxWidth: 768}} mx="auto">
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
            <Button size="small" onClick={this.openFolderDialog}>change</Button>
          </InputGroup>
          <InputGroup>
            <FormField>
              <Label htmlFor="folder">current file</Label>
              <Icon name="laptop" />
              <Input readonly type="text" id="folder" value={this.state.currentFile} placeholder="set current file" />
            </FormField>
            <Button size="small" onClick={this.openFileDialog}>select</Button>
          </InputGroup>
        </form>
      </Box>
    )
  }
}
