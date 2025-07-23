import { Input, Space } from "antd";

const translations = {
  id: {
    placeholder: "Masukkan kata kunci...",
    search: "Cari",
  },
  en: {
    placeholder: "Enter keyword...",
    search: "Search",
  },
};

export default function SearchBar({ onSearch, value, width, locale = "id" }) {
  const t = translations[locale] || translations["id"];
    return (
        <Space direction="horizontal">
            <Input.Search
                placeholder="Masukkan kata kunci..."
                allowClear
                enterButton="Cari"
                onSearch={onSearch}
                onChange={(e) => onSearch(e.target.value)}
                value={value}
                style={{ width: width || 300 }}
            />
        </Space>
    );
}
