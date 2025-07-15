import { Card } from "antd";
import { EnvironmentFilled, EyeOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "@inertiajs/inertia-react";
import dayjs from "dayjs";
import translations from "../../../lang/lang";

export default function CustomCard({
    id,
    district,
    category = null,
    name,
    imageUrl,
    type,
    slug,
    model,
    views,
    rating,
    createdAt,
    locale,
    width
}) {

    const parseCreatedAt = (createdAt) => {
        return dayjs(createdAt).locale(locale).format("D MMMM YYYY");
    };

    const t = translations[locale || "id"];
    const link =
        type === "destination"
            ? `/detail-destination/?id=${id}&type=${model}&lang=${locale}`
            : `/detail-news/${slug}?lang=${locale}`;


    return (
        <Card
            hoverable
            style={{
                width: width,
                borderRadius: 40,
                boxShadow: "0 12px 32px rgba(50,50,50,0.11)",
                overflow: "hidden",
                margin: "0 auto",
                border: "none",
                position: "relative",
                padding: 0,
            }}
            styles={{
                body: {
                    padding: "20px 20px 20px 20px",
                    borderRadius: "0 0 40px 40px",
                }
            }}
            cover={
                <Link
                    href={link}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <div
                        style={{
                            position: "relative",
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            overflow: "hidden",
                            background: "#fff",
                        }}
                    >
                        {/* District Badge */}
                        {district && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    background: "#77987F",
                                    color: "#fff",
                                    fontSize: 16,
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    borderRadius: "40px 0 40px 0",
                                    padding: "12px 28px 8px 24px",
                                    // letterSpacing: 1,
                                    zIndex: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                                }}
                            >
                                <span style={{ marginRight: 6, fontSize: 16 }}>
                                    <EnvironmentFilled />
                                </span>
                                {district}
                            </div>
                        )}

                        {/* Gambar */}
                        <img
                            src={imageUrl}
                            alt={name}
                            style={{
                                width: "100%",
                                height: 200,
                                objectFit: "cover",
                                borderTopLeftRadius: 40,
                                borderTopRightRadius: 40,
                                display: "block",
                            }}
                        />
                        {type === "destination" && (
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 16,
                                    right: 14,
                                    background: "rgba(140,140,140,0.22)",
                                    color: "#fff",
                                    fontSize: 14,
                                    padding: "7px 24px",
                                    borderRadius: 22,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    zIndex: 3,
                                    fontWeight: 500,
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                <StarFilled
                                    style={{
                                        color: "#EEA641",
                                        fontSize: 16,
                                        marginRight: 2,
                                    }}
                                />
                                <span
                                    style={{ fontWeight: 400, color: "#fff" }}
                                >
                                    {rating ? rating.toFixed(1) : "0.0"}
                                </span>
                            </div>
                        )}
                    </div>
                </Link>
            }
        >
            {/* Nama */}
            <div
                style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#1E1E1E",
                    marginBottom: 5,
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                {name}
            </div>
            {/* Kategori & View */}
            <div
                style={{
                    fontSize: 14,
                    color: "#9A9A9A",
                    marginBottom: 5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: 450,
                }}
            >
                {category ? (
                    <span>
                        {t.destination.category} {category}
                    </span>
                ) : createdAt ? (
                    <span>{parseCreatedAt(createdAt)}</span>
                ) : (
                    <span></span>
                )}
                <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <EyeOutlined style={{ fontSize: 18 }} /> {views}
                </span>
            </div>
        </Card>
    );
}
