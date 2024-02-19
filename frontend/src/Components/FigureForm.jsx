import React, { useState } from 'react';

function FigureForm({ addFigure }) {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [series, setSeries] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    // To make sure the images don't look wider, the ideal dimensions of uploaded stuff should be the same (example: 800x800)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && brand && series) {
            addFigure({ name, brand, series, image });
            setName('');
            setBrand('');
            setSeries('');
            setImage(null);

            // Reset the file input field
            const input = document.querySelector('input[type="file"]');
            if (input) {
                input.value = '';
            }
        }
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col text-white menu-font">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col text-white menu-font">
            <label htmlFor="brand" className="form-label">
              Brand:
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col text-white menu-font">
            <label htmlFor="series" className="form-label">
              Series:
            </label>
            <input
              type="text"
              className="form-control"
              id="series"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
            />
          </div>
          <div className="col text-white menu-font">
            <label htmlFor="image" className="form-label">
              Image:
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mb-3">
            Add figure
        </button>
      </form>
    </div>
  );
}

export default FigureForm;
