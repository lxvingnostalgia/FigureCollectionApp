import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

function Wishlist({ items, deleteItem }) {

  return (
    <div>
      <div className='container mt-4'>
        <div className="d-flex flex-wrap justify-content-center">
          {items.map((item) => (
            <div key={item.name} className="text-center m-3 p-3">
              {item.image && (
                <img
                src={URL.createObjectURL(item.image)}
                alt="Item"
                className="img-fluid rounded"
                style={{ width: '200px', height: '200px' }}
                />
              )}
              <div className="text-white mb-2">
                <strong>Name:</strong> {item.name}
              </div>
              <div className="text-white mb-2">
                <strong>Description:</strong> {item.description}
              </div>
              <div className="text-white mb-2">
                <strong>Series:</strong> {item.series}
              </div>
              <button
                type="button"
                className="btn btn-outline-light custom-font"
                onClick={() => deleteItem(item.name)}
              >
                <i className="fa fa-trash"></i> {/* Icon from Font Awesome */}
                Remove from wishlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;