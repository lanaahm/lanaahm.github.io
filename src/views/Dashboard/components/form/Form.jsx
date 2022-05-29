/* eslint-disable no-nested-ternary */
import React, { Fragment, useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MdAddCircle } from 'react-icons/md';
import { HiMinusCircle } from 'react-icons/hi';
import { v4 } from 'uuid';
import { addDataToAPI, updateDataToAPI } from '../../../../config/store/action';
import { storage } from '../../../../config/firebase';

import './form.scss';

const Form = ({
  type,
  inputs,
  collection,
  addData,
  updateData,
  employeeHistory,
  certification,
  experience,
  portfolio,
  hide,
  settings
}) => {
  const [state, setState] = useState({
    fields: {},
    errors: {}
  });
  const [url, setUrl] = useState('https://github.com/identicons/avatars.png');
  const [imageUpload, setImageUpload] = useState(null);

  const [items, setItems] = useState([null]);
  const location = useLocation();

  useEffect(() => {
    const pathId = window.location.pathname.split('/')[3];
    let data;

    if (type === 'UPDATE') {
      if (collection === 'EmployeeHistory') {
        data = employeeHistory.find((x) => x.id === pathId);
      } else if (collection === 'Certification') {
        data = certification.find((x) => x.id === pathId);
      } else if (collection === 'Experience') {
        data = experience.find((x) => x.id === pathId);
      } else if (collection === 'Portfolio') {
        data = portfolio.find((x) => x.id === pathId);
        setItems(data.link);
      } else if (collection === 'Settings') {
        data = settings.find((x) => x.id === '0');
      }
      setState({
        ...state,
        fields: data
      });
    }
  }, [location]);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setUrl(URL.createObjectURL(e.target.files[0]));
      setImageUpload(e.target.files[0]);
    }
    setState({
      ...state,
      fields: {
        ...state.fields,
        [e.target.id]: e.target.value
      }
    });
  };

  const handleAddClick = () => {
    setItems([...items, null]);
  };

  const handleRemoveClick = (index) => {
    const list = [...items];
    list.splice(index, 1);
    setItems(list);
  };

  const handleChangeCategory = (e, index) => {
    e.preventDefault();
    const { value } = e.target;
    const list = [...items];

    if (value.includes('.com/')) {
      const getDomain = new URL(value).hostname
        .replace('www.', '')
        .replace('.com', '');
      list[index] = { [getDomain]: value };
      Object.keys(list).forEach((key) => {
        if (list[key] === null) {
          delete list[key];
        }
      });
    }
    setItems(list);
    setState({
      ...state,
      fields: {
        ...state.fields,
        link: list
      }
    });
  };

  const validateForm = () => {
    const errors = {};
    let formIsValid = true;
    inputs.map((input) => {
      if (!state.fields[input.id]) {
        formIsValid = false;
        errors[input.id] = '*Please enter this field.';
        return formIsValid;
      }
      return formIsValid;
    });

    setState({
      ...state,
      errors
    });
    return formIsValid;
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (imageUpload) {
        let downloadURL;
        try {
          const storageRef = ref(storage, `images/${v4()}`);
          const metadata = {
            contentType: 'image/jpeg'
          };
          const uploadTask = await uploadBytes(
            storageRef,
            imageUpload,
            metadata
          );
          downloadURL = await getDownloadURL(uploadTask.ref);
        } catch (error) {
          console.log('ERR ===', error);
          alert('Image uploading failed!');
        }

        // Add a new document with a generated id and images uploaded.
        addData(collection, { ...state.fields, image: downloadURL });
      } else {
        // Add a new document with a generated id.
        addData(collection, state.fields);
      }

      setState({
        fields: {},
        errors: {}
      });
      hide();
    }
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    updateData(collection, state.fields);
    if (collection !== 'Settings') {
      hide();
    } else {
      alert('Data has saved');
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={type === 'ADD' ? handleSubmitAdd : handleSubmitUpdate}>
        {inputs.map((input) => {
          if (input.imageUpload) {
            return (
              <Fragment key={input.id}>
                <div className="input-wrapper" key={input.id}>
                  <img
                    id="imageUpload"
                    src={url}
                    alt="avatars"
                    width={150}
                    height={150}
                  />
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder ? input.placeholder : ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="errorMsg">{state.errors[input.id]}</div>
              </Fragment>
            );
          }
          if (input.category) {
            return items.map((inputCategory, index) => (
              <Fragment key={`${input.id} ${index.toString()}`}>
                <div className="input-wrapper">
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    id={input.id}
                    className="category"
                    type={input.type}
                    placeholder={input.placeholder ? input.placeholder : ''}
                    onChange={(e) => handleChangeCategory(e, index)}
                  />
                  {index === 0 && (
                    <button type="button" onClick={handleAddClick}>
                      <MdAddCircle />
                    </button>
                  )}
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveClick(index)}
                    >
                      <HiMinusCircle />
                    </button>
                  )}
                </div>
                <div className="errorMsg">{state.errors[input.id]}</div>
              </Fragment>
            ));
          }
          return (
            <Fragment key={input.id}>
              <div className="input-wrapper">
                <label htmlFor={input.id}>{input.label}</label>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder ? input.placeholder : ''}
                  value={state.fields[input.id] ?? ''}
                  onChange={handleChange}
                />
              </div>
              <div className="errorMsg">{state.errors[input.id]}</div>
            </Fragment>
          );
        })}
        <input type="submit" className="btn button" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  employeeHistory: state.employeeHistory,
  certification: state.certification,
  experience: state.experience,
  portfolio: state.portfolio,
  settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
  addData: (dataCollection, dataFields) =>
    dispatch(addDataToAPI(dataCollection, dataFields)),
  updateData: (dataCollection, dataFields) =>
    dispatch(updateDataToAPI(dataCollection, dataFields))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
