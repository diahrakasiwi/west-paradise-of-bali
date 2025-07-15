import { Link } from "@inertiajs/inertia-react";
import translations from "../../lang/lang";

export const HomePageMenu = ({ lang, locale }) => {
    const t = translations[locale || "id"];
    return [
        {
            key: "tourist-destinations",
            label: (
                <Link href={`/destination?lang=${lang}&type=destinasi`}>
                    {t.type.destinasi}
                </Link>
            ),
            icon: (
                <img
                    src="/assets/icon/ikon_destinasi_wisata.png"
                    alt="Destinasi Wisata"
                    style={{ width: 40, height: 40 }}
                />
            ),
        },
        {
            key: "villages",
            label: (
                <Link href={`/destination?lang=${lang}&type=desa-wisata`}>
                    {t.type["desa-wisata"]}
                </Link>
            ),
            icon: (
                <img
                    src="/assets/icon/ikon_desa_wisata.png"
                    alt="Desa Wisata"
                    style={{ width: 40, height: 40 }}
                />
            ),
        },
        {
            key: "restaurants",
            label: (
                <Link href={`/destination?lang=${lang}&type=restoran`}>
                    {t.type.restoran}
                </Link>
            ),
            icon: (
                <img
                    src="/assets/icon/ikon_restoran.png"
                    alt="Restoran"
                    style={{ width: 40, height: 40 }}
                />
            ),
        },
        {
            key: "creative-economy",
            label: (
                <Link href={`/destination?lang=${lang}&type=ekonomi-kreatif`}>
                    {t.type["ekonomi-kreatif"]}
                </Link>
            ),
            icon: (
                <img
                    src="/assets/icon/ikon_ekraf.png"
                    alt="Ekonomi Kreatif"
                    style={{ width: 40, height: 40 }}
                />
            ),
        },
        {
            key: "accommodations",
            label: (
                <Link href={`/destination?lang=${lang}&type=akomodasi`}>
                    {t.type.akomodasi}
                </Link>
            ),
            icon: (
                <img
                    src="/assets/icon/ikon_akomodasi.png"
                    alt="Akomodasi"
                    style={{ width: 30, height: 40 }}
                />
            ),
        },
        {
            key: "transportations",
            label: (
                <Link href={`/destination?lang=${lang}&type=transportasi`}>
                    {t.type.transportasi}
                </Link>
            ),
            icon: (
                <img
                    src="/assets/icon/ikon_transportasi.png"
                    alt="Transportasi"
                    style={{ width: 40, height: 40 }}
                />
            ),
        },
        {
            key: "health-facilities",
            label: (
                <Link
                    href={`/destination?lang=${lang}&type=fasilitas-kesehatan`}
                >
                    {t.type["fasilitas-kesehatan"]}
                </Link>
            ),
            icon: (
                <img
                    src="/assets/icon/ikon_faskes.png"
                    alt="Fasilitas Kesehatan"
                    style={{ width: 33, height: 33 }}
                />
            ),
        },
    ];
};
