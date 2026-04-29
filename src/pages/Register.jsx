import React, { useState } from 'react';
import {Container,Row,Col,Form,Button,InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Register.css";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Datos del registro:', formData);

        // Aquí luego puedes conectar con tu backend

        // Redirigir a login
        navigate('/login');
    };

    return (
        <div className="register-wrapper d-flex align-items-center justify-content-center min-vh-100">
            <Container>
                <Row className="justify-content-center">
                    <Col md={5} lg={4}>
                        <RegisterCard className="register-card border-0 shadow-lg overflow-hidden">
                            <RegisterRegisterCard.Body className="p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <div className="brand-logo-large mx-auto mb-3">
                                        <i className="bi bi-box-seam-fill"></i>
                                    </div>
                                    <h2 className="register-title fw-black">DepósitoMax</h2>
                                    <p className="register-subtitle text-muted">Crea tu cuenta hoy</p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold text-uppercase">Nombre Completo</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-white">
                                                <i className="bi bi-person"></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold text-uppercase">Correo Electrónico</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-white">
                                                <i className="bi bi-envelope"></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="ejemplo@depositomax.com"
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold text-uppercase">Contraseña</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-white">
                                                <i className="bi bi-lock"></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Check
                                        type="checkbox"
                                        id="terms"
                                        label={
                                            <span className="small text-muted">
                                                Acepto los <span className="text-orange fw-bold">Términos y Condiciones</span>
                                            </span>
                                        }
                                        className="mb-4"
                                        required
                                    />

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 py-2 fw-bold btn-orange mb-4 shadow-sm"
                                    >
                                        Registrarse
                                    </Button>
                                </Form>

                                <div className="text-center mt-4 pt-3 border-top">
                                    <p className="text-muted small mb-0">
                                        ¿Ya tienes cuenta?
                                        <Button
                                            variant="link"
                                            onClick={() => navigate('/login')}
                                            className="text-decoration-none ms-1 p-0 fw-bold text-teal"
                                        >
                                            Inicia sesión
                                        </Button>
                                    </p>
                                </div>
                            </RegisterRegisterCard.Body>
                        </RegisterCard>

                        <div className="text-center mt-4 register-features d-flex justify-content-center gap-4">
                            <div className="feature-item d-flex align-items-center gap-2">
                                <i className="bi bi-shield-check text-muted"></i>
                                <span className="text-muted small text-uppercase fw-bold">
                                    Acceso Seguro
                                </span>
                            </div>
                            <div className="feature-item d-flex align-items-center gap-2">
                                <i className="bi bi-graph-up text-muted"></i>
                                <span className="text-muted small text-uppercase fw-bold">
                                    Control Total
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegisterPage;
