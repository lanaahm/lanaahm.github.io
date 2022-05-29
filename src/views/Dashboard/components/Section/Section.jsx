import React from 'react';

import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SiAseprite } from 'react-icons/si';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import { deleteDataToAPI } from '../../../../config/store/action';

import Table from '../../../../components/table/Table';
import Badge from '../../../../components/badge/Badge';
import Card from '../../../../components/card/card';

import ModalForm from '../ModalForm/ModalForm';

const Section = ({
  title,
  data,
  formData,
  isShowingModalAdd,
  isShowingModalUpdate,
  toggleModalAdd,
  toggleModalUpdate,
  deleteData
}) => {
  const navigate = useNavigate();

  const updateDataToAPI = (e, itemIds) => {
    e.preventDefault();
    navigate(itemIds);
    toggleModalUpdate();
  };
  const deleteExperienToAPI = (e, itemIds) => {
    e.preventDefault();
    deleteData(formData.collection, itemIds);
  };
  const renderData = (item, index) => (
    <tr key={index}>
      {formData.inputs.map((atIndex, i) => {
        if (atIndex.id === 'link') {
          return (
            <td key={`${index.toString()} ${i.toString()}`}>
              {JSON.stringify(item[atIndex.id])}
            </td>
          );
        }
        if (atIndex?.imageUpload) {
          return (
            <td key={`${index.toString()} ${i.toString()}`}>
              <img
                src={item[atIndex.id]}
                alt="avatars"
                width={150}
                height={150}
              />
            </td>
          );
        }
        return (
          <td key={`${index.toString()} ${i.toString()}`}>
            {item[atIndex.id]}
          </td>
        );
      })}
      <td>
        <Badge
          type="warning"
          onClick={(e) => updateDataToAPI(e, item.id)}
          content={<FiEdit />}
        />
        <Badge
          type="danger"
          onClick={(e) => deleteExperienToAPI(e, item.id)}
          content={<FiTrash2 />}
        />
      </td>
    </tr>
  );

  return (
    <>
      {/* Begin Modal */}
      <ModalForm
        isShowing={isShowingModalAdd}
        hide={toggleModalAdd}
        title={`Add ${title}`}
        type="ADD"
        inputs={formData.inputs}
        collection={formData.collection}
      />
      <ModalForm
        isShowing={isShowingModalUpdate}
        hide={toggleModalUpdate}
        title={`Update ${title}`}
        type="UPDATE"
        inputs={formData.inputs}
        collection={formData.collection}
      />
      {/* End Modal */}
      <div className="row">
        <div className="col-12">
          <Card
            title={title}
            button={{
              action: toggleModalAdd,
              title: <SiAseprite />
            }}
          >
            {data.length > 0 ? (
              <Table
                headData={formData.header}
                bodyData={data}
                renderBody={(item, index) => renderData(item, index)}
              />
            ) : null}
          </Card>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteData: (dataCollection, dataField) =>
    dispatch(deleteDataToAPI(dataCollection, dataField))
});

export default connect(null, mapDispatchToProps)(Section);
