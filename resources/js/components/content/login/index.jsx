import {
    Button,
    Card,
    Checkbox,
    Flex,
    Form,
    Input,
    notification,
    Typography,
} from "antd";
import { useState } from "react";

const { Title } = Typography;

export default function LoginContent({ onSubmit }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await onSubmit(values);
        } catch (error) {
            notification.error({
                message: "Login Gagal",
                description: "Email atau password salah.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                backgroundImage: "url('/assets/images/background-login.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1,
                }}
            />
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <Card
                    style={{
                        width: 350,
                        height: 450,
                        backdropFilter: "blur(10px)",
                        backgroundColor: "rgba(255, 255, 255, 0.40)",
                        borderRadius: 10,
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                        color: "#fff",
                    }}
                    bodyStyle={{ padding: 32 }}
                >
                    <div style={{ textAlign: "center", marginBottom: 2 }}>
                        <img
                            src="/assets/images/logo-kab.png"
                            alt="Logo"
                            style={{ height: 80, marginBottom: 1 }}
                        />
                        <Title
                            level={4}
                            style={{
                                color: "#fff",
                                fontSize: 20,
                                fontWeight: 400,
                                marginTop: 2,
                            }}
                        >
                            Sign to Admin
                        </Title>
                    </div>

                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label={<span style={{ color: "#fff" }}>Username</span>}
                            name="email"
                            rules={[{ required: true, message: "Harap isi email" }]}
                        >
                            <Input
                                style={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                    height: 32,
                                    fontSize: 12,
                                    padding: "4px 8px",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        color: "#fff",
                                    }}
                                >
                                    <span>Password</span>
                                </div>
                            }
                            name="password"
                            rules={[{ required: true, message: "Harap isi password" }]}
                        >
                            <Input.Password
                                style={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                    height: 32,
                                    fontSize: 12,
                                    padding: "4px 8px",
                                }}
                            />
                        </Form.Item>

                        <Flex justify="space-between" align="middle">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox
                                    style={{
                                        color: "#fff",
                                        marginBottom: 16,
                                        fontSize: 12,
                                    }}
                                >
                                    Ingat Saya
                                </Checkbox>
                            </Form.Item>
                            <a href="#" style={{ color: "#fff", fontSize: 12 }}>
                                Lupa Password?
                            </a>
                        </Flex>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            style={{
                                backgroundColor: "#3F5845",
                                borderColor: "#3F5845",
                                marginTop: 16,
                                height: 36,
                                fontSize: 14,
                            }}
                        >
                            Login
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
}