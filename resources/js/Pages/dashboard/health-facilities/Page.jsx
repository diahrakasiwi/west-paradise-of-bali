import HealthFacilitiesContent from "../../../components/content/health-facility";
import Layout from "../Layout";

export default function HealthFacilities() {
    return <HealthFacilitiesContent />;
}

HealthFacilities.layout = (page) => <Layout children={page} />;
