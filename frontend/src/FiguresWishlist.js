import React, { useState } from 'react';
import WishlistForm from './Components/WishlistForm';
import Wishlist from './Components/Wishlist';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import xmlbuilder from 'xmlbuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

// figures = wishlist, figure = item

function FiguresWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const itemsPerPage = 4;

  const addItemToWishlist = (item) => {
    const isDuplicate = wishlist.some((existingItem) => existingItem.name === item.name);
    if (isDuplicate) {
      // Display an error message
      alert('An item with that name is already in the wishlist.');
    } else {
      // If no duplicate is found, add the item to the wishlist
      setWishlist([...wishlist, item]);
    }
  };

  const deleteItem = (nameToDelete) => {
    setItemToDelete(nameToDelete);
    setShowConfirmationModal(true);
  };

  const confirmDelete = () => {
    const updatedWishlist = wishlist.filter((item) => item.name !== itemToDelete);
    setWishlist(updatedWishlist);
    setShowConfirmationModal(false);
  }

  const cancelDelete = () => {
    setShowConfirmationModal(false);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWishlist = wishlist.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(wishlist, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json ' });
    saveAs(blob, 'wishlist.json');
  };

  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(wishlist);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Wishlist');
    XLSX.writeFile(workbook, 'wishlist.xlsx');
  };

  const exportToXML = () => {
    const root = xmlbuilder.create('wishlist');
    wishlist.forEach((item) => {
      root.ele('item', item);
    });
    const xmlData = root.end({ pretty: true });

    const blob = new Blob([xmlData], { type: 'application/xml' });
    saveAs(blob, 'wishlist.xml');
  };

  return (
    <div className="MyWishlist bg-dark p-4 col-md-8 mx-auto text-center inner-border">
      <WishlistForm addItemToWishlist={addItemToWishlist} />
      <Wishlist items={currentWishlist} deleteItem={deleteItem} />
      <div className="pagination justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link btn btn-primary" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {Array.from({ length: Math.ceil(wishlist.length / itemsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className={`page-link btn btn-${index % 2 === 0 ? 'primary' : 'success'}`} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
        ))}
        <li className={`page-item ${currentPage === Math.ceil(wishlist.length / itemsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link btn btn-primary" onClick={() => paginate(currentPage + 1)} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="actions">
        <button onClick={exportToJSON} className='btn btn-outline-secondary mx-2'>Export as JSON</button>
        <button onClick={exportToXLSX} className='btn btn-outline-success mx-2'>Export as XLSX</button>
        <button onClick={exportToXML} className='btn btn-outline-danger mx-2'>Export as XML</button>
      </div>
      {/* Confirmation using Modal component from react-bootstrap */ }
      <Modal show={showConfirmationModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the figure {itemToDelete}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FiguresWishlist;