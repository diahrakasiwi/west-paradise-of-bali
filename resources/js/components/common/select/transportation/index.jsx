import { Form, Row, Col, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

export default function FormSelectTransportation({ onFilter, transportation }) {
    const [district, setDistrict] = useState("");
    const [village, setVillage] = useState("");

    const districts = Array.from(
        new Set(
            transportation.map((item) => item.district?.trim()).filter(Boolean)
        )
    );
    const villages = Array.from(
        new Set(
            transportation.map((item) => item.village?.trim()).filter(Boolean)
        )
    );

    useEffect(() => {
        if (onFilter) {
            onFilter({ district, village });
        }
    }, [district, village]);

    return (
        <Form>
            <Title level={4} style={{ marginBottom: 16, marginTop: 4}}>Transportasi</Title>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                <Form.Item
                    label="Pilih Kecamatan"
                    style={{ marginBottom: 0 }}
                ></Form.Item>
                    <Select
                        placeholder="Pilih Kecamatan"
                        style={{ width: "100%" }}
                        value={district || undefined}
                        onChange={(val) => setDistrict(val)}
                        allowClear
                    >
                        {districts.map((d) => (
                            <Select.Option key={d} value={d}>
                                {d}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={8}>
                <Form.Item
                    label="Pilih Desa/Kelurahan"
                    style={{ marginBottom: 0 }}
                ></Form.Item>
                    <Select
                        placeholder="Pilih Desa/Kelurahan"
                        style={{ width: "100%" }}
                        value={village || undefined}
                        onChange={(val) => setVillage(val)}
                        allowClear
                    >
                        {villages.map((v) => (
                            <Select.Option key={v} value={v}>
                                {v}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        </Form>
    );
}
