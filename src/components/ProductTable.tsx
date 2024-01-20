import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Modal, Button } from 'react-bootstrap'; // Importando componentes do react-bootstrap
import axios from 'axios';

interface Product {
  idSkuOff: number;
  idSkuOn: string;
  mercadoria: string;
  tipo: string;
  categoria: string;
  status: string;
  ultAtualizacao: string;
  okComercial: string;
  [key: string]: string | number;
}

const PAGE_SIZE = 5;

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [orderAsc, setOrderAsc] = useState<boolean>(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Estado para armazenar o produto selecionado
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para controlar a visibilidade da modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    Object.values(product).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortProducts = (a: Product, b: Product): number => {
    const aValue = orderBy ? String(a[orderBy]).toLowerCase() : '';
    const bValue = orderBy ? String(b[orderBy]).toLowerCase() : '';

    if (aValue < bValue) {
      return orderAsc ? -1 : 1;
    } else if (aValue > bValue) {
      return orderAsc ? 1 : -1;
    } else {
      return 0;
    }
  };

  const sortedProducts = filteredProducts.sort(sortProducts);

  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (columnName: string) => {
    setOrderBy(columnName);
    setOrderAsc((prevOrderAsc) => !prevOrderAsc);
  };

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Produtos</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Digite para buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('idSkuOff')}>ID SKU Off</th>
            <th onClick={() => handleSort('idSkuOn')}>ID SKU On</th>
            <th onClick={() => handleSort('mercadoria')}>Mercadoria</th>
            <th onClick={() => handleSort('tipo')}>Tipo</th>
            <th onClick={() => handleSort('categoria')}>Categoria</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th onClick={() => handleSort('ultAtualizacao')}>Última Atualização</th>
            <th onClick={() => handleSort('okComercial')}>OK Comercial</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.idSkuOff} onClick={() => handleRowClick(product)}>
              <td>{product.idSkuOff}</td>
              <td>{product.idSkuOn}</td>
              <td>{product.mercadoria}</td>
              <td>{product.tipo}</td>
              <td>{product.categoria}</td>
              <td>{product.status}</td>
              <td>{product.ultAtualizacao}</td>
              <td>{product.okComercial}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination">
        <Button
          variant="primary"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button
          variant="primary"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <p>ID SKU Off: {selectedProduct.idSkuOff}</p>
              <p>ID SKU On: {selectedProduct.idSkuOn}</p>
              <p>Mercadoria: {selectedProduct.mercadoria}</p>
              <p>Tipo: {selectedProduct.tipo}</p>
              <p>Categoria: {selectedProduct.categoria}</p>
              <p>Status: {selectedProduct.status}</p>
              <p>Última Atualização: {selectedProduct.ultAtualizacao}</p>
              <p>OK Comercial: {selectedProduct.okComercial}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductTable;
