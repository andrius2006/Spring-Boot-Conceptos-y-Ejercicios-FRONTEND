import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Table, Modal, Form, Button, 
  Badge, Card, InputGroup, FormControl, Navbar 
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DepositoMaxApp = () => {
  // Preloaded sample data
  const initialProducts = [
    { id: 1, name: 'Cerámica Marbella 40x40', category: 'Cerámica', price: 28500, unit: 'm²', stock: 120, minStock: 20 },
    { id: 2, name: 'Pegasuper Gris x25kg', category: 'Pegasuper', price: 45000, unit: 'bulto', stock: 8, minStock: 10 },
    { id: 3, name: 'Porcelana Calacatta 60x60', category: 'Porcelana', price: 89000, unit: 'm²', stock: 35, minStock: 10 },
    { id: 4, name: 'Cerámica Rustic Stone 30x30', category: 'Cerámica', price: 22000, unit: 'm²', stock: 0, minStock: 15 },
    { id: 5, name: 'Pegasuper Blanco x25kg', category: 'Pegasuper', price: 43000, unit: 'bulto', stock: 52, minStock: 10 },
    { id: 6, name: 'Cruceta 2mm x100u', category: 'Accesorio', price: 4500, unit: 'caja', stock: 200, minStock: 30 }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  // Stats calculation
  const stats = {
    total: products.length,
    inStock: products.filter(p => p.stock > p.minStock).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= p.minStock).length,
    outOfStock: products.filter(p => p.stock === 0).length
  };

  const categories = ['Todos', 'Cerámica', 'Pegasuper', 'Porcelana', 'Enchape', 'Accesorio'];

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      name: formData.get('name'),
      category: formData.get('category'),
      price: parseFloat(formData.get('price')),
      unit: formData.get('unit'),
      stock: parseInt(formData.get('stock')),
      minStock: parseInt(formData.get('minStock'))
    };

    if (currentProduct) {
      setProducts(products.map(p => p.id === currentProduct.id ? { ...productData, id: p.id } : p));
    } else {
      setProducts([...products, { ...productData, id: Date.now() }]);
    }
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleDelete = () => {
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'Todos' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryBadge = (cat) => {
    const colors = {
      'Cerámica': 'primary',
      'Pegasuper': 'warning',
      'Porcelana': 'info',
      'Enchape': 'success',
      'Accesorio': 'secondary'
    };
    return <Badge bg={colors[cat] || 'dark'}>{cat}</Badge>;
  };

  const getStockBadge = (product) => {
    if (product.stock === 0) return <Badge bg="danger">Sin Stock</Badge>;
    if (product.stock <= product.minStock) return <Badge bg="warning" text="dark">Stock Bajo</Badge>;
    return <Badge bg="success">En Stock</Badge>;
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Header */}
      <Navbar bg="white" className="shadow-sm rounded mb-4 px-4 border">
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <div style={{ backgroundColor: '#FF6B35', width: '32px', height: '32px', borderRadius: '6px', marginRight: '10px' }}></div>
          <div>
            <h5 className="mb-0 fw-bold" style={{ color: '#FF6B35' }}>DepósitoMax</h5>
            <small className="text-muted" style={{ fontSize: '10px' }}>CERÁMICA Y PEGASUPER</small>
          </div>
        </Navbar.Brand>
      </Navbar>

      {/* Stats Row */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="text-muted small text-uppercase">Total Productos</Card.Title>
              <h2 className="fw-bold">{stats.total}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm border-bottom border-success border-4">
            <Card.Body>
              <Card.Title className="text-muted small text-uppercase">En Stock</Card.Title>
              <h2 className="fw-bold text-success">{stats.inStock}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm border-bottom border-warning border-4">
            <Card.Body>
              <Card.Title className="text-muted small text-uppercase">Stock Bajo</Card.Title>
              <h2 className="fw-bold text-warning">{stats.lowStock}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm border-bottom border-danger border-4">
            <Card.Body>
              <Card.Title className="text-muted small text-uppercase">Sin Stock</Card.Title>
              <h2 className="fw-bold text-danger">{stats.outOfStock}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toolbar */}
      <Card className="border-0 shadow-sm mb-4 p-3">
        <Row className="align-items-center g-3">
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0"><i className="bi bi-search"></i></InputGroup.Text>
              <FormControl
                placeholder="Buscar producto..."
                className="border-start-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={6} className="d-flex gap-2">
            {categories.map(cat => (
              <Button 
                key={cat}
                size="sm"
                variant={filter === cat ? 'warning' : 'outline-secondary'}
                onClick={() => setFilter(cat)}
                className="px-3"
              >
                {cat}
              </Button>
            ))}
          </Col>
          <Col md={2} className="text-end">
            <Button 
              style={{ backgroundColor: '#5C4EB8', borderColor: '#5C4EB8' }} 
              onClick={() => { setCurrentProduct(null); setShowModal(true); }}
            >
              + Agregar producto
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <Table hover responsive className="mb-0 align-middle">
          <thead className="bg-light">
            <tr>
              <th className="px-4 py-3 border-0">Producto</th>
              <th className="py-3 border-0">Categoría</th>
              <th className="py-3 border-0 text-center">Precio</th>
              <th className="py-3 border-0 text-center">Unidad</th>
              <th className="py-3 border-0 text-center">Stock</th>
              <th className="px-4 py-3 border-0 text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td className="px-4 py-3 fw-bold">{product.name}</td>
                <td>{getCategoryBadge(product.category)}</td>
                <td className="text-center">${product.price.toLocaleString()}</td>
                <td className="text-center">{product.unit}</td>
                <td className="text-center">
                  <div className="d-flex flex-column align-items-center">
                    <span>{product.stock}</span>
                    {getStockBadge(product)}
                  </div>
                </td>
                <td className="px-4 text-end">
                  <Button 
                    variant="link" 
                    className="text-primary p-0 me-3" 
                    onClick={() => { setCurrentProduct(product); setShowModal(true); }}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="link" 
                    className="text-danger p-0"
                    onClick={() => { setProductToDelete(product); setShowDeleteModal(true); }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSaveProduct}>
          <Modal.Header closeButton>
            <Modal.Title>{currentProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">NOMBRE DEL PRODUCTO</Form.Label>
              <Form.Control name="name" defaultValue={currentProduct?.name} required placeholder="Ej: Cerámica Carrara" />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">CATEGORÍA</Form.Label>
                  <Form.Select name="category" defaultValue={currentProduct?.category || 'Cerámica'}>
                    {categories.filter(c => c !== 'Todos').map(c => <option key={c}>{c}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">PRECIO (USD)</Form.Label>
                  <Form.Control name="price" type="number" defaultValue={currentProduct?.price} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">UNIDAD</Form.Label>
                  <Form.Select name="unit" defaultValue={currentProduct?.unit || 'm²'}>
                    <option>m²</option>
                    <option>caja</option>
                    <option>bulto</option>
                    <option>unidad</option>
                    <option>kg</option>
                    <option>litro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">CANTIDAD INICIAL</Form.Label>
                  <Form.Control name="stock" type="number" defaultValue={currentProduct?.stock || 0} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">STOCK MÍNIMO</Form.Label>
                  <Form.Control name="minStock" type="number" defaultValue={currentProduct?.minStock || 10} required />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button style={{ backgroundColor: '#5C4EB8', borderColor: '#5C4EB8' }} type="submit">
              {currentProduct ? 'Guardar Cambios' : 'Guardar Producto'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} size="sm" centered>
        <Modal.Body className="text-center p-4">
          <h5 className="mb-3">¿Eliminar producto?</h5>
          <p className="text-muted small">Esta acción no se puede deshacer.</p>
          <div className="d-flex justify-content-center gap-2 mt-4">
            <Button variant="light" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DepositoMaxApp;