import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

function FigureList({ figures, deleteFigure }) {
  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-center">
        {figures.map((figure) => (
          <div key={figure.name} className="text-center m-3 p-3">
            {figure.image && (
              <img
                src={URL.createObjectURL(figure.image)}
                alt="Figure"
                className="img-fluid rounded"
                style={{ width: '200px', height: '200px' }}
              />
            )}
            <div className="text-white mb-2">
              <strong>Name:</strong> {figure.name}
            </div>
            <div className="text-white mb-2">
              <strong>Brand:</strong> {figure.brand}
            </div>
            <div className="text-white mb-2">
              <strong>Series:</strong> {figure.series}
            </div>
            <button
              type="button"
              className="btn btn-outline-light custom-font"
              onClick={() => deleteFigure(figure.name)}
            >
              <i className="fa fa-trash"></i> Delete from collection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FigureList;
