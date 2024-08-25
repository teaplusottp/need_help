import React,{ useEffect } from 'react';
import { 
  saveText, 
  saveImg,
  savePaint,
  saveColor,
  changeBackgroundColor,
  clearCanvas,
  initializeCanvas,
  readJsonFile
} from '/public/script/arrow_function.js';


function MyModal() {
   useEffect(() => {
    initializeCanvas();
  }, []);
 const handleFileChange = (event) => {
    readJsonFile(event);
  };
  return (
    <div>
      <input type="file" id="file-input" accept=".json" style={{display: 'none'}}  onChange={handleFileChange}/>
      <div className="modal fade" id="textModal" tabIndex="-1" role="dialog" aria-labelledby="textModalLabel" aria-hidden="true">
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
                <input type="text" className="form-control" id="time" name="time" placeholder="Enter the time that happens in the video" required/>
              </div>
              <div className="form-group">
                <label htmlFor="place">Place</label>
                <input type="text" className="form-control" id="place" name="place" placeholder="Enter where the frame was taken" required/>
              </div>
              <div className="form-group">
                <label htmlFor="description">More specific description</label>
                <textarea className="form-control" id="description" name="description" rows="3" placeholder="Enter a more specific description" required></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={saveText}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="imageModal" tabIndex="-1" role="dialog" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="imageModalLabel">Upload an Image</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input type="file" className="form-control" id="related_image" name="related_image" accept="image/*"/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => saveImg('#related_image')}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="colorModal" tabIndex="-1" role="dialog" aria-labelledby="colorModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="colorModalLabel">Pick a Color</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="color-picker">
                <div className="color-swatch" style={{backgroundColor: 'red'}} onClick={() => setColor('red')}></div>
                <div className="color-swatch" style={{backgroundColor: 'blue'}} onClick={() => setColor('blue')}></div>
                <div className="color-swatch" style={{backgroundColor: 'green'}} onClick={() => setColor('green')}></div>
                <div className="color-swatch" style={{backgroundColor: 'yellow'}} onClick={() => setColor('yellow')}></div>
                <div className="color-swatch" style={{backgroundColor: 'orange'}} onClick={() => setColor('orange')}></div>
                <div className="color-swatch" style={{backgroundColor: 'purple'}} onClick={() => setColor('purple')}></div>
                <div className="custom-color" onClick={triggerColorPicker}></div>
                <input type="color" id="colorInput" onChange={(e) => setColor(e.target.value)}/>
              </div>
              <input type="hidden" id="dominant_color" name="dominant_color"/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={saveColor}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
  <div className="modal fade" id="drawModal" tabIndex="-1" role="dialog" aria-labelledby="drawModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document" style={{maxWidth: '50%'}}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="drawModalLabel">Draw a pic</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div id="controls" style={{textAlign: 'center', marginBottom: '10px'}}>
                <label htmlFor="colorPicker">Brush Color: </label>
                <input type="color" id="colorPicker" defaultValue="#000000"/>
                
                <label htmlFor="brushSize">Brush Size: </label>
                <input type="range" id="brushSize" min="1" max="50" defaultValue="5"/>
                
                <label htmlFor="bgColorPicker">Background Color: </label>
                <input type="color" id="bgColorPicker" defaultValue="#ffffff" onChange={changeBackgroundColor}/>
                
                <button onClick={clearCanvas}>Clear</button>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <canvas id="paintCanvas" style={{border: '1px solid black', display: 'block'}} width="700" height="400"></canvas>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={savePaint}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyModal;
