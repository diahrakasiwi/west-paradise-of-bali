import { Link } from "@inertiajs/inertia-react";
import translations from "../../lang/lang";

export const NavbarMenu = (locale = "id") => {
    const t = translations[locale] || {};

    const currentLang =
        new URLSearchParams(window.location.search).get("lang") || "id";

    return [
        {
            key: `/?lang=${currentLang}`,
            label: t.navbar?.homePage || "Beranda",
        },
        {
            key: `/about?lang=${currentLang}`,
            label: t.navbar?.about || "Tentang Kami",
        },
        {
            key: `/destination?lang=${currentLang}`,
            label: t.navbar?.destination || "Destinasi Wisata",
        },
        {
            key: `/event?lang=${currentLang}`,
            label: t.navbar?.event || "Acara",
        },
        {
            key: `/news?lang=${currentLang}`,
            label: t.navbar?.news || "Berita",
        },
        {
            key: `/map-tour?lang=${currentLang}`,
            label: t.navbar?.mapTour || "Peta",
        },
        {
            key: `/search-location?lang=${currentLang}`,
            label: t.navbar?.searchLocation || "Cari Lokasi",
        },
    ];
};
