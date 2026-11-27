import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardWrapper, {
  DashboardWrapperMain
} from '../../../components/dashboard-wrapper/DashboardWrapper';
import { useModal } from '../../../components/modal/Modal';
import { form } from '../../../config/constants';
import type { AppDispatch, RootState } from '../../../config/store';
import { getDataFromAPI } from '../../../config/store/action';
import { ActionType } from '../../../config/store/action/globalActionType';
import Section from '../components/Section/Section';

const Experien: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employeeHistory, certification, experience } = useSelector(
    (state: RootState) => state
  );

  const empAdd = useModal();
  const empUpdate = useModal();
  const certAdd = useModal();
  const certUpdate = useModal();
  const expAdd = useModal();
  const expUpdate = useModal();

  useEffect(() => {
    Promise.allSettled([
      dispatch(getDataFromAPI(form.employeeHistory.collection, ActionType.SET_EMPLOYEEHISTORY)),
      dispatch(getDataFromAPI(form.certification.collection, ActionType.SET_CERTIFICATION)),
      dispatch(getDataFromAPI(form.experience.collection, ActionType.SET_EXPERIENCE))
    ]);
  }, [dispatch]);

  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <Section
          title="Employee History"
          data={employeeHistory}
          formData={form.employeeHistory}
          isShowingModalAdd={empAdd.isShowing}
          isShowingModalUpdate={empUpdate.isShowing}
          toggleModalAdd={empAdd.toggle}
          toggleModalUpdate={empUpdate.toggle}
        />
        <Section
          title="Certification"
          data={certification}
          formData={form.certification}
          isShowingModalAdd={certAdd.isShowing}
          isShowingModalUpdate={certUpdate.isShowing}
          toggleModalAdd={certAdd.toggle}
          toggleModalUpdate={certUpdate.toggle}
        />
        <Section
          title="Experience"
          data={experience}
          formData={form.experience}
          isShowingModalAdd={expAdd.isShowing}
          isShowingModalUpdate={expUpdate.isShowing}
          toggleModalAdd={expAdd.toggle}
          toggleModalUpdate={expUpdate.toggle}
        />
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

export default Experien;
