import React from 'react';
import { 
  saveChange,
  deleteQuery
} from '/public/script/arrow_function.js';

function MyModalEdit() {
 
  return (
    <>
      {/* Hidden file input field */}
      <input type="file" id="file-input" accept=".json" style={{ display: 'none' }} />

      {/* Text Modal */}
      <div className="modal fade" id="textModal-edit" tabIndex="-1" role="dialog" aria-labelledby="textModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="textModalLabel">Enter Text Information</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input type="text" className="form-control" id="time-edit" name="time" placeholder="Enter the time that happens in the video" required />
              </div>
              <div className="form-group">
                <label htmlFor="place">Place</label>
                <input type="text" className="form-control" id="place-edit" name="place" placeholder="Enter where the frame was taken" required />
              </div>
              <div className="form-group">
                <label htmlFor="description">More specific description</label>
                <textarea className="form-control" id="description-edit" name="description" rows="3" placeholder="Enter a more specific description" required></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={saveChange}>Save changes</button>
              <button type="button" className="btn btn-danger delete-btn" onClick={deleteQuery}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <div className="modal fade" id="imageModal-edit" tabIndex="-1" role="dialog" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="imageModalLabel">Your Image</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img id="defaultImage-edit" alt="Default Image" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger delete-btn" onClick={deleteQuery}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* Color Modal */}
      <div className="modal fade" id="colorModal-edit" tabIndex="-1" role="dialog" aria-labelledby="colorModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="colorModalLabel">Your color:</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="color-picker">
                <input type="color" id="colorPicker-1" name="colorPicker" defaultValue="#ff0000" onChange={setColor} />
              </div>
              <input type="hidden" id="dominant_color" name="dominant_color" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={saveChange}>Save changes</button>
              <button type="button" className="btn btn-danger delete-btn" onClick={deleteQuery}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* Draw Modal */}
        {/*ko cần*/}
    </>
  );
}

export default MyModalEdit;
