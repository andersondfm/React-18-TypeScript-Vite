// ProductTable.tsx
import React, { useState, useEffect } from 'react';
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
}

const PAGE_SIZE = 3;

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

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

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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

      <table className="table">
        {/* ... cabeçalho da tabela ... */}
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.idSkuOff}>
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
      </table>

      <div className="pagination">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
