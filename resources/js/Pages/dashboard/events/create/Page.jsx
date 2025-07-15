import { Inertia } from "@inertiajs/inertia";
import FormEvent from "../../../../components/common/form/event";
import { notification } from "antd";
import Layout from "../../Layout";

export default function CreateEvent() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/events", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Acara berhasil ditambahkan.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan acara.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/events");
    };
    return (
        <FormEvent
            process="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            title="Tambah Acara"
        />
    );
}

CreateEvent.layout = (page) => <Layout children={page} />;
