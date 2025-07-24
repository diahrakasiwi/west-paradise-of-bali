import { usePage } from "@inertiajs/inertia-react";
import FormHealthFacility from "../../../../components/common/form/health-facility";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";
import Layout from "../../Layout";

export default function EditHealthFacility() {
    const { healthFacility } = usePage().props;
    const handleSubmit = (values) => {
        Inertia.put(
            `/dashboard/health-facilities/${healthFacility.id}`,
            values,
            {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Fasilitas Kesehatan berhasil diupdate.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat update fasilitas kesehatan.",
                    });
                },
            }
        );
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/health-facilities");
    };

    return (
        <FormHealthFacility
            process="update"
            title="Edit Fasilitas Kesehatan"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialValues={healthFacility}
        />
    );
}

EditHealthFacility.layout = (page) => <Layout children={page} />;
