import React, { useEffect, useRef } from 'react';
import './dropdown.scss';

export interface DropdownProps<T = unknown> {
  icon?: string;
  badge?: string | number;
  customToggle?: () => React.ReactNode;
  contentData?: T[];
  renderItems?: (item: T, index: number) => React.ReactNode;
  renderFooter?: () => React.ReactNode;
}

const Dropdown = <T,>({
  icon,
  badge,
  customToggle,
  contentData,
  renderItems,
  renderFooter
}: DropdownProps<T>) => {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (toggleRef.current && target && toggleRef.current.contains(target)) {
        contentRef.current?.classList.toggle('active');
      } else if (contentRef.current && target && !contentRef.current.contains(target)) {
        contentRef.current.classList.remove('active');
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  return (
    <div className="dropdown">
      <button type="button" ref={toggleRef} className="dropdown__toggle">
        {icon ? <i className={icon} /> : null}
        {badge ? <span className="dropdown__toggle-badge">{badge}</span> : null}
        {customToggle ? customToggle() : null}
      </button>
      <div ref={contentRef} className="dropdown__content">
        {contentData && renderItems
          ? contentData.map((item, index) => renderItems(item, index))
          : null}
        {renderFooter ? <div className="dropdown__footer">{renderFooter()}</div> : null}
      </div>
    </div>
  );
};

export default Dropdown;
