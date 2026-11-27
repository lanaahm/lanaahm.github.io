import React, { useEffect, useState } from 'react';
import './table.scss';

export interface TableProps<T> {
  limit?: number;
  headData?: string[];
  bodyData: T[];
  renderBody: (item: T, index: number) => React.ReactNode;
}

const Table = <T,>({ limit, bodyData = [], headData, renderBody }: TableProps<T>) => {
  const [dataShow, setDataShow] = useState<T[]>([]);
  const [currPage, setCurrPage] = useState(0);

  useEffect(() => {
    const initData = limit ? bodyData.slice(0, Number(limit)) : bodyData;
    setDataShow(initData);
    setCurrPage(0);
  }, [bodyData, limit]);

  let pages = 1;
  let range: number[] = [];
  if (limit !== undefined && limit > 0) {
    const page = Math.floor(bodyData.length / Number(limit));
    pages = bodyData.length % Number(limit) === 0 ? page : page + 1;
    range = Array.from({ length: pages }, (_, idx) => idx);
  }

  const selectPage = (page: number) => {
    if (!limit) return;
    const start = Number(limit) * page;
    setDataShow(bodyData.slice(start, start + Number(limit)));
    setCurrPage(page);
  };

  return (
    <div>
      <div className="table-wrapper">
        <table>
          {headData && (
            <thead>
              <tr>
                {headData.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>{dataShow.map((item, index) => renderBody(item, index))}</tbody>
        </table>
      </div>
      {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <button
              type="button"
              key={item}
              className={`table__pagination-item ${currPage === index ? 'active' : ''}`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
