import { Typography, Row, Col, Card } from "antd";
import Hero from "../../common/hero";
import translations from "../../../lang/lang";
import { Link } from '@inertiajs/inertia-react';

const { Title, Paragraph } = Typography;

export default function AboutContent({ locale }) {
    const t = translations[locale || "id"];
    const features = t.aboutSection.features;

    return (
        <div style={{ background: "#fff" }}>
            <Hero
                image="/assets/images/hero-about.png"
                title={t.aboutSection.title}
                description={t.aboutSection.description}
            />

            {/* Tentang Section */}
            <div
                style={{
                    maxWidth: 1100,
                    margin: "48px auto 32px",
                    padding: "0 16px",
                }}
            >
                <Row gutter={[48, 24]} align="top">
                    <Col xs={24} md={10}>
                        <Title
                            level={4}
                            style={{
                                fontWeight: 600,
                                marginBottom: 10,
                                fontFamily: "Playfair Display",
                                textAlign: "center",
                            }}
                        >
                            {t.aboutSection.title}
                        </Title>
                        <Title
                            level={2}
                            style={{
                                margin: "0 0 16px",
                                fontWeight: 700,
                                lineHeight: 1.1,
                                fontSize: "clamp(32px, 6vw, 50px)",
                                fontFamily: "Playfair Display",
                                textAlign: "center",
                            }}
                        >
                            West Paradise
                            <br />
                            of Bali
                        </Title>
                    </Col>
                    <Col xs={24} md={14}>
                        <Paragraph
                            style={{
                                fontSize: 16,
                                marginBottom: 0,
                                fontWeight: 500,
                                textAlign: "justify",
                            }}
                        >
                            {t.aboutSection.paragraph}
                            <br />
                            <br />
                            {t.aboutSection.paragraph2}
                        </Paragraph>
                    </Col>
                </Row>

                <hr
                    style={{
                        margin: "100px 0 100px",
                        border: "none",
                        borderTop: "1.5px solid #eee",
                    }}
                />

                <Title
                    level={2}
                    style={{
                        textAlign: "center",
                        marginBottom: 40,
                        fontFamily: "Playfair Display",
                    }}
                >
                    {t.aboutSection.textFeatures}
                </Title>

                {/* Features */}
                <div style={{ padding: "24px 0" }}>
                    <Row gutter={[32, 32]} justify="center">
                        {features.map((f) => (
                            <Col
                                key={f.title}
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Link
                                    href={`${f.link}${f.link.includes("?") ? "&" : "?"}lang=${locale}`}
                                    style={{ textDecoration: "none" }}
                                >

                                    <Card
                                        bordered={false}
                                        style={{
                                            borderRadius: 50,
                                            minHeight: 220,
                                            width: "100%",
                                            maxWidth: 300,
                                            background: "#fff",
                                            textAlign: "center",
                                            position: "relative",
                                            paddingTop: 10,
                                            boxShadow: "0 8px 30px rgba(0,0,0,0.20)",
                                            cursor: "pointer",
                                        }}
                                        bodyStyle={{ padding: "20px 20px" }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: -30,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: 60,
                                                height: 60,
                                                borderRadius: "50%",
                                                backgroundColor: "#f5f5f5",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                            }}
                                        >
                                            <img
                                                src={f.icon}
                                                alt={f.title}
                                                style={{ width: 32 }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontWeight: 600,
                                                fontSize: 18,
                                                marginBottom: 20,
                                                marginTop: 20,
                                            }}
                                        >
                                            {f.title}
                                        </div>
                                        <div
                                            style={{ fontSize: 14, color: "#1E1E1E" }}
                                        >
                                            {f.desc}
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Lokasi Kami Section */}
            <div
                style={{
                    background:
                        "linear-gradient(135deg, #4b665b 0%, #7fa084 100%)",
                    padding: "54px 0 48px 0",
                    color: "white",
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        padding: "0 16px",
                    }}
                >
                    <Title
                        level={2}
                        style={{
                            color: "#fff",
                            textAlign: "center",
                            marginBottom: 32,
                        }}
                    >
                        {t.aboutSection.locationUs}
                    </Title>
                    <div
                        style={{
                            borderRadius: 24,
                            overflow: "hidden",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                            margin: "0 auto",
                            background: "#fff",
                            width: "100%",
                            maxWidth: 3000,
                        }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.4263811681644!2d114.63385487501112!3d-8.359648091677336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1620e6d8ee805%3A0x2ff05e5d28e3513c!2sDinas%20Pariwisata%20dan%20Kebudayaan!5e0!3m2!1sen!2sid!4v1752286101654!5m2!1sen!2sid"
                            width="100%"
                            height="500"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Jembrana"
                            style={{ border: 0 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
