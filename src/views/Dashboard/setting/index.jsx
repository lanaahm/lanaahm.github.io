import React from 'react';

import DashboardWrapper, {
  DashboardWrapperMain
} from '../../../components/dashboard-wrapper/DashboardWrapper';

import { form } from '../../../config/constants';

import Card from '../../../components/card/card';
import Form from '../components/form/Form';

const Settings = () => (
  <DashboardWrapper>
    <DashboardWrapperMain>
      <div className="row">
        <div className="col-12">
          <Card title="Settings">
            <Form
              type="UPDATE"
              inputs={form.settings.inputs}
              collection={form.settings.collection}
            />
          </Card>
        </div>
      </div>
    </DashboardWrapperMain>
  </DashboardWrapper>
);

export default Settings;
