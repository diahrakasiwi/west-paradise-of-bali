import { Menu, Row, Col, Flex, Drawer, Button, Grid, Dropdown } from "antd";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { DownOutlined } from "@ant-design/icons";
import { Inertia } from "@inertiajs/inertia";
import { NavbarMenu } from "../home-page/menu/menu";
import { Link } from "@inertiajs/inertia-react";

export default function NavBar() {
    const { url, locale } = usePage().props;
    const [selectedKey, setSelectedKey] = useState("/");
    const screens = Grid.useBreakpoint();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (url) {
            const cleanPath = url.split("?")[0];

            const matchedItem = NavbarMenu(locale).find((item) => {
                if (
                    cleanPath.startsWith("/detail-destination") &&
                    item.key === "/destination"
                )
                    return true;

                if (
                    cleanPath.startsWith("/detail-news") &&
                    item.key === "/news"
                )
                    return true;

                if (
                    cleanPath.startsWith("/detail-event") &&
                    item.key === "/event"
                )
                    return true;

                // exact match or special case for root path
                return item.key === cleanPath;
            });

            if (matchedItem) {
                setSelectedKey(matchedItem.key);
            }
        }
    }, [url]);

    const handleChangeLanguage = (lang) => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("lang", lang);
        Inertia.visit(currentUrl.toString(), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const getLangIcon = (lang) => {
    if (lang === "id") {
        return "/assets/icon/emojione_flag-for-indonesia.svg";
    } else if (lang === "en") {
        return "/assets/icon/circle-flags_lang-en.svg";
    }
    return "/assets/icon/emojione_flag-for-indonesia.svg"; // default
    };

    const langMenu = {
        items: [
            {
                key: "id",
                label: (
                    <div onClick={() => handleChangeLanguage("id")}>
                        <img
                            src="/assets/icon/emojione_flag-for-indonesia.svg"
                            alt="ID"
                            style={{ width: 16, height: 16, marginRight: 8 }}
                        />
                        Bahasa Indonesia
                    </div>
                ),
            },
            {
                key: "en",
                label: (
                    <div onClick={() => handleChangeLanguage("en")}>
                        <img
                            src="/assets/icon/circle-flags_lang-en.svg"
                            alt="EN"
                            style={{ width: 16, height: 16, marginRight: 8 }}
                        />
                        English
                    </div>
                ),
            },
        ],
    };

    return (
        <>
            <Row
                align="middle"
                justify="center"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: "rgba(63, 88, 69, 0.5)", // 50% opacity
                    backdropFilter: "blur(10px)", // efek blur
                    WebkitBackdropFilter: "blur(10px)", // Safari support
                    height: "67px",
                    padding: "0 24px",
                    borderBottom: "none",
                    // position: "fixed",
                }}
            >
                <Flex
                    justify="space-between"
                    align="middle"
                    style={{ width: "100%" }}
                >
                    <Col>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 20,
                            }}
                        >
                            <img
                                src="/assets/images/wonderful.png"
                                alt="wonderful"
                                style={{ height: 45 }}
                            />
                            <img
                                src="/assets/images/logo.png"
                                alt="jembrana"
                                style={{ height: 40 }}
                            />
                        </div>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            flexWrap: "nowwrap",
                            overflowX: "auto",
                            maxWidth: "100vw",
                            scrollbarWidth: "none",
                        }}
                    >
                        {screens.md ? (
                            NavbarMenu(locale).map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.key}
                                    style={{
                                        display: "inline-block", //tambah
                                        padding: "6px 12px",
                                        borderRadius: 40,
                                        fontWeight: 400,
                                        fontSize: 13,
                                        color:
                                            window.location.pathname === new URL(item.key, window.location.origin).pathname
                                            ? "white"
                                            : "#fff",
                                        backgroundColor:
                                            window.location.pathname === new URL(item.key, window.location.origin).pathname
                                            ? "#E71C47"
                                            : "transparent",
                                        textDecoration: "none",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))
                        ) : (
                            <Button
                                type="text"
                                icon={
                                    <span
                                        style={{ fontSize: 12, color: "white" }}
                                    >
                                        ☰
                                    </span>
                                }
                                onClick={() => setMobileOpen(true)}
                            />
                        )}

                        {/* LANGUAGE DROPDOWN */}
                        <Dropdown menu={langMenu} trigger={["click"]}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={getLangIcon(locale)}
                                    alt={locale}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        transition: "all 0.3s ease",
                                    }}
                                />
                                <DownOutlined
                                    style={{ color: "white", fontSize: 12 }}
                                />
                            </div>
                        </Dropdown>
                    </Col>
                </Flex>
            </Row>

            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setMobileOpen(false)}
                open={mobileOpen}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[selectedKey]}
                    onClick={() => setMobileOpen(false)}
                    style={{
                        color: "#333", // warna teks default untuk semua item (tidak terpilih)
                        fontWeight: 500,
                    }}
                    items={NavbarMenu(locale).map((item) => ({
                        ...item,
                        style:
                            selectedKey === item.key
                                ? {
                                      color: "#E71C47", // teks saat aktif
                                      fontWeight: "bold",
                                  }
                                : {
                                      color: "#333", // teks saat tidak aktif
                                  },
                    }))}
                />
            </Drawer>
        </>
    );
}
