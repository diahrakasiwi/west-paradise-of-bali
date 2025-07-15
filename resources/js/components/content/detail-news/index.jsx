import { usePage } from "@inertiajs/inertia-react";
import { Typography, Image, Space, Button, Grid, Flex } from "antd";
import {
    EyeOutlined,
    CalendarOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Inertia } from "@inertiajs/inertia";
import BackgroundHomePage from "../background-home-page";

const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function DetailNewsContent() {
    const { data, locale } = usePage().props;
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
        <div style={{ fontFamily: "Poppins, sans-serif" }}>
            {/* Header Area */}
            <div
                style={{
                    background: `url('/assets/images/bg-detail.png') center/cover no-repeat`,
                    padding: isMobile ? 24 : 48,
                    alignItems: "center",
                }}
            >
                {/* Tombol Kembali */}
                <Flex
                    align="center"
                    gap={10}
                    style={{ marginBottom: 24, marginTop: isMobile ? 24 : 50 }}
                >
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined style={{ fontSize: 18 }} />}
                        onClick={() => Inertia.visit(`/news?lang=${locale}`)}
                        style={{ color: "white" }}
                    />
                    <span
                        style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: 500,
                        }}
                    >
                        Kembali ke Daftar Berita
                    </span>
                </Flex>

                {/* Gambar Header */}
                <Image
                    src={data.thumbnail}
                    alt={data.name}
                    preview={false}
                    style={{
                        width: "100vw",
                        maxWidth: isMobile ? "100%" : "90vw",
                        height: isMobile ? "auto" : "80vh",
                        objectFit: "cover",
                        borderRadius: 12,
                        display: "block",
                    }}
                />
            </div>

            {/* Konten Utama */}
            <div
                style={{
                    maxWidth: 900,
                    margin: "0 auto",
                    padding: "32px 24px",
                }}
            >
                {/* Judul */}
                <Title level={2} style={{ fontWeight: 700 }}>
                    {data.title}
                </Title>

                {/* Metadata */}
                <Space
                    style={{ color: "#777", fontSize: 14, marginBottom: 24 }}
                >
                    <EyeOutlined /> 200
                    <CalendarOutlined />{" "}
                    {dayjs(data.created_at)
                        .locale(locale)
                        .format("DD MMMM YYYY")}
                </Space>

                {/* Deskripsi */}
                <div
                    dangerouslySetInnerHTML={{ __html: data.description }}
                    style={{
                        fontSize: 16,
                        color: "#444",
                        lineHeight: "1.8",
                        marginTop: 16,
                    }}
                />
            </div>
        </div>
    );
}
