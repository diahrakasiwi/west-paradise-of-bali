import { CalendarOutlined, EyeOutlined } from "@ant-design/icons";
import { Card } from "antd";
import dayjs from "dayjs";
import { Link } from "@inertiajs/inertia-react";
import "dayjs/locale/id";
dayjs.locale("id");

export default function NewsCard({ slug, title, createdAt, imageUrl }) {
    return (
        <Link href={`/detail-news/${slug}`} style={{ textDecoration: "none" }}>
            <Card
                hoverable
                style={{
                    width: 275,
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    fontFamily: "sans-serif",
                    cursor: "pointer",
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
                        }}
                    />
                }
            >
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 12 }}>
                    {title}
                </div>

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
