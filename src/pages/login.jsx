import React, { useState } from 'react';
import { 
  Container, Row, Col, Form, Button, Card, InputGroup 
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Iniciando sesión..." : "Registrando cuenta...");
  };

  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={5} lg={4}>
            <Card className="auth-card border-0 shadow-lg overflow-hidden">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="brand-logo-large mx-auto mb-3">
                    <i className="bi bi-box-seam-fill"></i>
                  </div>
                  <h2 className="auth-title fw-black">DepósitoMax</h2>
                  <p className="auth-subtitle text-muted">
                    {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta hoy'}
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold text-uppercase">Nombre Completo</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white"><i className="bi bi-person"></i></InputGroup.Text>
                        <Form.Control type="text" placeholder="John Doe" required />
                      </InputGroup>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-uppercase">Correo Electrónico</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-white"><i className="bi bi-envelope"></i></InputGroup.Text>
                      <Form.Control type="email" placeholder="ejemplo@depositomax.com" required />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-uppercase">Contraseña</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-white"><i className="bi bi-lock"></i></InputGroup.Text>
                      <Form.Control type="password" placeholder="••••••••" required />
                    </InputGroup>
                  </Form.Group>

                  {isLogin && (
                    <div className="text-end mb-4">
                      <Button variant="link" className="text-decoration-none p-0 small text-orange fw-bold">
                        ¿Olvidaste tu contraseña?
                      </Button>
                    </div>
                  )}

                  {!isLogin && (
                    <Form.Check 
                      type="checkbox" 
                      id="terms" 
                      label={<span className="small text-muted">Acepto los <span className="text-orange fw-bold">Términos y Condiciones</span></span>}
                      className="mb-4"
                      required
                    />
                  )}

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-2 fw-bold btn-orange mb-4 shadow-sm"
                  >
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                  </Button>
                </Form>

                <div className="text-center mt-4 pt-3 border-top">
                  <p className="text-muted small mb-0">
                    {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                    <Button 
                      variant="link" 
                      onClick={toggleAuth} 
                      className="text-decoration-none ms-1 p-0 fw-bold text-teal"
                    >
                      {isLogin ? 'Regístrate' : 'Inicia sesión'}
                    </Button>
                  </p>
                </div>
              </Card.Body>
            </Card>
            
            <div className="text-center mt-4 auth-features d-flex justify-content-center gap-4">
              <div className="feature-item d-flex align-items-center gap-2">
                <i className="bi bi-shield-check text-muted"></i>
                <span className="text-muted small text-uppercase fw-bold tracking-wider">Acceso Seguro</span>
              </div>
              <div className="feature-item d-flex align-items-center gap-2">
                <i className="bi bi-graph-up text-muted"></i>
                <span className="text-muted small text-uppercase fw-bold tracking-wider">Control Total</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthPages;