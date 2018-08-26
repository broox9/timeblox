import React from 'React'
import PropTypes from 'prop-types'
import { Container, Icon, Input, FormField, Label, InputGroup } from 'pcln-design-system'
import settings from 'electron-settings'
import styled from 'styled-components'

export default class Settings extends React.Component {
  render() {
    return (
      <Container p={3}>
        <form>
          <InputGroup>
            <FormField>
              <Label htmlFor="uname">name</Label>
              <Icon name="emoticon" />
              <Input type="text" id="uname" />
            </FormField>
            <FormField>
              <Label htmlFor="id">email</Label>
              <Icon name="email" />
              <Input type="email" id="email" />
            </FormField>
          </InputGroup>
        </form>
      </Container>
    )
  }
}
