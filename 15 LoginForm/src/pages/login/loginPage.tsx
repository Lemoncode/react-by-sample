import * as React from "react"
import {Panel, ContentCenter} from '../../common';
import {Form} from './components/form';

export const LoginPage = () =>
  <ContentCenter>
    <Panel title="Please sign in">
      <Form/>
    </Panel>
  </ContentCenter>

