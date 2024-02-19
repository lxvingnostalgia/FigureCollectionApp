import React, { useState, useEffect } from 'react';
import FigureList from './Components/FigureList';
import FigureForm from './Components/FigureForm';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import xmlbuilder from 'xmlbuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from "./AuthContext";
import axios from 'axios';

function Figures() {
  const { username } = useAuth();
  const [figures, setFigures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [figureToDelete, setFigureToDelete] = useState(null);
  const figuresPerPage = 4;

  useEffect(() => {
    // Fetch user figures when the component mounts
    if (username) {
      axios.get(`http://localhost:8081/user-figures/${username.ID}`)
        .then(res => setFigures(res.data))
        .catch(err => console.log(err));
    }
  }, [username]);

  const addFigure = (figure) => {
    const isDuplicate = figures.some((existingFigure) => existingFigure.name === figure.name);
    if (isDuplicate) {
      // Display an error message
      alert('An item with that name is already in the collection.');
    } else {
      // If no duplicate is found, add the item to the collection
      setFigures([...figures, figure]);
    }
  };


  const deleteFigure = (nameToDelete) => {
    setFigureToDelete(nameToDelete);
    setShowConfirmationModal(true);
  };

  const confirmDelete = () => {
    const updatedFigures = figures.filter((figure) => figure.name !== figureToDelete);
    setFigures(updatedFigures);
    setShowConfirmationModal(false);
  }

  const cancelDelete = () => {
    setShowConfirmationModal(false);
  }

  /* Simpler option to confirm delete
  
  const deleteFigure = (nameToDelete) => {
  // Ask for confirmation before deleting
  const isConfirmed = window.confirm(`Are you sure you want to delete the figure ${nameToDelete}?`);

  if (isConfirmed) {
    const updatedFigures = figures.filter((figure) => figure.name !== nameToDelete);
    setFigures(updatedFigures);
  }
  // If not confirmed, do nothing
  
  */

  const indexOfLastFigure = currentPage * figuresPerPage;
  const indexOfFirstFigure = indexOfLastFigure - figuresPerPage;
  const currentFigures = figures.slice(indexOfFirstFigure, indexOfLastFigure);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(figures, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json '});
    saveAs(blob, 'figures.json');
  }

  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(figures);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Figures');
    XLSX.writeFile(workbook, 'figures.xlsx');
  }

  const exportToXML = () => {
    const root = xmlbuilder.create('collection');
    figures.forEach((figure) => {
      root.ele('figure', figure);
    });
    const xmlData = root.end({ pretty: true });

    const blob = new Blob([xmlData], { type: 'application/xml' });
    saveAs(blob, 'figures.xml');
  }

  return (
    <div className="MyFigures bg-dark p-4 col-md-8 mx-auto text-center inner-border">
      <FigureForm addFigure={addFigure} />
      <FigureList figures={currentFigures} deleteFigure={deleteFigure} />
      <div className="pagination justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link btn btn-primary" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {Array.from({ length: Math.ceil(figures.length / figuresPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className={`page-link btn btn-${index % 2 === 0 ? 'primary' : 'success'}`} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(figures.length / figuresPerPage) ? 'disabled' : ''}`}>
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
          Are you sure you want to delete the figure {figureToDelete}?
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

export default Figures;