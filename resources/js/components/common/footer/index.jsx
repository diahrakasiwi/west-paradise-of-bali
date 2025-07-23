import React from "react";
import { Layout, Row, Col, Typography, Image } from "antd";
import {
    TikTokOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    InstagramOutlined,
} from "@ant-design/icons";
import "./footer.css";
import translations from "../../../lang/lang";

const { Footer } = Layout;
const { Title, Text } = Typography;

export default function CustomFooter({ locale }) {
    const t = translations[locale || "id"];
    return (
        <Footer className="custom-footer">
            {/* <div className="footer-curve" /> */}
            <div className="footer-curve">
                <div className="hero-content">
                    <h1>{t.footer.title}</h1>
                    <h2>
                        <span className="highlight">{t.footer.subtitle}</span>
                    </h2>
                    <p>{t.footer.description}</p>
                </div>
            </div>
            <div className="footer-content">
                <Row gutter={[64, 32]} justify="space-between">
                    {/* Branding & Deskripsi */}
                    <Col xs={24} md={10} className="footer-column">
                        <div style={{ marginBottom: 36 }}>
                            <h3 className="brand-title">
                                Bali West
                                <span className="brand-subtitle">Paradise</span>
                            </h3>
                        </div>
                        <Text className="footer-desc">
                            {t.footer.footerDesc}
                        </Text>
                    </Col>

                    {/* Quick Links */}
                    <Col xs={24} sm={12} md={4} className="footer-column">
                        <h4 className="footer-section-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li>
                                <a href="/about">{t.navbar.about}</a>
                            </li>
                            <li>
                                <a href="/destination">
                                    {t.navbar.destination}
                                </a>
                            </li>
                            <li>
                                <a href="/news">{t.navbar.news}</a>
                            </li>
                            <li>
                                <a href="/event">{t.navbar.event}</a>
                            </li>
                        </ul>
                    </Col>

                    {/* Media Sosial */}
                    <Col xs={24} sm={12} md={5} className="footer-column">
                        <h4 className="footer-section-title">
                            {t.footer.socialMedia}
                        </h4>
                        <ul className="footer-social">
                            <li>
                                <a href="https://www.tiktok.com/@welcome.jembrana?_t=ZS-8yGEWwYu9S4&_r=1">
                                <TikTokOutlined /> Tiktok 
                                </a>
                            </li>
                            <li>
                                <a href="https://youtube.com/@disparbudjembrana3048?si=ufRgQxjEoHJNipH-">
                                <YoutubeOutlined /> YouTube
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/share/1XftPv7x3T/?mibextid=qi2Omg">
                                <FacebookOutlined /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/jahjembrana">
                                <InstagramOutlined /> Instagram
                                </a>
                            </li>
                        </ul>
                    </Col>

                    {/* Kontak Kami */}
                    <Col xs={24} sm={24} md={5} className="footer-column">
                        <h4 className="footer-section-title">
                            {t.footer.contactUs}
                        </h4>
                        <div
                            style={{
                                color: "#fff",
                                fontSize: "1rem",
                                marginBottom: 8,
                            }}
                        >
                            {t.footer.call}: 08xxx
                        </div>
                        <div
                            style={{
                                color: "#fff",
                                fontSize: "1rem",
                                lineHeight: "1.5",
                            }}
                        >
                            {t.footer.location}: {t.footer.street}
                        </div>
                    </Col>
                </Row>
                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Komunitas Pariwisata Jembrana | powered by Triloka
                    </p>
                </div>
            </div>
        </Footer>
    );
}
