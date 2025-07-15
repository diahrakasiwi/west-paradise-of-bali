import {
    Row,
    Col,
    Typography,
    Rate,
    Divider,
    Pagination,
    Progress,
    Button,
    Flex,
    Card,
    notification,
} from "antd";
import { ArrowLeftOutlined, StarFilled } from "@ant-design/icons";
import FormReview from "../../common/form/review";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

const { Paragraph } = Typography;

export default function ReviewContent() {
    const { id, type, reviews, access } = usePage().props;
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const paginatedReviews = reviews.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const ratingStats = [5, 4, 3, 2, 1].map((star) => {
        const total = reviews.length;
        const count = reviews.filter((r) => r.rating === star).length;
        return {
            star,
            percent: total > 0 ? Math.round((count / total) * 100) : 0,
        };
    });

    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              ).toFixed(1)
            : 0;

    const handleFinish = (values) => {
        Inertia.post("/review", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Ulasan berhasil ditambahkan.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name || "Terjadi kesalahan saat menambahkan ulasan.",
                });
            },
        });
    };

    return (
        <div
            style={{
                background: `url('/assets/images/bg-detail.png') center/cover no-repeat`,
                padding: 48,
            }}
        >
            <Flex align="center" gap={10} style={{ marginBottom: 24, marginTop: 50 }}>
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined style={{ fontSize: 18 }} />}
                    onClick={() =>
                        access === "destination"
                            ? Inertia.visit(`/detail-destination/?id=${id}&type=${type}`)
                            : Inertia.visit(`/detail-event/?id=${id}`)
                    }
                    style={{ color: "white" }}
                />
                <span style={{ color: "white", fontSize: 16, fontWeight: 600 }}>
                    Detail Ulasan
                </span>
            </Flex>

            <div style={{ padding: "20px 40px" }}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={14}>
                        <Card style={{ borderRadius: 12 }}>
                            {reviews.length === 0 ? (
                                <div style={{ textAlign: "center", padding: "32px 0" }}>
                                    <Typography.Title level={4}>
                                        Belum ada ulasan.
                                    </Typography.Title>
                                    <Typography.Paragraph style={{ color: "#666" }}>
                                        Jadilah pengguna pertama yang memberikan ulasan dan bantu
                                        pengunjung lainnya!
                                    </Typography.Paragraph>
                                </div>
                            ) : (
                                <>
                                    {paginatedReviews.map((review, index) => (
                                        <div key={index} style={{ marginBottom: 24 }}>
                                            <div style={{ fontWeight: 600, fontSize: 16 }}>
                                                {review.name}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: "#888",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                <Rate
                                                    disabled
                                                    defaultValue={review.rating}
                                                    style={{ fontSize: 16 }}
                                                />
                                                <span style={{ marginLeft: 8 }}>
                                                    {review.relative_time}
                                                </span>
                                            </div>
                                            <Paragraph style={{ fontSize: 15, marginBottom: 0 }}>
                                                {review.review}
                                            </Paragraph>
                                            <Divider />
                                        </div>
                                    ))}
                                    <Pagination
                                        current={currentPage}
                                        total={reviews.length}
                                        pageSize={pageSize}
                                        onChange={(page) => setCurrentPage(page)}
                                    />
                                </>
                            )}
                        </Card>
                    </Col>

                    <Col xs={24} lg={10}>
                        <Card style={{ borderRadius: 12 }}>
                            <Card
                                style={{
                                    border: "1px solid #f0f0f0",
                                    borderRadius: 12,
                                    padding: 12,
                                    backgroundColor: "#f0f0f0",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ width: "50%" }}>
                                        {ratingStats.map((item) => (
                                            <div
                                                key={item.star}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginBottom: 8,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 40,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 4,
                                                    }}
                                                >
                                                    <span>{item.star}</span>
                                                    <StarFilled style={{ color: "#FFC107" }} />
                                                </div>
                                                <Progress
                                                    percent={item.percent}
                                                    showInfo={false}
                                                    strokeColor="#176B5D"
                                                    trailColor="#f0f0f0"
                                                    style={{ flex: 1, marginLeft: 8 }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ textAlign: "center", width: "50%" }}>
                                        <div style={{ fontSize: 48, fontWeight: 700 }}>
                                            {averageRating}
                                        </div>
                                        <Rate
                                            disabled
                                            allowHalf
                                            defaultValue={parseFloat(averageRating)}
                                            style={{ fontSize: 20 }}
                                        />
                                        <div
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                marginTop: 8,
                                            }}
                                        >
                                            {reviews.length} Reviews
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <FormReview
                                onSubmit={handleFinish}
                                type={type}
                                reviewableId={id}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}