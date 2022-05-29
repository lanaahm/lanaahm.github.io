import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DashboardWrapper, {
  DashboardWrapperMain
} from '../../../components/dashboard-wrapper/DashboardWrapper';
import { getDataFromAPI } from '../../../config/store/action';
import { form } from '../../../config/constants';
import { useModal } from '../../../components/modal/Modal';
import Section from '../components/Section/Section';
import { ActionType } from '../../../config/store/action/globalActionType';

const Experien = (props) => {
  const { employeeHistory, certification, experience, getDataFromAPIs } = props;
  const {
    isShowing: isShowingEmployeeHisAdd,
    toggle: toggleModalEmployeeHisAdd
  } = useModal();
  const {
    isShowing: isShowingEmployeeUpdate,
    toggle: toggleModalEmployeeUpdate
  } = useModal();
  const {
    isShowing: isShowingCertificationAdd,
    toggle: toggleModalCertificationAdd
  } = useModal();
  const {
    isShowing: isShowingCertificationUpdate,
    toggle: toggleModalCertificationUpdate
  } = useModal();
  const {
    isShowing: isShowingExperienceAdd,
    toggle: toggleModalExperienceAdd
  } = useModal();
  const {
    isShowing: isShowingExperienceUpdate,
    toggle: toggleModalExperienceUpdate
  } = useModal();

  useEffect(() => {
    const fetchDataEmployee = async () => {
      await getDataFromAPIs(
        form.employeeHistory.collection,
        ActionType.SET_EMPLOYEEHISTORY
      ).catch((err) => err);
    };
    fetchDataEmployee();

    const fetchDataCertification = async () => {
      await getDataFromAPIs(
        form.certification.collection,
        ActionType.SET_CERTIFICATION
      ).catch((err) => err);
    };
    fetchDataCertification();
    const fetchDataExperience = async () => {
      await getDataFromAPIs(
        form.experience.collection,
        ActionType.SET_EXPERIENCE
      ).catch((err) => err);
    };
    fetchDataExperience();
  }, [getDataFromAPI]);

  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <Section
          title="Employee History"
          data={employeeHistory}
          formData={form.employeeHistory}
          isShowingModalAdd={isShowingEmployeeHisAdd}
          isShowingModalUpdate={isShowingEmployeeUpdate}
          toggleModalAdd={toggleModalEmployeeHisAdd}
          toggleModalUpdate={toggleModalEmployeeUpdate}
        />
        <Section
          title="Certification"
          data={certification}
          formData={form.certification}
          isShowingModalAdd={isShowingCertificationAdd}
          isShowingModalUpdate={isShowingCertificationUpdate}
          toggleModalAdd={toggleModalCertificationAdd}
          toggleModalUpdate={toggleModalCertificationUpdate}
        />
        <Section
          title="Experience"
          data={experience}
          formData={form.experience}
          isShowingModalAdd={isShowingExperienceAdd}
          isShowingModalUpdate={isShowingExperienceUpdate}
          toggleModalAdd={toggleModalExperienceAdd}
          toggleModalUpdate={toggleModalExperienceUpdate}
        />
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

const mapStateToProps = (state) => ({
  employeeHistory: state.employeeHistory,
  certification: state.certification,
  experience: state.experience
});

const mapDispatchToProps = (dispatch) => ({
  getDataFromAPIs: (data, type) => dispatch(getDataFromAPI(data, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Experien);
