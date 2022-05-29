import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  query,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';

import { firebase, firestore } from '../../firebase';
import { ActionType } from './globalActionType';

const auth = getAuth(firebase);

export const setNav = (data) => (dispatch) =>
  dispatch({ type: ActionType.SET_ACTIVATE_NAV, value: data });

export const loginUserAPI = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        const dataUser = {
          email: user.email,
          uid: user.uid,
          emailVerified: user.emailVerified,
          refreshToken: user.refreshToken
        };
        dispatch({ type: ActionType.IS_LOADING, value: false });
        resolve(dataUser);
      })
      .catch(() => {
        dispatch({ type: ActionType.IS_LOADING, value: false });
        reject(false);
      });
  });

export const getDataFromAPI = (dataCollection, typeAction) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    const querySnapshot = query(
      collection(firestore, dataCollection),
      orderBy('createdAt')
    );
    onSnapshot(querySnapshot, (dataSnapshot) => {
      const data = [];
      dataSnapshot.forEach((dataDoc) => {
        data.push({
          id: dataDoc.id,
          ...dataDoc.data()
        });

        dispatch({ type: typeAction, value: data });
        dispatch({ type: ActionType.IS_LOADING, value: false });
        resolve(data);
      });
    });
  });

export const getDataIdsFromAPI = (dataCollection, typeAction) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    const querySnapshot = query(collection(firestore, dataCollection));
    onSnapshot(querySnapshot, (dataSnapshot) => {
      const data = [];
      dataSnapshot.forEach((dataDoc) => {
        data.push({
          id: dataDoc.id,
          ...dataDoc.data()
        });

        dispatch({ type: typeAction, value: data });
        dispatch({ type: ActionType.IS_LOADING, value: false });
        resolve(data);
      });
    });
  });

export const addDataToAPI = (dataCollection, dataFields) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    addDoc(collection(firestore, dataCollection), {
      ...dataFields,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    dispatch({ type: ActionType.IS_LOADING, value: false });
    resolve(true);
  });

export const updateDataToAPI = (dataCollection, dataFields) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    const { id, fields } = dataFields;
    updateDoc(doc(firestore, dataCollection, id), {
      ...fields,
      updatedAt: serverTimestamp()
    });
    dispatch({ type: ActionType.IS_LOADING, value: false });
    resolve(true);
  });

export const deleteDataToAPI = (dataCollection, dataField) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    deleteDoc(doc(firestore, dataCollection, dataField));
    dispatch({ type: ActionType.IS_LOADING, value: false });
    resolve(true);
  });
