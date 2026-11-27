import React from 'react';
import Modal from '../../../../components/modal/Modal';
import type { FormInputConfig, TableName } from '../../../../types/domain';
import Form from '../form/Form';

export interface ModalFormProps {
  isShowing: boolean;
  hide: () => void;
  title: string;
  type: 'ADD' | 'UPDATE';
  inputs: FormInputConfig[];
  collection: TableName;
}

const ModalForm: React.FC<ModalFormProps> = ({
  isShowing,
  hide,
  title,
  type,
  inputs,
  collection
}) => (
  <Modal isShowing={isShowing} hide={hide} title={title}>
    <Form type={type} inputs={inputs} hide={hide} collection={collection} />
  </Modal>
);

export default ModalForm;
