import { Card, Flex, notification, Table, Modal } from "antd";
import FormSelectTouristDestination from "../../common/select/tourist-destination";
import AddButton from "../../common/add-button";
import { TouristDestinationColumns } from "./colums";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import SearchBar from "../../common/search";
import { useEffect, useState } from "react";

export default function TouristDestinationContent() {
    const { touristDestinations } = usePage().props;

    const [searchValue, setSearchValue] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredDestinations, setFilteredDestinations] = useState(touristDestinations);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    const columns = TouristDestinationColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/tourist-destinations/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Destinasi wisata berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description: errors.name || "Terjadi kesalahan saat menghapus destinasi wisata.",
                    });
                },
            });
        },
        onImageDetail: (record) => {
            setPreviewData(record);
            setPreviewVisible(true);
        },
    });

    useEffect(() => {
        const filtered = touristDestinations.filter((item) => {
            const matchSearch = item.name.toLowerCase().includes(searchValue.toLowerCase());
            const matchDistrict = selectedDistrict ? item.district === selectedDistrict : true;
            const matchVillage = selectedVillage ? item.village === selectedVillage : true;
            const matchCategory = selectedCategory ? item.category?.name_category === selectedCategory : true;
            return matchSearch && matchDistrict && matchVillage && matchCategory;
        });
        setFilteredDestinations(filtered);
    }, [searchValue, selectedDistrict, selectedVillage, selectedCategory, touristDestinations]);

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectTouristDestination
                    onFilter={({ district, village, category }) => {
                        setSelectedDistrict(district);
                        setSelectedVillage(village);
                        setSelectedCategory(category);
                    }}
                    touristDestinations={touristDestinations}
                />
            </Card>
            <Card style={{ borderRadius: 8 }}>
                <Flex justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                    <AddButton
                        onClick={() => Inertia.visit("/dashboard/tourist-destinations/create")}
                        title="Tambah Destinasi"
                    />
                    <SearchBar
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={(val) => setSearchValue(val)}
                    />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={filteredDestinations}
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
