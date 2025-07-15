import { DeleteFilled, EditFilled, FileImageOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import ModalConfirm from "../modal-confirm";

export default function ActionTable({
    title,
    description,
    actions,
    onEdit,
    id,
    onDelete,
    model,
    process = null,
}) {
    const handleDelete = () => {
        ModalConfirm({
            title: title,
            description: description,
            actions: actions,
            onOk: () => onDelete(id),
        });
    };

    // Jika model === "reviews", hanya tampilkan tombol delete
    if (model === "reviews") {
        return (
            <div style={{ display: "flex", gap: "8px" }}>
                <Tooltip title="Delete">
                    <span
                        style={{
                            backgroundColor: "#E71C47",
                            padding: "5px",
                            borderRadius: "5px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                        onClick={handleDelete}
                    >
                        <DeleteFilled />
                    </span>
                </Tooltip>
            </div>
        );
    }

    // Untuk kondisi selain model "reviews"
    return (
        <div style={{ display: "flex", gap: "8px" }}>
            {process === "images" && (
                <Tooltip title="Detail Images">
                    <span
                        style={{
                            backgroundColor: "#AC85D2",
                            padding: "5px",
                            borderRadius: "5px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                        onClick={() => onEdit(id)}
                    >
                        <FileImageOutlined />
                    </span>
                </Tooltip>
            )}

            <Tooltip title="Edit">
                <span
                    style={{
                        backgroundColor: "#4880FF",
                        padding: "5px",
                        borderRadius: "5px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                    onClick={() => onEdit(id)}
                >
                    <EditFilled />
                </span>
            </Tooltip>

            <Tooltip title="Delete">
                <span
                    style={{
                        backgroundColor: "#E71C47",
                        padding: "5px",
                        borderRadius: "5px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                    onClick={handleDelete}
                >
                    <DeleteFilled />
                </span>
            </Tooltip>
        </div>
    );
}
