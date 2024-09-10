import React from 'react';
import { Link } from 'react-router-dom';
import './breadcrumb.css';  

const Breadcrumb = ({ paths }) => {
  return (
    <nav>
      <ul className="breadcrumb">
        {paths.map((path, index) => (
          <li key={index}>
            {index < paths.length - 1 ? (
              <Link to={path.href}>{path.label}</Link>
            ) : (
              <span>{path.label}</span>
            )}
            {index < paths.length - 1 && ' > '}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;