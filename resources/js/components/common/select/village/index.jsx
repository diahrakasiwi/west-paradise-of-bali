import { Button, Form, Row, Col, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";

export default function FormSelectVillage({ onFilter, village }) {
    const [district, setDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");

    const districts = Array.from(new Set(village.map((item) => item.district)));
    const villages = Array.from(new Set(village.map((item) => item.village)));

    const handleFilterChange = (field, value) => {
        if (field === "district") setDistrict(value);
        if (field === "village") setSelectedVillage(value);
        onFilter({
            district: field === "district" ? value : district,
            village: field === "village" ? value : selectedVillage,
        });
    };

    return (
        <Form>
            <Title level={4} style={{ marginBottom: 16, marginTop: 4}}>Desa Wisata</Title>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                <Form.Item
                        label="Pilih Kecamatan"
                        style={{ marginBottom: 0 }}
                ></Form.Item>
                    <Select
                        placeholder="Pilih Kecamatan"
                        style={{ width: "100%" }}
                        value={district || undefined}
                        onChange={(val) => handleFilterChange("district", val)}
                    >
                        {districts.map((d) => (
                            <Select.Option key={d} value={d}>
                                {d}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={6}>
                <Form.Item
                        label="Pilih Desa/Kelurahan"
                        style={{ marginBottom: 0 }}
                ></Form.Item>
                    <Select
                        placeholder="Desa/Kelurahan"
                        style={{ width: "100%" }}
                        value={selectedVillage || undefined}
                        onChange={(val) => handleFilterChange("village", val)}
                    >
                        {villages.map((v) => (
                            <Select.Option key={v} value={v}>
                                {v}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={6}>
                    {/* <Button
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={() =>
                            onFilter({
                                district,
                                village: selectedVillage,
                            })
                        }
                    >
                        Submit
                    </Button> */}
                </Col>
            </Row>
        </Form>
    );
}
