import React from 'react';

import Modal from '../../../../components/modal/Modal';
import Form from '../form/Form';

const ModalForm = ({ isShowing, hide, title, type, inputs, collection }) => (
  <Modal isShowing={isShowing} hide={hide} title={title}>
    <Form type={type} inputs={inputs} hide={hide} collection={collection} />
  </Modal>
);
export default ModalForm;
