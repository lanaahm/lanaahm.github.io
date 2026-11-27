import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { SiAseprite } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardWrapper, {
  DashboardWrapperMain
} from '../../../components/dashboard-wrapper/DashboardWrapper';
import SummaryBox, {
  SummaryBoxSpecial
} from '../../../components/summary-box/SummaryBox';
import Table from '../../../components/table/Table';
import Badge from '../../../components/badge/Badge';
import Card from '../../../components/card/card';
import Skeleton from '../../../components/skeleton/Skeleton';
import type { AppDispatch, RootState } from '../../../config/store';
import { ActionType } from '../../../config/store/action/globalActionType';
import { getDataFromAPI, getDataIdsFromAPI } from '../../../config/store/action';
import { form } from '../../../config/constants';
import type { PortfolioItem } from '../../../types/domain';
import {
  buildContentOverview,
  buildDashboardSummary
} from '../../../utils/dashboardMetrics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PORTFOLIO_TABLE_HEADERS = ['Title', 'Description', 'Links', 'Status'];

const renderPortfolioRow = (item: PortfolioItem) => (
  <tr key={item.id}>
    <td>{item.title}</td>
    <td>{item.description}</td>
    <td>{Array.isArray(item.link) ? item.link.length : 0}</td>
    <td>
      <Badge type="success" content="published" />
    </td>
  </tr>
);

const Main: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { portfolio, experience, certification, employeeHistory, isLoading } = useSelector(
    (state: RootState) => state
  );

  useEffect(() => {
    Promise.allSettled([
      dispatch(getDataIdsFromAPI(form.settings.collection, ActionType.SET_SETTINGS)),
      dispatch(getDataFromAPI(form.portfolio.collection, ActionType.SET_PORTFOLIO)),
      dispatch(getDataFromAPI(form.experience.collection, ActionType.SET_EXPERIENCE)),
      dispatch(getDataFromAPI(form.certification.collection, ActionType.SET_CERTIFICATION)),
      dispatch(getDataFromAPI(form.employeeHistory.collection, ActionType.SET_EMPLOYEEHISTORY))
    ]);
  }, [dispatch]);

  const metricsInput = { portfolio, experience, certification, employeeHistory };
  const summaryCards = buildDashboardSummary(metricsInput);
  const contentOverview = buildContentOverview(metricsInput);
  const showSkeleton = isLoading && portfolio.length === 0 && experience.length === 0;

  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <div className="col-8 col-md-12">
            <div className="row">
              {showSkeleton
                ? [0, 1, 2, 3].map((slot) => (
                    <div className="col-6 col-md-6 col-sm-12 mb" key={slot}>
                      <Skeleton theme="light" width="100%" height={140} borderRadius="20px" />
                    </div>
                  ))
                : summaryCards.map((item) => (
                    <div className="col-6 col-md-6 col-sm-12 mb" key={item.title}>
                      <SummaryBox item={item} />
                    </div>
                  ))}
            </div>
          </div>
          <div className="col-4 hide-md">
            {showSkeleton ? (
              <Skeleton theme="light" width="100%" height={300} borderRadius="20px" />
            ) : (
              <SummaryBoxSpecial item={contentOverview} />
            )}
          </div>
          <div className="col-12">
            <Card
              title="Portfolio Overview"
              button={{
                action: () => navigate('/dashboard/portfolio'),
                title: <SiAseprite />
              }}
            >
              {showSkeleton ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[0, 1, 2, 3].map((row) => (
                    <Skeleton key={row} theme="light" width="100%" height={36} />
                  ))}
                </div>
              ) : (
                <Table
                  headData={PORTFOLIO_TABLE_HEADERS}
                  bodyData={portfolio}
                  renderBody={renderPortfolioRow}
                />
              )}
            </Card>
          </div>
        </div>
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

export default Main;
