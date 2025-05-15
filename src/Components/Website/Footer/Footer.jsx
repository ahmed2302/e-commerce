import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css"; // اختياري لاستيراد أنماط مخصصة

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          {/* عمود يحتوي على معلومات عن الشركة */}
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Shampoo Nice is your number one stop for all your grooming and
              personal care needs. Quality products and exceptional service.
            </p>
          </Col>

          {/* عمود يحتوي على روابط مهمة */}
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-light text-decoration-none">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          {/* عمود يحتوي على معلومات الاتصال */}
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: support@shampoonice.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Care Street, Nice City, USA</p>
          </Col>
        </Row>

        {/* حقوق النشر في الأسفل */}
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Shampoo Nice. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
