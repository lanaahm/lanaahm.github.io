import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SiAseprite } from 'react-icons/si';
import { FiEdit, FiExternalLink, FiTrash2 } from 'react-icons/fi';
import type { AppDispatch, RootState } from '../../../../config/store';
import { deleteDataToAPI } from '../../../../config/store/action';
import Table from '../../../../components/table/Table';
import Card from '../../../../components/card/card';
import ConfirmModal from '../../../../components/confirm-modal/ConfirmModal';
import ImageSkeleton from '../../../../components/image-skeleton/ImageSkeleton';
import Skeleton from '../../../../components/skeleton/Skeleton';
import type { DomainRecord, FormSectionConfig } from '../../../../types/domain';
import ModalForm from '../ModalForm/ModalForm';

export interface SectionProps<T extends DomainRecord> {
  title: string;
  data: T[];
  formData: FormSectionConfig;
  isShowingModalAdd: boolean;
  isShowingModalUpdate: boolean;
  toggleModalAdd: () => void;
  toggleModalUpdate: () => void;
}

const getRecordLabel = (item: DomainRecord): string => {
  const record = item as unknown as Record<string, unknown>;
  return String(record.title || record.company || record.name || item.id);
};

const Section = <T extends DomainRecord>({
  title,
  data,
  formData,
  isShowingModalAdd,
  isShowingModalUpdate,
  toggleModalAdd,
  toggleModalUpdate
}: SectionProps<T>) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.isLoading);
  const showSkeleton = isLoading && data.length === 0;

  const [pendingDelete, setPendingDelete] = useState<{ id: string; label: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    navigate(id);
    toggleModalUpdate();
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await dispatch(deleteDataToAPI(formData.collection, pendingDelete.id));
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const renderRow = (item: T) => {
    const record = item as unknown as Record<string, unknown>;
    return (
      <tr key={item.id}>
        {formData.inputs.map((input) => {
          const val = record[input.id];
          if (input.id === 'file_url') {
            const href = String(val || '');
            return (
              <td key={input.id}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <FiExternalLink /> View
                  </a>
                ) : (
                  '-'
                )}
              </td>
            );
          }
          if (input.id === 'link') {
            const links = Array.isArray(val) ? val : [];
            return <td key={input.id}>{links.length} link(s)</td>;
          }
          if (input.imageUpload) {
            return (
              <td key={input.id}>
                <div style={{ width: 150 }}>
                  <ImageSkeleton
                    src={String(val || '')}
                    alt="cover"
                    height={100}
                    borderRadius="0.75rem"
                  />
                </div>
              </td>
            );
          }
          return <td key={input.id}>{String(val ?? '')}</td>;
        })}
        <td>
          <div className="table-actions">
            <button
              type="button"
              className="table-action-btn table-action-btn--edit"
              title="Edit"
              aria-label="Edit"
              onClick={(e) => handleEdit(e, item.id)}
            >
              <FiEdit />
            </button>
            <button
              type="button"
              className="table-action-btn table-action-btn--delete"
              title="Delete"
              aria-label="Delete"
              onClick={() => setPendingDelete({ id: item.id, label: getRecordLabel(item) })}
            >
              <FiTrash2 />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
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
      <ConfirmModal
        isShowing={Boolean(pendingDelete)}
        title={`Delete ${title}`}
        message={`Are you sure you want to delete "${pendingDelete?.label || ''}"? This action cannot be undone.`}
        isLoading={deleting}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
      <div className="row">
        <div className="col-12">
          <Card title={title} button={{ action: toggleModalAdd, title: <SiAseprite /> }}>
            {showSkeleton ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[0, 1, 2, 3].map((row) => (
                  <Skeleton key={row} theme="light" width="100%" height={40} />
                ))}
              </div>
            ) : data.length > 0 ? (
              <Table headData={formData.header} bodyData={data} renderBody={renderRow} />
            ) : null}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Section;
