import { usePage } from "@inertiajs/inertia-react";
import HealthFacilityColumns from "./colums";
import { Inertia } from "@inertiajs/inertia";
import { Card, Flex, notification, Table, Modal } from "antd";
import FormSelectHealthFacility from "../../common/select/health-facility";
import AddButton from "../../common/add-button";
import SearchBar from "../../common/search";
import { useState, useEffect } from "react";

export default function HealthFacilitiesContent() {
    const { healthFacilities } = usePage().props;

    const [searchValue, setSearchValue] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [filteredFacilities, setFilteredFacilities] = useState(healthFacilities);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    const columns = HealthFacilityColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/health-facilities/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Fasilitas Kesehatan berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus Fasilitas Kesehatan.",
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

    useEffect(() => {
        const filtered = healthFacilities.filter((item) => {
            const matchSearch = item.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());

            const matchDistrict = selectedDistrict
                ? item.district === selectedDistrict
                : true;

            const matchVillage = selectedVillage
                ? item.village === selectedVillage
                : true;

            return matchSearch && matchDistrict && matchVillage;
        });

        setFilteredFacilities(filtered);
    }, [searchValue, selectedDistrict, selectedVillage, healthFacilities]);

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectHealthFacility
                    healthFacility={healthFacilities}
                    onFilter={({ district, village }) => {
                        setSelectedDistrict(district);
                        setSelectedVillage(village);
                    }}
                />
            </Card>
            <Card style={{ borderRadius: 8 }}>
                <Flex
                    justify="space-between"
                    align="middle"
                    style={{ marginBottom: 16 }}
                >
                    <AddButton
                        onClick={() =>
                            Inertia.visit("/dashboard/health-facilities/create")
                        }
                        title="Tambah Fasilitas Kesehatan"
                    />
                    <SearchBar
                        placeholder="Cari Fasilitas Kesehatan"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={(val) => setSearchValue(val)}
                    />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={filteredFacilities}
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
