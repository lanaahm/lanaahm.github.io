import React, { useState, useEffect } from 'react';
import './table.scss';

const Table = ({ limit, bodyData, headData, renderBody }) => {
  const [dataShow, setDataShow] = useState([]);
  const [currPage, setCurrPage] = useState(0);

  useEffect(() => {
    const initData =
      limit && bodyData ? bodyData.slice(0, Number(limit)) : bodyData;
    setDataShow(initData);
  }, [bodyData]);

  let pages = 1;
  let range = [];
  if (limit !== undefined) {
    const page = Math.floor(bodyData.length / Number(limit));
    pages = bodyData.length % Number(limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const selectPage = (page) => {
    const start = Number(limit) * page;
    const end = start + Number(limit);
    setDataShow(bodyData.slice(start, end));
    setCurrPage(page);
  };

  return (
    <div>
      <div className="table-wrapper">
        <table>
          {headData && (
            <thead>
              <tr>
                {headData.map((item, index) => (
                  <th key={`${index.toString()}`}>{item}</th>
                ))}
              </tr>
            </thead>
          )}
          {bodyData && (
            <tbody>
              {dataShow.map((item, index) => renderBody(item, index))}
            </tbody>
          )}
        </table>
      </div>
      {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              className={`table__pagination-item ${
                currPage === index ? 'active' : ''
              }`}
              onClick={() => selectPage(index)}
              aria-hidden="true"
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
