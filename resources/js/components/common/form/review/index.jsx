import { Form, Input, Rate, Button, Typography } from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Title } = Typography;

export default function FormReview({ onSubmit, type, reviewableId }) {
    const [form] = Form.useForm();
    const [rating, setRating] = useState(0);

    const onFinish = async (values) => {
        const payload = {
            ...values,
            rating: values.rating, //ditambah
            review_type: type, // optional, but if still used, keep it
            reviewable_id: reviewableId,
            reviewable_type: getReviewableType(type),
        };

        await onSubmit(payload);
        form.resetFields();
        setRating(0);
    };

    // Fungsi untuk mengembalikan nama model full sesuai type
    const getReviewableType = (type) => {
        switch (type) {
            case "restoran":
                return "App\\Models\\Restaurant";
            case "destinasi":
                return "App\\Models\\TouristDestination";
            case "akomodasi":
                return "App\\Models\\Accomodation";
            case "desa-wisata":
                return "App\\Models\\Village";
            case "ekonomi-kreatif":
                return "App\\Models\\CreativeEconomy";
            case "transportasi":
                return "App\\Models\\Transportation";
            case "fasilitas-kesehatan":
                return "App\\Models\\HealthFacility";
            default:
                return "";
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <Title level={5} style={{ fontWeight: 700 }}>
                Berikan Peringkat dan Ulasan
            </Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
            >
                <Form.Item
                    label={
                        <span>
                            Peringkat<span style={{ color: "red", marginLeft: 4 }}>*</span>
                        </span>
                    }
                    name="rating"
                    rules={[{ required: true, message: "Peringkat wajib diisi" }]}
                >
                    <Rate style={{ color: "#E4A70A", fontSize: 28 }} />
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Nama<span style={{ color: "red", marginLeft: 4 }}>*</span>
                        </span>
                    }
                    name="name"
                    rules={[{ required: true, message: "Nama wajib diisi" }]}
                >
                    <Input placeholder="Masukkan Nama" size="medium" />
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Email<span style={{ color: "red", marginLeft: 4 }}>*</span>
                        </span>
                    }
                    name="email"
                    rules={[
                        { required: true, message: "Email wajib diisi" },
                        { type: "email", message: "Email tidak valid" },
                    ]}
                >
                    <Input placeholder="Masukkan Email" size="medium" />
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Ulasan<span style={{ color: "red", marginLeft: 4 }}>*</span>
                        </span>
                    }
                    name="review"
                    rules={[{ required: true, message: "Ulasan wajib diisi" }]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Masukkan Ulasan"
                        size="medium"
                        style={{ resize: "none" }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{
                            backgroundColor: "#E71C47",
                            border: "none",
                            fontWeight: 600,
                            padding: "6px 32px",
                            borderRadius: 999,
                            position: "absolute",
                        }}
                    >
                        Kirim
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}