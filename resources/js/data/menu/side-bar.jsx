import {
    ProductFilled,
    ShopFilled,
    BulbFilled,
    HomeFilled,
    CarFilled,
    MedicineBoxFilled,
    FileTextFilled,
    CalendarFilled,
} from "@ant-design/icons";
import { usePage } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";


export const SidebarMenu = () => {
    const { url } = usePage();

    return [
    {
        key: "/dashboard/tourist-destinations",
        label: (
            <Link href="/dashboard/tourist-destinations">Destinasi Wisata</Link>
        ),
        icon: (
            <img
                src={
                    url.startsWith("/dashboard/tourist-destinations")
                        ? "/assets/icon/ikon_destinasi_wisata_merah.svg"
                        : "/assets/icon/ikon_destinasi_wisata_putih.svg"
                }
                alt="Destinasi Wisata"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/villages",
        label: (
            <Link href="/dashboard/villages">Desa Wisata</Link>
        ),
        icon: (
            <img
                src={
                    url.startsWith("/dashboard/villages")
                        ? "/assets/icon/ikon_desa_wisata_merah.svg"
                        : "/assets/icon/ikon_desa_wisata_putih.svg"
                }
                alt="Desa Wisata"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/restaurants",
        label: (
            <Link href="/dashboard/restaurants">Restoran</Link>
        ),
        icon: (
            <img
                src={
                    url.startsWith("/dashboard/restaurants")
                        ? "/assets/icon/ikon_restoran_merah.svg"
                        : "/assets/icon/ikon_restoran_putih.svg"
                }
                alt="Restoran"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/creative-economy",
        label: (
            <Link href="/dashboard/creative-economy">Ekonomi Kreatif</Link>
        ),
        icon: (
            <img
                src={
                    url.startsWith("/dashboard/creative-economy")
                        ? "/assets/icon/ikon_ekraf_merah.svg"
                        : "/assets/icon/ikon_ekraf_putih.svg"
                }
                alt="Ekonomi Kreatif"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/accommodations",
        label: <Link href="/dashboard/accommodations">Akomodasi</Link>,
        icon: (
            <img
                src={
                    url.startsWith("/dashboard/accommodations")
                        ? "/assets/icon/ikon_akomodasi_merah.svg"
                        : "/assets/icon/ikon_akomodasi_putih.svg"
                }
                alt="Akomodasi"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/transportations",
        label: <Link href="/dashboard/transportations">Transportasi</Link>,
        icon: (
            <img
                src={
                    url.startsWith("/dashboard/transportations")
                        ? "/assets/icon/ikon_transportasi_merah.svg"
                        : "/assets/icon/ikon_transportasi_putih.svg"
                }
                alt="Transportasi"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/health-facilities",
        label: (
            <Link href="/dashboard/health-facilities">Fasilitas Kesehatan</Link>
        ),
        icon: (
            <img
                src={
                    url.startsWith("/dashboard/health-facilities")
                        ? "/assets/icon/ikon_faskes_merah.svg"
                        : "/assets/icon/ikon_faskes_putih.svg"
                }
                alt="Fasilitas Kesehatan"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/news",
        label: <Link href="/dashboard/news">Berita</Link>,
        icon: <FileTextFilled />,
    },
    {
        key: "/dashboard/events",
        label: <Link href="/dashboard/events">Acara</Link>,
        icon: <CalendarFilled />,
    },
    {
        key: "/dashboard/categories",
        label: (
            <Link href="/dashboard/categories">Kategori</Link>
        ),
        icon: (
            <img
                src={
                    url.startsWith("/dashboard/categories")
                        ? "/assets/icon/ikon_kategori_merah.svg"
                        : "/assets/icon/ikon_kategori_putih.svg"
                }
                alt="Kategori"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/reviews",
        label: (
            <Link href="/dashboard/reviews">Peringkat dan Ulasan</Link>
        ),
        icon: (
            <img
                src={
                    url.startsWith("/dashboard/reviews")
                        ? "/assets/icon/ikon_peringkat_merah.svg"
                        : "/assets/icon/ikon_peringkat_putih.svg"
                }
                    alt="Peringkat dan Ulasan"
                    style={{ width: 20, height: 20 }}
                />
        ),
    },
];
}
