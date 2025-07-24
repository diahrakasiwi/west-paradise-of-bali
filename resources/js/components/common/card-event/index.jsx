import { Card, Typography, Tag, Grid } from "antd";
import { EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Inertia } from "@inertiajs/inertia";
import translations from "../../../lang/lang";
import { useState } from "react";
import styles from "./CardEvent.module.css";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

dayjs.locale("id");

export default function CardEvent({
    name,
    description,
    address,
    start_date,
    end_date,
    thumbnail,
    type_category,
    id,
    is_uncertain,
    locale,
    category,
}) {
    const screens = useBreakpoint();
    const [showFullDesc, setShowFullDesc] = useState(false);
    const parsedDesc = parse(description);
    const t = translations[locale || "id"];

    const formattedDate =
        start_date === end_date
            ? dayjs(start_date).format("DD MMMM YYYY")
            : `${dayjs(start_date).format("DD")} – ${dayjs(end_date).format(
                  "DD MMMM YYYY"
              )}`;
    return (
        <Card
            style={{
                width: 800,
                borderRadius: 30,
                padding: "2px 0px 0px 0px",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.06)",
                cursor: "pointer",
                transition: "transform 0.2s",
            }}
            bodyStyle={{ padding: 0 }}
            hoverable
            onClick={() =>
                Inertia.visit(
                    `/detail-event/?id=${id}&type=event&lang=${locale}`
                )
            }
        >
            <div
                style={{
                    display: "flex",
                    gap: 16,
                    flexDirection: screens.xs ? "column" : "row",
                    alignItems: screens.xs ? "center" : "flex-start",
                    padding: 10,
                }}
            >
                {/* Thumbnail */}
                <div
                    style={{
                        position: "relative",
                        width: screens.xs ? "100%" : 170,
                        height: 170,
                        overflow: "hidden",
                        borderRadius: 30,
                        flexShrink: 0,
                    }}
                >
                    <img
                        src={thumbnail}
                        alt={name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 30,
                        }}
                    />
                    <Tag
                        color="#999"
                        style={{
                            position: "absolute",
                            bottom: 8,
                            left: 8,
                            background: "rgba(165,165,165,0.65)",
                            color: "#fff",
                            fontWeight: 400,
                            borderRadius: 10,
                            padding: "2px 8px",
                            fontSize: 12,
                            marginLeft: 45,
                        }}
                    >
                        Kategori {category?.name_category || "Tidak diketahui"}
                    </Tag>
                </div>

                {/* Content */}
                <div
                    style={{
                        flex: 1,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: 160,
                    }}
                >
                    <Title
                        level={5}
                        style={{
                            marginTop: 4,
                            fontWeight: 600,
                            fontSize: 16,
                            color: "#1E1E1E",
                        }}
                    >
                        {name}
                    </Title>

                    {/* Deskripsi */}
                    <div style={{ marginTop: -15 }}>
                        <Paragraph
                            className={
                                !showFullDesc ? styles.clampedDescription : ""
                            }
                            style={{
                                fontSize: 14,
                                color: "#484848",
                                marginBottom: 2,
                            }}
                        >
                            {parsedDesc}
                        </Paragraph>

                        {description.length > 200 && (
                            <Text
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFullDesc(!showFullDesc);
                                }}
                                style={{
                                    color: "#E81E4B",
                                    fontWeight: 500,
                                    fontSize: 14,
                                    cursor: "pointer",
                                    userSelect: "none",
                                }}
                            >
                                {showFullDesc ? t.event.less : t.event.more}
                            </Text>
                        )}
                    </div>

                    {/* Lokasi & Tanggal - POSISI DIBAWAH */}
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            flexWrap: "wrap",
                            alignItems: "center",
                            fontSize: 14,
                            marginTop: "auto", // Push ke bawah
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: 6,
                                alignItems: "center",
                            }}
                        >
                            <EnvironmentOutlined style={{ color: "#f44336" }} />
                            <Text>{address}</Text>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: 6,
                                alignItems: "center",
                            }}
                        >
                            <CalendarOutlined style={{ color: "#4caf50" }} />
                            {is_uncertain ? (
                                <Text type="warning">{t.event.uncertain}</Text>
                            ) : (
                                <Text>{formattedDate}</Text>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
