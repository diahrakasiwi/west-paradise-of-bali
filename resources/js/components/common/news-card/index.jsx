import { CalendarOutlined, EyeOutlined } from "@ant-design/icons";
import { Card } from "antd";
import dayjs from "dayjs";
import { Link } from "@inertiajs/inertia-react";
import "dayjs/locale/id";

dayjs.locale("id");

export default function NewsCard({ slug, title, createdAt, imageUrl, cardStyle={} }) {
    return (
        <Link href={`/detail-news/${slug}`} style={{ textDecoration: "none" }}>
            <Card
                hoverable
                style={{
                    width: cardStyle?.width || 275,
                    minHeight: cardStyle?.minHeight || 320, //mengatur tinggi card news agar semua sama
                    borderRadius: cardStyle?.borderRadius || 20,
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    fontFamily: "sans-serif",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                }}
                bodyStyle={{ padding: "16px" }}
                cover={
                    <img
                        src={imageUrl}
                        alt={title}
                        style={{
                            height: 180,
                            objectFit: "cover",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            marginBottom: 8,
                        }}
                    />
                }
            >
                {/* mengatur judul */}
                <div style={{
                        fontWeight: 600,
                        fontSize: 16,
                        marginBottom: 12,
                        height: 48,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}>
                    {title}
                </div>
                
                {/* Info tanggal dan view */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#888",
                        fontSize: 14,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <CalendarOutlined />
                        {dayjs(createdAt).format("D MMMM YYYY")}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <EyeOutlined />
                        200
                    </div>
                </div>
            </Card>
        </Link>
    );
}
