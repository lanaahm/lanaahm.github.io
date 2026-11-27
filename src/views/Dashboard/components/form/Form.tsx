import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MdAddCircle } from 'react-icons/md';
import { HiMinusCircle } from 'react-icons/hi';
import Skeleton from '../../../../components/skeleton/Skeleton';
import type { AppDispatch, RootState } from '../../../../config/store';
import { addDataToAPI, updateDataToAPI } from '../../../../config/store/action';
import { uploadPortfolioImage, uploadResumePdf } from '../../../../services/supabaseService';
import type { FormInputConfig, PortfolioLinkEntry, TableName } from '../../../../types/domain';
import './form.scss';

export interface FormProps {
  type: 'ADD' | 'UPDATE';
  inputs: FormInputConfig[];
  collection: TableName;
  hide?: () => void;
}

const DEFAULT_AVATAR = 'https://github.com/identicons/avatars.png';
const FULL_WIDTH_IDS = new Set(['description', 'cv_url', 'image', 'link']);

const parseLinkEntry = (rawUrl: string): PortfolioLinkEntry | null => {
  try {
    const domain = new URL(rawUrl).hostname.replace('www.', '').replace('.com', '');
    return { [domain]: rawUrl };
  } catch {
    return null;
  }
};

const Form: React.FC<FormProps> = ({ type, inputs, collection, hide }) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const stateSlice = useSelector((state: RootState) => state);

  const [fields, setFields] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_AVATAR);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [linkItems, setLinkItems] = useState<Array<PortfolioLinkEntry | null>>([null]);

  useEffect(() => {
    if (type !== 'UPDATE') return;
    const pathId = location.pathname.split('/')[3];
    const collections: Record<TableName, unknown[]> = {
      employee_history: stateSlice.employeeHistory,
      certification: stateSlice.certification,
      experience: stateSlice.experience,
      portfolio: stateSlice.portfolio,
      settings: stateSlice.settings
    };
    const targetId = collection === 'settings' ? '0' : pathId;
    const found = (
      collections[collection] as Array<{ id: string; link?: PortfolioLinkEntry[]; image?: string }>
    ).find((item) => item.id === targetId);

    if (found) {
      setFields({ ...found });
      if (found.image) setPreviewUrl(found.image);
      if (collection === 'portfolio' && Array.isArray(found.link)) {
        setLinkItems(found.link.length ? found.link : [null]);
      }
    }
  }, [type, collection, location.pathname, stateSlice]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    if (event.target instanceof HTMLInputElement && event.target.type === 'file' && event.target.files?.[0]) {
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
      setImageFile(event.target.files[0]);
    }
    setFields((prev) => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (value: string, index: number) => {
    const next = [...linkItems];
    next[index] = parseLinkEntry(value);
    setLinkItems(next);
    setFields((prev) => ({ ...prev, link: next.filter(Boolean) }));
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    inputs.forEach((input) => {
      if (!fields[input.id] && !(input.imageUpload && imageFile)) {
        nextErrors[input.id] = '*Please enter this field.';
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (type === 'ADD' && !validate()) return;

    try {
      const payload = { ...fields };
      if (imageFile) {
        payload.image = await uploadPortfolioImage(imageFile);
      }
      if (pdfFile) {
        payload.cv_url = await uploadResumePdf(pdfFile);
        setPdfFile(null);
      }

      if (type === 'ADD') {
        await dispatch(addDataToAPI(collection, payload));
        setFields({});
        setErrors({});
        hide?.();
      } else {
        const recordId = String(payload.id || (collection === 'settings' ? '0' : ''));
        await dispatch(updateDataToAPI(collection, { id: recordId, fields: payload }));
        if (collection === 'settings') alert('Data has saved');
        else hide?.();
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Save failed.');
    }
  };

  if (type === 'UPDATE' && stateSlice.isLoading && Object.keys(fields).length === 0) {
    return (
      <div className="form-wrapper form-wrapper--skeleton">
        {inputs.map((input) => (
          <div
            className={`form-skeleton-item ${FULL_WIDTH_IDS.has(input.id) ? 'form-field--full' : ''}`}
            key={input.id}
          >
            <Skeleton theme="light" width="35%" height={14} />
            <Skeleton theme="light" width="100%" height={input.id === 'description' ? 96 : 42} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => {
          const fullClass = FULL_WIDTH_IDS.has(input.id) ? 'form-field--full' : '';
          if (input.imageUpload) {
            return (
              <div className={`form-field ${fullClass}`} key={input.id}>
                <div className="input-wrapper">
                  <img id="imageUpload" src={previewUrl} alt="cover" width={150} height={150} />
                  <label htmlFor={input.id}>{input.label}</label>
                  <input id={input.id} type="file" onChange={handleChange} />
                </div>
                <div className="errorMsg">{errors[input.id]}</div>
              </div>
            );
          }
          if (input.category) {
            return (
              <div className={`form-field ${fullClass}`} key={input.id}>
                {linkItems.map((entry, idx) => (
                  <Fragment key={`${input.id}-${idx}`}>
                    <div className="input-wrapper input-wrapper--inline">
                      <label htmlFor={`${input.id}-${idx}`} style={{ width: '100%' }}>
                        {input.label}
                      </label>
                      <input
                        id={`${input.id}-${idx}`}
                        className="category"
                        type="text"
                        placeholder={input.placeholder || ''}
                        defaultValue={entry ? Object.values(entry)[0] : ''}
                        onChange={(e) => handleCategoryChange(e.target.value, idx)}
                      />
                      {idx === 0 ? (
                        <button type="button" onClick={() => setLinkItems((prev) => [...prev, null])}>
                          <MdAddCircle />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setLinkItems((prev) => prev.filter((_, i) => i !== idx))}
                        >
                          <HiMinusCircle />
                        </button>
                      )}
                    </div>
                  </Fragment>
                ))}
                <div className="errorMsg">{errors[input.id]}</div>
              </div>
            );
          }
          if (input.type === 'select' && input.options) {
            return (
              <div className={`form-field ${fullClass}`} key={input.id}>
                <div className="input-wrapper">
                  <label htmlFor={input.id}>{input.label}</label>
                  <select
                    id={input.id}
                    value={String(fields[input.id] ?? input.options[0]?.value ?? '')}
                    onChange={handleChange}
                  >
                    {input.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="errorMsg">{errors[input.id]}</div>
              </div>
            );
          }
          return (
            <div className={`form-field ${fullClass}`} key={input.id}>
              <div className="input-wrapper">
                <label htmlFor={input.id}>{input.label}</label>
                {input.id === 'description' ? (
                  <textarea
                    id={input.id}
                    placeholder={input.placeholder || ''}
                    value={String(fields[input.id] ?? '')}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder || ''}
                      value={String(fields[input.id] ?? '')}
                      onChange={handleChange}
                    />
                    {input.pdfUpload && (
                      <input
                        type="file"
                        accept="application/pdf"
                        aria-label="Upload CV PDF to Supabase Storage"
                        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      />
                    )}
                  </>
                )}
              </div>
              <div className="errorMsg">{errors[input.id]}</div>
            </div>
          );
        })}
        <div className="form-actions">
          <button type="submit" className="btn button">
            {type === 'UPDATE' ? 'Save Changes' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
