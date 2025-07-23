import { usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Card, Flex, notification, Table, Modal } from "antd";
import SearchBar from "../../common/search";
import AddButton from "../../common/add-button";
import NewsColumns from "./columns";
import { Inertia } from "@inertiajs/inertia";

export default function NewsContent() {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    const { news } = usePage().props;
    const columns = NewsColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/news/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Acara berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus acara.",
                    });
                },
            });
        },
        onImageDetail: (record) => {
        console.log("PREVIEW RECORD:", JSON.stringify(record, null, 2));
            setPreviewData(record);
            setPreviewVisible(true);
        },
    });
    return (
        <div>
            <Card style={{ borderRadius: 8 }}>
                <Flex
                    justify="space-between"
                    align="middle"
                    style={{ marginBottom: 16 }}
                >
                    <AddButton
                        onClick={() =>
                            Inertia.visit("/dashboard/news/create")
                        }
                        title="Tambah Acara"
                    />
                    <SearchBar
                        // value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={() => {}}
                    />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={news}
                    rowKey="id"
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
            
            {/* MODAL DETAIL GAMBAR */}
            {previewData && (
            <Modal
                visible={!!previewData}
                onCancel={() => setPreviewData(null)}
                footer={null}
            >
                <h2>Detail Gambar</h2>

                <p><strong>Thumbnail:</strong></p>
                <img
                src={previewData.thumbnail}
                alt="Thumbnail"
                style={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 8 }}
                />

                {/* Tambahkan ini untuk menampilkan galeri */}
                {previewData.images && previewData.images.length > 0 && (
                <>
                    <p style={{ marginTop: 16 }}><strong>Foto:</strong></p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {previewData.images.map((img, index) => (
                        <img
                        key={index}
                        src={img.image_url}
                        alt={`Gallery ${index + 1}`}
                        style={{
                            width: "48%",
                            borderRadius: 8,
                            objectFit: "cover",
                        }}
                        />
                    ))}
                    </div>
                </>
                )}
            </Modal>
            )}
        </div>
    );
}
