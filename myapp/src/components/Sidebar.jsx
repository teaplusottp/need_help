import React from 'react';
import {ShowOption,StartQuery,Upload } from '/public/script/arrow_function.js';


function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-details">
        <i className="fas fa-dragon"></i>
        <span className="logo_name">NIDIM</span>
      </div>

      <ul className="nav-links">
        {/* Start Query */}
        <li>
          <a href="#" id="start-query" onClick={StartQuery}>
            <i className='bx bx-play'></i>
            <span className="link_name">Start query</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Start query</a></li>
          </ul>
        </li>

        {/* Upload Metadata */}
        <li>
          <a href="#" id="upload-link" onClick={Upload} >
            <i className='bx bx-upload'></i>
            <span className="link_name">Upload Metadata</span>
          </a>
          <ul className="sub-menu blank" id="upload-submenu" >
            <li><a className="link_name" href="#">Upload Metadata</a></li>
          </ul>
        </li>

        {/* Add Query */}
        <li>
          <a href="#"  onClick={ShowOption} >
            <i className='bx bxl-jquery'></i>
            <span className="link_name">Add Query</span>
            <div className="icon-link">
              <i className='bx bxs-chevron-down arrow'></i>
            </div>
          </a>
          <ul className="sub-menu">
            <li><a className="link_name" href="#">Add Query</a></li>
            <li><a href="#">Text</a></li>
            <li><a href="#">Image</a></li>
            <li><a href="#">Color</a></li>
            <li><a href="#">Draw</a></li>
          </ul>
        </li>

        {/* Your Query */}
        <li>
          <a href="#" onClick={ShowOption}>
            <i className='fa-sharp fa-solid fa-clock-rotate-left'></i>
            <span className="link_name">Your query</span>
            <div className="icon-link">
              <i className='bx bxs-chevron-down arrow'></i>
            </div>
          </a>
          <ul className="sub-menu-1" id='history-submenu' >
            <li><a className="link_name" href="#">Your Query</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;