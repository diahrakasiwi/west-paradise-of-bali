import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    Typography,
    Space,
    Select,
    Upload,
    Row,
    Col,
    TimePicker,
    Divider,
    Popconfirm,
} from "antd";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "../../map";
import { supabase } from "../../../../utils/supabase-client";
import SupaImageUploader from "../../../../utils/image-uploader";
import { usePage } from "@inertiajs/inertia-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function FormTranportasi({
    onSubmit,
    onCancel,
    process,
    initialValues,
    title,
}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isFullDay, setIsFullDay] = useState(
        initialValues?.is_fullday ?? false
    );
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [photosPreview, setPhotosPreview] = useState([]);

    const handleFinish = async (values) => {
        setLoading(true);
        const formattedValues = {
            ...values,
            start_time: values.start_time
                ? dayjs(values.start_time).format("HH:mm")
                : null,
            end_time: values.end_time
                ? dayjs(values.end_time).format("HH:mm")
                : null,
        };
        await onSubmit(formattedValues);
        setLoading(false);
    };

    const defaultPosition = [-8.3556, 114.6418];
    const latlng =
        initialValues && initialValues.latitude
            ? parseFloat(initialValues.latitude)
            : null;
    const lnglng =
        initialValues && initialValues.longitude
            ? parseFloat(initialValues.longitude)
            : null;

    const defaultLatlng =
        latlng !== null && lnglng !== null ? [latlng, lnglng] : defaultPosition;

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                start_time: initialValues?.start_time
                    ? dayjs(initialValues.start_time, "HH:mm")
                    : null,
                end_time: initialValues?.end_time
                    ? dayjs(initialValues.end_time, "HH:mm")
                    : null,
                photos:
                    initialValues?.images?.map((img) => img.image_url) || [],
                thumbnail: initialValues?.thumbnail || "",
            });

            setThumbnailPreview(initialValues?.thumbnail || "");
            setPhotosPreview(
                initialValues?.images?.map((img) => img.image_url) || []
            );
        }
    }, [initialValues]);
    return (
        <div>
            <Card style={{ borderRadius: 10 }}>
                <Title level={4}>{title}</Title>
                <Divider />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={{
                        ...initialValues,
                        start_time: initialValues?.start_time
                            ? dayjs(initialValues.start_time, "HH:mm")
                            : null,
                        end_time: initialValues?.end_time
                            ? dayjs(initialValues.end_time, "HH:mm")
                            : null,
                        photos:
                            initialValues?.images?.map(
                                (img) => img.image_url
                            ) || [],
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Nama Transportasi"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Nama Transportasi wajib diisi",
                                    },
                                ]}
                            >
                                <Input placeholder="Masukkan Nama Transportasi..." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Kecamatan"
                                name="district"
                                rules={[
                                    {
                                        required: true,
                                        message: "Kecamatan wajib diisi",
                                    },
                                ]}
                            >
                                <Input placeholder="Masukkan Kecamatan..." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Desa/Kelurahan"
                                name="village"
                                rules={[
                                    {
                                        required: true,
                                        message: "Desa/Kelurahan wajib diisi",
                                    },
                                ]}
                            >
                                <Input placeholder="Masukkan Desa/Kelurahan..." />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Alamat"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Alamat wajib diisi",
                                    },
                                ]}
                            >
                                <Input placeholder="Masukkan Alamat..." />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Pilih Lokasi di Peta">
                        <MapContainer
                            center={defaultLatlng}
                            zoom={12}
                            style={{
                                height: 300,
                                borderRadius: 8,
                                marginBottom: 24,
                            }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker
                                initialPosition={
                                    latlng !== null && lnglng !== null
                                        ? { lat: latlng, lng: lnglng }
                                        : null
                                }
                                onLocationChange={(latlng) => {
                                    form.setFieldsValue({
                                        latitude: latlng.lat,
                                        longitude: latlng.lng,
                                    });
                                }}
                            />
                        </MapContainer>
                        <Form.Item name="latitude" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name="longitude" hidden>
                            <Input />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        label="Deskripsi"
                        name="description"
                        rules={[
                            { required: true, message: "Deskripsi wajib diisi" },
                        ]}
                    >
                        <ReactQuill
                            theme="snow"
                            onChange={(content) =>
                                form.setFieldsValue({ description: content })
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Thumbnail"
                        name="thumbnail"
                        rules={[
                            { required: true, message: "Upload thumbnail" },
                        ]}
                    >
                    <div
                        style={{
                            backgroundColor: "#FFFDF0",
                            padding: 10,
                            borderLeft: "6px solid orange",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            marginBottom: 24,
                            fontWeight: 320,
                        }}
                    >
                        <Text>
                            <b>Petunjuk Thumbnail:</b> Disarankan rasio gambar: 4:3 (landscape) | Maksimal ukuran file: 2 MB | Format jpg, jpeg, png, atau webp.
                        </Text>
                    </div>
                        <>
                            {process === "update" && thumbnailPreview ? (
                                <div style={{ marginBottom: 10 }}>
                                    <img
                                        src={thumbnailPreview}
                                        alt="Thumbnail Preview"
                                        style={{
                                            border: "1px dashed #ccc",
                                            width: "100%",
                                            marginBottom: 10,
                                            borderRadius: 8,
                                            maxHeight: 200,
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Popconfirm
                                        title="Hapus thumbnail ini?"
                                        onConfirm={async () => {
                                            const path =
                                                getPathFromUrl(
                                                    thumbnailPreview
                                                ); // ambil path dari URL
                                            const { error } =
                                                await supabase.storage
                                                    .from("images") // ganti jika nama bucket beda
                                                    .remove([path]);

                                            if (error) {
                                                message.error(
                                                    "Gagal menghapus gambar: " +
                                                        error.message
                                                );
                                            } else {
                                                message.success(
                                                    "Thumbnail berhasil dihapus!"
                                                );
                                                setThumbnailPreview("");
                                                form.setFieldsValue({
                                                    thumbnail: "",
                                                });
                                            }
                                        }}
                                        okText="Ya"
                                        cancelText="Batal"
                                    >
                                        <Button
                                            icon={<DeleteOutlined />}
                                            danger
                                            type="primary"
                                            size="large"
                                        >
                                            Hapus Thumbnail
                                        </Button>
                                    </Popconfirm>
                                </div>
                            ) : (
                                <SupaImageUploader
                                    folder="thumbnails"
                                    bucket="images"
                                    label="Upload Thumbnail"
                                    onUpload={async (path) => {
                                        const { data } = supabase.storage
                                            .from("images")
                                            .getPublicUrl(path);
                                        const imageUrl = data.publicUrl;
                                        form.setFieldsValue({
                                            thumbnail: imageUrl,
                                        });
                                        setThumbnailPreview(imageUrl);
                                    }}
                                />
                            )}
                        </>
                    </Form.Item>

                    <Form.Item
                        label="Foto"
                        name="photos"
                        rules={[{ required: true, message: "Upload foto" }]}
                    >
                    <div
                        style={{
                            backgroundColor: "#FFFDF0",
                            padding: 10,
                            borderLeft: "6px solid orange",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            marginBottom: 24,
                            fontWeight: 320,
                        }}
                    >
                        <Text>
                            <b>Petunjuk Foto:</b> Unggah minimal 1 foto | Maksimal ukuran file: 2 MB | Format jpg, jpeg, png, atau webp.
                        </Text>
                    </div>
                        <>
                            {process === "update" &&
                            photosPreview.length > 0 ? (
                                photosPreview.map((url, index) => (
                                    <div
                                        key={index}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <img
                                            src={url}
                                            alt={`Foto ${index + 1}`}
                                            style={{
                                                border: "1px dashed #ccc",
                                                width: "100%",
                                                objectFit: "cover",
                                                borderRadius: 8,
                                                marginBottom: 8,
                                            }}
                                        />
                                        <Popconfirm
                                            title="Hapus foto ini?"
                                            onConfirm={async () => {
                                                const pathToDelete =
                                                    getPathFromUrl(url);
                                                const { error } =
                                                    await supabase.storage
                                                        .from("images")
                                                        .remove([pathToDelete]);

                                                if (error) {
                                                    message.error(
                                                        "Gagal menghapus gambar: " +
                                                            error.message
                                                    );
                                                } else {
                                                    message.success(
                                                        "Foto berhasil dihapus!"
                                                    );
                                                    // update preview state
                                                    const updatedPreviews = [
                                                        ...photosPreview,
                                                    ];
                                                    updatedPreviews.splice(
                                                        index,
                                                        1
                                                    );
                                                    setPhotosPreview(
                                                        updatedPreviews
                                                    );

                                                    // update form field
                                                    const currentFormValue =
                                                        form.getFieldValue(
                                                            "photos"
                                                        ) || [];
                                                    currentFormValue.splice(
                                                        index,
                                                        1
                                                    );
                                                    form.setFieldsValue({
                                                        photos: currentFormValue,
                                                    });
                                                }
                                            }}
                                            okText="Ya"
                                            cancelText="Batal"
                                        >
                                            <Button
                                                icon={<DeleteOutlined />}
                                                danger
                                                type="primary"
                                                size="large"
                                            >
                                                Hapus Foto
                                            </Button>
                                        </Popconfirm>
                                    </div>
                                ))
                            ) : (
                                <SupaImageUploader
                                    folder="photos"
                                    bucket="images"
                                    label="Upload Foto"
                                    multiple
                                    onUpload={(path) => {
                                        const { data } = supabase.storage
                                            .from("images")
                                            .getPublicUrl(path);
                                        const imageUrl = data?.publicUrl;
                                        const current =
                                            form.getFieldValue("photos") || [];
                                        form.setFieldsValue({
                                            photos: [...current, imageUrl],
                                        });
                                        setPhotosPreview((prev) => [
                                            ...prev,
                                            imageUrl,
                                        ]);
                                    }}
                                />
                            )}
                        </>
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Kontak"
                                name="contact"
                                rules={[
                                    {
                                        required: true,
                                        message: "Kontak wajib diisi",
                                    },
                                ]}
                            >
                                <Input placeholder="Masukkan Kontak..." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Kewenangan"
                                name="authority"
                                rules={[
                                    {
                                        required: true,
                                        message: "Kewenangan wajib diisi",
                                    },
                                ]}
                            >
                                <Input placeholder="Masukkan Kewenangan..." />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Waktu Operasional */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Jam Buka" name="start_time">
                                <TimePicker
                                    format="HH:mm"
                                    style={{ width: "100%" }}
                                    disabled={isFullDay}
                                    value={
                                        isFullDay
                                            ? null
                                            : form.getFieldValue("start_time")
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Jam Tutup" name="end_time">
                                <TimePicker
                                    format="HH:mm"
                                    style={{ width: "100%" }}
                                    disabled={isFullDay}
                                    value={
                                        isFullDay
                                            ? null
                                            : form.getFieldValue("end_time")
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="is_fullday" valuePropName="checked">
                        <Checkbox
                            onChange={(e) => {
                                setIsFullDay(e.target.checked);
                            }}
                        >
                            24 Jam{" "}
                            <Text italic type="secondary">
                                * Centang jika Transportasi beroperasi 24
                                Jam.
                            </Text>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item
                        label="Fasilitas"
                        name="facilities"
                        rules={[
                            { required: true, message: "Fasilitas wajib diisi" },
                        ]}
                    >
                    {/* Informasi Petunjuk */}
                    <div
                        style={{
                            backgroundColor: "#FFFDF0",
                            padding: 10,
                            borderLeft: "6px solid orange",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            marginBottom: 24,
                            fontWeight: 320,
                        }}
                    >
                        <Text>
                            <b>Petunjuk Fasilitas:</b> Harap pisahkan dengan tanda koma (,).
                        </Text>
                    </div>
                        <Input placeholder="Masukkan Fasilitas..." />
                    </Form.Item>

                    <Form.Item
                        label="Google Business / Website"
                        name="google_business"
                        rules={[
                            {
                                required: true,
                                message: "Wajib diisi",
                            },
                        ]}
                    >
                        <Input placeholder="Masukkan Google Business atau Website..." />
                    </Form.Item>

                    <Form.Item name="is_published" valuePropName="checked">
                        <Checkbox>
                            Publish{" "}
                            <Text italic type="secondary">
                                * Centang jika Transportasi dipublish.
                            </Text>
                        </Checkbox>
                    </Form.Item>

                    <Space>
                        <Button onClick={onCancel} size="large" danger>
                            Batal
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            loading={loading}
                            style={{
                                backgroundColor: "#26C72B",
                                borderColor: "#26C72B",
                            }}
                        >
                            Simpan
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
}
