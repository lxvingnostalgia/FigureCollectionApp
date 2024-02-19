import React, { useState } from 'react';

function WishlistForm({ addItemToWishlist }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [series, setSeries] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      addItemToWishlist({ name, description, series, image });
      setName('');
      setDescription('');
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
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
        <button type="submit" className="btn btn-primary">
          Add to wishlist
        </button>
      </form>
    </div>
  );
}

export default WishlistForm;