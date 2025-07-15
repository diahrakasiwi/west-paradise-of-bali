import { CalendarFilled, UserOutlined } from "@ant-design/icons";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";

export const SidebarSetting = () => {
    const { url } = usePage();

    return [
    {
        key: "/dashboard/sliders",
        label: <Link href="/dashboard/sliders">Slider</Link>,
        icon: ( 
            <img
                src={
                    url.startsWith("/dashboard/sliders")
                        ? "/assets/icon/ikon_slider_merah.svg"
                        : "/assets/icon/ikon_slider_putih.svg"
                }
                alt="Slider"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/accounts",
        label: <Link href="/dashboard/accounts">Akun</Link>,
        icon: <UserOutlined />, 
    },
];
}