import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function Detail() {
    const paket = {
        name: "Paket Tour - Desa Wisata Manistutu",
        image: "/assets/images/paket-wisata.jpg",
        description: "Nikmati pengalaman berwisata menyusuri keindahan alam Desa Manistutu dengan berbagai fasilitas menarik yang kami tawarkan dalam paket ini.",
    };

    return (
        <div style={{ padding: 50 }}>
            <Title>{paket.name}</Title>
            <img
                src={paket.image}
                alt={paket.name}
                style={{ width: "50%", borderRadius: 16, marginBottom: 20 }}
            />
            <Paragraph>{paket.description}</Paragraph>
        </div>
    );
}
