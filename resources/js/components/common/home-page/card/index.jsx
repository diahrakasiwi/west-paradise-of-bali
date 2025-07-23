import { Link, usePage } from "@inertiajs/inertia-react";
import { Col, Row, Typography, Button } from "antd";
import CustomCard from "../../card";
import EventCard from "../../event-card";
import dayjs from "dayjs";
import NewsCard from "../../news-card";
import translations from "../../../../lang/lang";

const { Title } = Typography;

export default function CardHomePage() {
    const {
        touristDestinations,
        restaurants,
        accomodations,
        events,
        news,
        locale,
    } = usePage().props;

    const currentLang = new URLSearchParams(window.location.search).get("lang") || "id";
    const t = translations[locale || "id"];

    return (
        <div style={{ padding: "80px 60px 60px 60px", minHeight: "100vh" }}>

            {/* Paket Wisata */}
            <div style={{ marginBottom: 150 }}>
                <div style={{
                    marginBottom: 44
                }}>
                    <Title
                        level={1}
                        style={{
                            margin: 0,
                            fontSize: 45,
                            fontWeight: 500,
                            fontFamily: "Playfair Display, serif",
                            lineHeight: "1.1",
                        }}
                    >
                        Paket Wisata
                    </Title>
                </div>
                <Row gutter={[16, 24]} justify="start">
                    {[
                        {
                            id: "paket1",
                            name: "Paket Tour - Desa Wisata Manistutu",
                            imageUrl: "/assets/images/paket-wisata.jpg",
                            views: 132,
                            rating: 4.5,
                        },
                        {
                            id: "paket2",
                            name: "Mantu Cager (Manistutu Camping Ground)",
                            imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqF6DLza4sNUrq8vFCoROfsWf4IqWU8XOdD35pDqg_J6_lQD0wqXIzvEFaDUulrxi7vOIHf6Y6pTK4UIXlEUkBjwOxHvb_UFBB62EQpBTNBBBXWhyJojPEeFLNewvNMZ-GiAURx=s1360-w1360-h1020-rw",
                            views: 89,
                            rating: 4.2,
                        },
                        {
                            id: "paket3a",
                            name: "Paket Tour - Desa Wisata Manistutu",
                            imageUrl: "/assets/images/paket-wisata.jpg",
                            views: 104,
                            rating: 4.8,
                        },
                        {
                            id: "paket3b",
                            name: "Mantu Cager (Manistutu Camping Ground)",
                            imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqF6DLza4sNUrq8vFCoROfsWf4IqWU8XOdD35pDqg_J6_lQD0wqXIzvEFaDUulrxi7vOIHf6Y6pTK4UIXlEUkBjwOxHvb_UFBB62EQpBTNBBBXWhyJojPEeFLNewvNMZ-GiAURx=s1360-w1360-h1020-rw",
                            views: 104,
                            rating: 4.8,
                        }
                    ].map((item) => (
                        <Col
                            key={item.id}
                            xs={24} sm={12} md={8} lg={6}
                            style={{ display: "flex", justifyContent: "center"}}
                        >
                        {/* <Link href="/paket-wisata/detail"> */}
                            <CustomCard
                                id={item.id}
                                name={item.name}
                                imageUrl={item.imageUrl}
                                category="Wisata Alam"
                                district="Melaya"
                                model="paket-wisata"
                                type="paket"
                                views={item.views}
                                rating={item.rating}
                                locale={currentLang}
                                style={{
                                    borderRadius: 40,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                                    minWidth: 260,
                                    maxWidth: 340,
                                    width: "100%",
                                    margin: "0 auto",
                                }}
                            />
                            {/* </Link> */}
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Destinasi Wisata */}
            <SectionBlock
                title={t.type.destinasi}
                link={`/destination?lang=${currentLang}&type=destinasi`}
                buttonLabel={t.cardHomePage.moreDestination}
                data={touristDestinations}
                currentLang={currentLang}
                type="destination"
                model="destinasi"
            />

            {/* Restoran */}
            <SectionBlock
                title={t.type.restoran}
                link={`/destination?lang=${currentLang}&type=restoran`}
                buttonLabel={t.cardHomePage.moreRestaurant}
                data={restaurants}
                currentLang={currentLang}
                type="destination"
                model="restoran"
            />

            {/* Akomodasi */}
            <SectionBlock
                title={t.type.akomodasi}
                link={`/destination?lang=${currentLang}&type=akomodasi`}
                buttonLabel={t.cardHomePage.moreAccommodation}
                data={accomodations}
                currentLang={currentLang}
                type="destination"
                model="akomodasi"
            />

            {/* Kalender Event */}
            <div style={{ marginBottom: 150 }}>
                <SectionHeader
                    title={`${t.cardHomePage.event} ${dayjs().year()}`}
                    link="/event"
                    buttonLabel={t.cardHomePage.moreEvent}
                />
                <EventCard events={Array.isArray(events) ? events : []} locale={locale} />
            </div>

            {/* News */}
            <div style={{ marginBottom: 50 }}>
                <SectionHeader
                    title={t.cardHomePage.news}
                    link="/news"
                    buttonLabel={t.cardHomePage.moreNews}
                />
                <Row gutter={[24, 24]} justify="start">
                    {Array.isArray(news) && news.map((item) => (
                        <Col key={item.id} xs={24} sm={12} md={8} lg={6} style={{ display: "flex", justifyContent: "center" }}>
                            <NewsCard
                                title={item.title}
                                name={item.name}
                                createdAt={item.created_at}
                                imageUrl={item.thumbnail}
                                slug={item.slug}
                                type="news"
                                style={{
                                    borderRadius: 42,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                                    minWidth: 290,
                                    maxWidth: 340,
                                    width: "100%",
                                    margin: "0 auto",
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

// Section Header Component
function SectionHeader({ title, link, buttonLabel }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 44,
                gap: 36,
                flexWrap: "wrap",
            }}
        >
            <Title
                level={1}
                style={{
                    margin: 0,
                    fontSize: 45,
                    fontWeight: 500,
                    fontFamily: "Playfair Display, serif",
                    lineHeight: "1.1",
                }}
            >
                {title}
            </Title>
            <Link href={link}>
                <Button
                    type="primary"
                    shape="round"
                    style={{
                        background: "#E71C47",
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: 500,
                        boxShadow: "0 4px 24px rgba(232,30,75,0.15)",
                        padding: "0 32px",
                        height: 49,
                        marginTop: 10,
                    }}
                >
                    {buttonLabel}
                    <span style={{ marginLeft: 8, fontSize: 35, marginBottom: 6 }}>→</span>
                </Button>
            </Link>
        </div>
    );
}

// Reusable Section Block
function SectionBlock({ title, link, buttonLabel, data, currentLang, type, model }) {
    return (
        <div style={{ marginBottom: 150 }}>
            <SectionHeader title={title} link={link} buttonLabel={buttonLabel} />
            <Row gutter={[16, 24]} justify="start">
                {Array.isArray(data) && data.map((item) => (
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6} style={{ display: "flex", justifyContent: "center" }}>
                        <CustomCard
                            id={item.id}
                            name={item.name}
                            imageUrl={item.thumbnail}
                            category={item.category?.name_category}
                            district={item.district}
                            model={model}
                            type={type}
                            views={item.total_view ?? 0}
                            rating={item.average_rating ?? 0}
                            locale={currentLang}
                            style={{
                                borderRadius: 42,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                                minWidth: 260,
                                maxWidth: 340,
                                width: "100%",
                                margin: "0 auto",
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
