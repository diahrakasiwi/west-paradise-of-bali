import { Card } from "antd";
import { EnvironmentFilled, EyeOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "@inertiajs/inertia-react";
import dayjs from "dayjs";
import LinesEllipsis from 'react-lines-ellipsis';
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
  width = 300,
  height = 300,
}) {
  const t = translations[locale || "id"];
  const link =
    type === "destination"
      ? `/detail-destination/?id=${id}&type=${model}&lang=${locale}`
      : `/detail-news/${slug}?lang=${locale}`;

  const parseCreatedAt = (createdAt) =>
    dayjs(createdAt).locale(locale).format("D MMMM YYYY");

  return (
    <Card
      hoverable
      style={{
        width,
        height,
        borderRadius: 40,
        boxShadow: "0 12px 32px rgba(50,50,50,0.11)",
        overflow: "hidden",
        margin: "0 auto",
        border: "none",
        position: "relative", 
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
      styles={{
        body: {
          padding: 20,
          borderRadius: "0 0 40px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        },
      }}
      cover={
        <Link href={link} style={{ textDecoration: "none", color: "inherit" }}>
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
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                }}
              >
                <EnvironmentFilled style={{ marginRight: 6 }} />
                {district}
              </div>
            )}

            {/* Gambar */}
            <img
              src={imageUrl}
              alt={name}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                display: "block",
              }}
            />

            {/* Rating */}
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
                <StarFilled style={{ color: "#EEA641", fontSize: 16 }} />
                <span style={{ fontWeight: 400 }}>
                  {rating ? rating.toFixed(1) : "0.0"}
                </span>
              </div>
            )}
          </div>
        </Link>
      }
    >
      {/* Nama (pakai react-lines-ellipsis) */}
      <LinesEllipsis
        text={name}
        maxLine={2}
        ellipsis="..."
        trimRight
        basedOn="letters"
        component="div"
        style={{
          fontWeight: 600,
          fontSize: 16,
          color: "#1E1E1E",
          fontFamily: "Poppins, sans-serif",
          lineHeight: "22px",
        }}
      />

      {/* Kategori & View */}
      <div
        style={{
          fontSize: 14,
          color: "#9A9A9A",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 450,
          lineHeight: "20px",
        }}
      >
        <span
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {category
            ? `${t.destination.category} ${category}`
            : createdAt
            ? parseCreatedAt(createdAt)
            : ""}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <EyeOutlined style={{ fontSize: 18 }} /> {views}
        </span>
      </div>
    </Card>
  );
}