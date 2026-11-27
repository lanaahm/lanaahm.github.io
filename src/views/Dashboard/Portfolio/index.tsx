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

const Portfolio: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const portfolio = useSelector((state: RootState) => state.portfolio);
  const addModal = useModal();
  const updateModal = useModal();

  useEffect(() => {
    dispatch(getDataFromAPI(form.portfolio.collection, ActionType.SET_PORTFOLIO)).catch(() => {});
  }, [dispatch]);

  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <Section
          title="Portfolio"
          data={portfolio}
          formData={form.portfolio}
          isShowingModalAdd={addModal.isShowing}
          isShowingModalUpdate={updateModal.isShowing}
          toggleModalAdd={addModal.toggle}
          toggleModalUpdate={updateModal.toggle}
        />
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

export default Portfolio;
