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
import { connect } from 'react-redux';
import DashboardWrapper, {
  DashboardWrapperMain
} from '../../../components/dashboard-wrapper/DashboardWrapper';
import SummaryBox, {
  SummaryBoxSpecial
} from '../../../components/summary-box/SummaryBox';
import { ActionType } from '../../../config/store/action/globalActionType';
import { getDataIdsFromAPI } from '../../../config/store/action';
import { data, form } from '../../../config/constants';

import Table from '../../../components/table/Table';

import Badge from '../../../components/badge/Badge';
import Card from '../../../components/card/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const latestOrders = {
  header: ['order id', 'user', 'total price', 'date', 'status'],
  body: [
    {
      id: '#OD1711',
      user: 'john doe',
      date: '17 Jun 2021',
      price: '$900',
      status: 'shipping'
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021',
      price: '$400',
      status: 'paid'
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021',
      price: '$200',
      status: 'pending'
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021',
      price: '$400',
      status: 'paid'
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021',
      price: '$200',
      status: 'refund'
    }
  ]
};
const orderStatus = {
  shipping: 'primary',
  pending: 'warning',
  paid: 'success',
  refund: 'danger'
};
const Main = ({ getDataFromAPI }) => {
  useEffect(() => {
    const fetchDataSettings = async () => {
      await getDataFromAPI(
        form.settings.collection,
        ActionType.SET_SETTINGS
      ).catch((err) => err);
    };
    fetchDataSettings();
  }, [getDataFromAPI]);
  const renderOrderHead = (item, index) => <th key={index}>{item}</th>;
  const renderOrderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.user}</td>
      <td>{item.price}</td>
      <td>{item.date}</td>
      <td>
        <Badge type={orderStatus[item.status]} content={item.status} />
      </td>
    </tr>
  );
  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <div className="col-8 col-md-12">
            <div className="row">
              {data.summary.map((item) => (
                <div className="col-6 col-md-6 col-sm-12 mb">
                  <SummaryBox item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-4 hide-md">
            <SummaryBoxSpecial item={data.revenueSummary} />
          </div>
          <div className="col-12">
            <Card
              title="Portfolio"
              button={{ action: () => {}, title: <SiAseprite /> }}
            >
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </Card>
          </div>
        </div>
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getDataFromAPI: (x, type) => dispatch(getDataIdsFromAPI(x, type))
});

export default connect(null, mapDispatchToProps)(Main);
