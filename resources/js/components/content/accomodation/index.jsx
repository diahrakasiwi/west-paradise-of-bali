import { usePage } from "@inertiajs/inertia-react";
import { Card, Flex, notification, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import AddButton from "../../common/add-button";
import SearchBar from "../../common/search";
import AccomodationColumns from "./columns";
import FormSelectAccomodation from "../../common/select/accomodation";
import { Inertia } from "@inertiajs/inertia";

export default function AccomodationContent() {
    const { accomodations = [] } = usePage().props;

    const [searchValue, setSearchValue] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [filteredData, setFilteredData] = useState(accomodations);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    const columns = AccomodationColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/accommodations/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Akomodasi berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus akomodasi.",
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
        const filtered = accomodations.filter((item) => {
            const matchSearch = (item.name || "")
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

        setFilteredData(filtered);
    }, [searchValue, selectedDistrict, selectedVillage, accomodations]);

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectAccomodation
                    accomodation={accomodations}
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
                            Inertia.visit("/dashboard/accommodations/create")
                        }
                        title="Tambah Akomodasi"
                    />
                    <SearchBar
                        placeholder="Cari Akomodasi"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={(val) => setSearchValue(val)}
                    />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={filteredData}
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
