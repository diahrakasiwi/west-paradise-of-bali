import { Form, Select, Row, Col } from "antd";
import Title from "antd/es/typography/Title";
import { useState, useEffect } from "react";

export default function FormSelectCreativeEconomy({
    onFilter,
    creativeEconomy,
}) {
    const [district, setDistrict] = useState("");
    const [village, setVillage] = useState("");

    const districts = Array.from(
        new Set(
            creativeEconomy.map((item) => item.district?.trim()).filter(Boolean)
        )
    );

    const villages = Array.from(
        new Set(
            creativeEconomy.map((item) => item.village?.trim()).filter(Boolean)
        )
    );

    // Trigger onFilter when district/village changes
    useEffect(() => {
        onFilter({ district, village });
    }, [district, village]);

    return (
        <Form>
            <Title level={4} style={{ marginBottom: 16, marginTop: 4}}>Ekonomi Kreatif</Title>
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
                        {districts.map((item) => (
                            <Select.Option key={item} value={item}>
                                {item}
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
                        {villages.map((item) => (
                            <Select.Option key={item} value={item}>
                                {item}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        </Form>
    );
}
