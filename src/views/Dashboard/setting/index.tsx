import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DashboardWrapper, {
  DashboardWrapperMain
} from '../../../components/dashboard-wrapper/DashboardWrapper';
import Card from '../../../components/card/card';
import { form } from '../../../config/constants';
import type { AppDispatch } from '../../../config/store';
import { getDataIdsFromAPI } from '../../../config/store/action';
import { ActionType } from '../../../config/store/action/globalActionType';
import Form from '../components/form/Form';

const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDataIdsFromAPI(form.settings.collection, ActionType.SET_SETTINGS)).catch(() => {});
  }, [dispatch]);

  return (
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
};

export default Settings;
