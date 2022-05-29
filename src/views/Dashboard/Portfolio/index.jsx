import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DashboardWrapper, {
  DashboardWrapperMain
} from '../../../components/dashboard-wrapper/DashboardWrapper';
import { getDataFromAPI } from '../../../config/store/action';
import { form } from '../../../config/constants';
import { useModal } from '../../../components/modal/Modal';
import { ActionType } from '../../../config/store/action/globalActionType';
import Section from '../components/Section/Section';

const Portfolio = (props) => {
  const { portfolio, getDataFromAPIs } = props;
  const { isShowing: isShowingPortfolioAdd, toggle: toggleModalPortfolioAdd } =
    useModal();
  const {
    isShowing: isShowingPortfolioUpdate,
    toggle: toggleModalPortfolioUpdate
  } = useModal();

  useEffect(() => {
    const fetchDataPortfolio = async () => {
      await getDataFromAPIs(
        form.portfolio.collection,
        ActionType.SET_PORTFOLIO
      ).catch((err) => err);
    };
    fetchDataPortfolio();
  }, [getDataFromAPI]);

  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <Section
          title="Portfolio"
          data={portfolio}
          formData={form.portfolio}
          isShowingModalAdd={isShowingPortfolioAdd}
          isShowingModalUpdate={isShowingPortfolioUpdate}
          toggleModalAdd={toggleModalPortfolioAdd}
          toggleModalUpdate={toggleModalPortfolioUpdate}
        />
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

const mapStateToProps = (state) => ({
  portfolio: state.portfolio
});

const mapDispatchToProps = (dispatch) => ({
  getDataFromAPIs: (data, type) => dispatch(getDataFromAPI(data, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
